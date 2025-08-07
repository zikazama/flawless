// This file merges the additional content into the main courses
import { courses } from './modules';
import { additionalModules } from './additionalModules';
import { tsModule1Topics, tsModule2 } from './typeScriptModules';

// Update JavaScript modules with content
export function updateCoursesWithContent() {
  const updatedCourses = [...courses];
  
  // Find JavaScript course
  const jsCourse = updatedCourses.find(c => c.id === 'javascript');
  if (jsCourse) {
    // Update existing modules with new content
    const existingModules = jsCourse.modules;
    
    // Add new JavaScript modules
    additionalModules.forEach(newModule => {
      const existingModule = existingModules.find(m => m.id === newModule.id);
      if (existingModule) {
        existingModule.topics = newModule.topics;
      } else {
        existingModules.push(newModule);
      }
    });
  }
  
  // Find TypeScript course
  const tsContext = updatedCourses.find(c => c.id === 'typescript');
  if (tsContext) {
    // Add remaining TypeScript topics to first module
    const firstModule = tsContext.modules.find(m => m.id === 'ts-basics-1');
    if (firstModule) {
      firstModule.topics.push(...tsModule1Topics);
    }
    
    // Update advanced TypeScript module
    const advancedModule = tsContext.modules.find(m => m.id === 'ts-advanced-1');
    if (advancedModule) {
      advancedModule.topics = tsModule2.topics;
    }
  }
  
  return updatedCourses;
}

// Export updated courses
export const coursesWithAllContent = updateCoursesWithContent();