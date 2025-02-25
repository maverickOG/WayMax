import { useState, useEffect } from 'react';
import { X, BookOpen, Clock, Target, Award } from 'lucide-react';
import ChatService from '../../../services/chatService';

const CourseDetails = ({ course, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prerequisites, setPrerequisites] = useState('');
  const [learningOutcomes, setLearningOutcomes] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch initial learning path details
        const response = await ChatService.getLearningPath(
          course.title,
          "beginner",
          "10 hours/week"
        );
        setDetails(response.response[0]);

        // Generate prerequisites using ChatService
        const prerequisitesPrompt = `Generate prerequisites for a comprehensive course on ${course.title}. 
        Provide a concise paragraph explaining the background knowledge or skills a student should have 
        before starting this course.`;
        
        const prerequisitesResponse = await ChatService.sendMessage(
          prerequisitesPrompt, 
          'prerequisites-session'
        );
        setPrerequisites(prerequisitesResponse.response.trim());

        // Generate learning outcomes using ChatService
        const learningOutcomesPrompt = `Generate a detailed list of specific learning outcomes for a comprehensive course on ${course.title}. 
        Provide 5-7 specific skills or knowledge areas a student will master by the end of the course.`;
        
        const learningOutcomesResponse = await ChatService.sendMessage(
          learningOutcomesPrompt, 
          'learning-outcomes-session'
        );
        
        // Parse learning outcomes from the response
        const outcomes = learningOutcomesResponse.response
          .split('\n')
          .filter(outcome => outcome.trim() !== '')
          .map(outcome => outcome.replace(/^\d+\.\s*/, '').trim());
        
        setLearningOutcomes(outcomes);
      } catch (error) {
        console.error('Error fetching course details:', error);
        // Fallback to default values if generation fails
        setPrerequisites('None specific prerequisites required.');
        setLearningOutcomes([
          'Basic understanding of the subject',
          'Foundational skills in the course domain'
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [course]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">{course.title}</h2>
          
          {details && (
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-amber-50 rounded-lg">
                  <Clock className="w-6 h-6 mb-2" />
                  <h3 className="font-medium">Duration</h3>
                  <p>{details.duration_1 || '40 hours'}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Target className="w-6 h-6 mb-2" />
                  <h3 className="font-medium">Difficulty</h3>
                  <p>{details.difficulty_1 || 'Intermediate'}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <Award className="w-6 h-6 mb-2" />
                  <h3 className="font-medium">Certificate</h3>
                  <p>Available</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
                <p className="text-gray-700">{prerequisites}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                <div className="space-y-2">
                  {learningOutcomes.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Estimated Completion</h3>
                <p className="text-gray-700">{details.estimated_completion || '8 weeks'}</p>
              </div>

              <button className="w-full py-4 bg-[#C1BEFA] text-white rounded-xl hover:bg-[#C1BEFA]/90 transition-colors">
                Start Learning
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;