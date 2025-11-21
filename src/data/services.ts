export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 'ai-recommendations',
    title: 'AI-Powered Recommendations',
    description: 'Get personalized course recommendations powered by advanced AI algorithms. Our system analyzes your academic history, interests, and career goals to suggest the perfect courses for your journey.',
    image: '/services/ai-recommendations.jpg',
  },
  {
    id: 'semester-planning',
    title: 'Semester Planning',
    description: 'Plan your entire semester with ease. Visualize your course schedule, manage prerequisites, and optimize your workload to achieve the best balance between academics and personal life.',
    image: '/services/semester-planning.jpg',
  },
  {
    id: 'progress-tracking',
    title: 'Progress Tracking',
    description: 'Monitor your academic progress in real-time. Track your GPA, credit hours, and degree completion status with intuitive dashboards and detailed analytics.',
    image: '/services/progress-tracking.jpg',
  },
  {
    id: 'advisor-connection',
    title: 'Advisor Connection',
    description: 'Connect seamlessly with your academic advisors. Schedule meetings, share your academic plans, and get expert guidance to make informed decisions about your education.',
    image: '/services/advisor-connection.jpg',
  },
];

