import React, { useEffect, useMemo, useState } from 'react';
import './Interview.css';

type Level = 'junior' | 'intermediate' | 'senior';

interface QAItem {
  id: string;
  level: Level;
  category?: string;
  question: string;
  answer: string;
}

function parseInterviewMarkdown(markdown: string): QAItem[] {
  const lines = markdown.split(/\r?\n/);

  let currentLevel: Level | null = null;
  let currentCategory: string | undefined;
  const items: QAItem[] = [];

  let pendingQuestion: string | null = null;
  let pendingAnswerLines: string[] = [];

  const flushPending = () => {
    if (currentLevel && pendingQuestion) {
      const answer = pendingAnswerLines.join('\n').trim();
      items.push({
        id: `${currentLevel}-${items.length}`,
        level: currentLevel,
        category: currentCategory,
        question: pendingQuestion.trim(),
        answer,
      });
    }
    pendingQuestion = null;
    pendingAnswerLines = [];
  };

  for (let raw of lines) {
    const line = raw.trim();

    if (!line) {
      // Keep blank lines inside answer for formatting
      if (pendingQuestion) pendingAnswerLines.push('');
      continue;
    }

    // Detect level headers
    if (line.startsWith('I. Junior Level')) {
      flushPending();
      currentLevel = 'junior';
      currentCategory = undefined;
      continue;
    }
    if (line.startsWith('II. Intermediate Level')) {
      flushPending();
      currentLevel = 'intermediate';
      currentCategory = undefined;
      continue;
    }
    if (line.startsWith('III. Senior Level')) {
      flushPending();
      currentLevel = 'senior';
      currentCategory = undefined;
      continue;
    }

    // Ignore conversational artifacts
    if (line.startsWith('You said:') || line.startsWith('ChatGPT said:')) {
      continue;
    }

    // Detect category headers like "A. Dasar Pemrograman (15)"
    if (/^[A-Z]\.\s+/.test(line)) {
      currentCategory = line.replace(/^[A-Z]\.[\s]*/, '').trim();
      continue;
    }

    // A question ends with '?'
    if (line.endsWith('?')) {
      // If we already have a pending question, flush it first
      if (pendingQuestion) {
        flushPending();
      }
      pendingQuestion = line;
      pendingAnswerLines = [];
      continue;
    }

    // Otherwise treat as answer content
    if (pendingQuestion) {
      pendingAnswerLines.push(raw);
    }
  }

  // Flush last pending
  flushPending();

  // Filter out items without answer (just in case)
  return items.filter(i => i.question && i.answer);
}

const Interview: React.FC = () => {
  const [allItems, setAllItems] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const url = `${process.env.PUBLIC_URL || ''}/interview.md`;
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load interview.md (${r.status})`);
        return r.text();
      })
      .then(text => {
        if (!isMounted) return;
        const parsed = parseInterviewMarkdown(text);
        setAllItems(parsed);
        setLoading(false);
      })
      .catch(e => {
        if (!isMounted) return;
        setError(e.message);
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allItems.filter(item => {
      const levelOk = selectedLevel === 'all' ? true : item.level === selectedLevel;
      const queryOk = q.length === 0 ? true : item.question.toLowerCase().includes(q);
      return levelOk && queryOk;
    });
  }, [allItems, selectedLevel, search]);

  const counts = useMemo(() => {
    return allItems.reduce((acc, item) => {
      acc[item.level] = (acc[item.level] || 0) + 1;
      return acc;
    }, {} as Record<Level, number>);
  }, [allItems]);

  return (
    <div className="interview-page">
      <div className="interview-header">
        <h2>🗂️ Interview Q&A</h2>
        <div className="controls">
          <div className="level-filters" role="tablist" aria-label="Filter tingkat">
            <button
              className={`level-btn ${selectedLevel === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('all')}
              role="tab"
              aria-selected={selectedLevel === 'all'}
            >
              Semua ({allItems.length})
            </button>
            <button
              className={`level-btn ${selectedLevel === 'junior' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('junior')}
              role="tab"
              aria-selected={selectedLevel === 'junior'}
            >
              Junior ({counts.junior || 0})
            </button>
            <button
              className={`level-btn ${selectedLevel === 'intermediate' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('intermediate')}
              role="tab"
              aria-selected={selectedLevel === 'intermediate'}
            >
              Intermediate ({counts.intermediate || 0})
            </button>
            <button
              className={`level-btn ${selectedLevel === 'senior' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('senior')}
              role="tab"
              aria-selected={selectedLevel === 'senior'}
            >
              Senior ({counts.senior || 0})
            </button>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Cari pertanyaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="loading">Memuat daftar pertanyaan...</div>
      )}
      {error && (
        <div className="error">Gagal memuat: {error}</div>
      )}

      {!loading && !error && (
        <div className="qa-list" role="list" aria-label="Daftar Pertanyaan">
          {filtered.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <div key={item.id} className={`qa-card ${isOpen ? 'open' : ''}`} role="listitem">
                <button
                  className="qa-header"
                  onClick={() => setExpandedId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                >
                  <div className="qa-meta">
                    <span className={`level-badge ${item.level}`}>{item.level}</span>
                    {item.category && (
                      <span className="category">{item.category}</span>
                    )}
                  </div>
                  <div className="question-text">{item.question}</div>
                  <div className="chevron" aria-hidden>▾</div>
                </button>
                {isOpen && (
                  <div id={`panel-${item.id}`} className="qa-body">
                    {item.answer.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="empty">Tidak ada pertanyaan yang cocok.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Interview;


