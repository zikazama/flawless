import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Course } from '../data/modules';
import { UserProgress } from '../App';
import './ModuleList.css';

interface ModuleListProps {
  courses: Course[];
  userProgress: UserProgress;
}

const ModuleList: React.FC<ModuleListProps> = ({ courses, userProgress }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses.find(c => c.id === courseId);

  // Scroll to top when component mounts or courseId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  const isTopicCompleted = (topicId: string) => {
    return userProgress.completedTopics.includes(topicId);
  };

  const isTopicLocked = (moduleIndex: number, topicIndex: number) => {
    if (moduleIndex === 0 && topicIndex === 0) return false;
    
    if (topicIndex > 0) {
      const prevTopic = course.modules[moduleIndex].topics[topicIndex - 1];
      return !isTopicCompleted(prevTopic.id);
    }
    
    if (moduleIndex > 0) {
      const prevModule = course.modules[moduleIndex - 1];
      const lastTopic = prevModule.topics[prevModule.topics.length - 1];
      return !isTopicCompleted(lastTopic.id);
    }
    
    return false;
  };

  return (
    <div className="module-list">
      <div className="course-header">
        <Link to="/" className="back-button">← Kembali</Link>
        <h2>{course.title}</h2>
      </div>

      <div className="modules-container">
        {course.modules.map((module, moduleIndex) => (
          <div key={module.id} className="module-section">
            <h3 className="module-title">
              <span className="module-number">{moduleIndex + 1}</span>
              {module.title}
            </h3>
            
            <div className="topics-list">
              {module.topics.map((topic, topicIndex) => {
                const completed = isTopicCompleted(topic.id);
                const locked = isTopicLocked(moduleIndex, topicIndex);
                
                return (
                  <div key={topic.id} className={`topic-item ${completed ? 'completed' : ''} ${locked ? 'locked' : ''}`}>
                    {locked ? (
                      <div className="topic-content locked-content">
                        <span className="lock-icon">🔒</span>
                        <span className="topic-title">{topic.title}</span>
                        <span className="locked-message">Selesaikan topik sebelumnya</span>
                      </div>
                    ) : (
                      <Link 
                        to={`/course/${courseId}/module/${module.id}/topic/${topic.id}`}
                        className="topic-content"
                      >
                        <span className="topic-status">
                          {completed ? '✅' : '📝'}
                        </span>
                        <span className="topic-title">{topic.title}</span>
                        {completed && <span className="completed-badge">Selesai</span>}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="progress-summary">
        <h4>Progress Kursus</h4>
        <div className="stats">
          <div className="stat">
            <span className="stat-label">Total Topik:</span>
            <span className="stat-value">
              {course.modules.reduce((acc, m) => acc + m.topics.length, 0)}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Selesai:</span>
            <span className="stat-value">
              {course.modules.reduce((acc, module) => {
                return acc + module.topics.filter(topic => 
                  isTopicCompleted(topic.id)
                ).length;
              }, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleList;