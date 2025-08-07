import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../data/modules';
import { UserProgress } from '../App';
import './HomePage.css';

interface HomePageProps {
  courses: Course[];
  userProgress: UserProgress;
}

const HomePage: React.FC<HomePageProps> = ({ courses, userProgress }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const getCompletionPercentage = (course: Course) => {
    const totalTopics = course.modules.reduce((acc, module) => acc + module.topics.length, 0);
    const completedInCourse = course.modules.reduce((acc, module) => {
      return acc + module.topics.filter(topic => 
        userProgress.completedTopics.includes(topic.id)
      ).length;
    }, 0);
    return totalTopics > 0 ? Math.round((completedInCourse / totalTopics) * 100) : 0;
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <p>Learning Code In Playground</p>
      </div>

      <div className="courses-grid">
        {courses.map(course => {
          const completion = getCompletionPercentage(course);
          return (
            <Link to={`/course/${course.id}`} key={course.id} className="course-card">
              <div className="course-icon">
                {course.id === 'javascript' ? '🟨' : '🔷'}
              </div>
              <h3>{course.title}</h3>
              <div className="course-stats">
                <div className="modules-count">
                  {course.modules.length} Modul
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
                <div className="completion-text">{completion}% Selesai</div>
              </div>
              {completion === 0 && (
                <div className="badge new-badge">BARU</div>
              )}
              {completion === 100 && (
                <div className="badge complete-badge">SELESAI ✓</div>
              )}
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default HomePage;