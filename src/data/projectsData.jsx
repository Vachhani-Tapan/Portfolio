import React from 'react';
import { Cloud, MapPin } from 'lucide-react';

const projectsData = [
  {
    title: 'FinWise AI',
    description: 'FinWise AI — an AI-powered personal finance platform that centralizes expenses, investments, goals, and financial planning in one place.',
    points: [
      'It combines Intelligent Analytics',
      'Optimizes personal finance in a modern way',
      'Blog module displaying articles via Dev.to.',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-3.5 h-3.5" alt="React.js" />, label: 'React.js' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" className="w-3.5 h-3.5" alt="Tailwind CSS" />, label: 'Tailwind CSS' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-3.5 h-3.5" alt="Node.js" />, label: 'Node.js' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="w-3.5 h-3.5 invert" alt="Express.js" />, label: 'Express.js' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="w-3.5 h-3.5" alt="MongoDB" />, label: 'MongoDB' }
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1774370854/finwisescreenshot_vflxu5.jpg',
    github: 'https://github.com/Vachhani-Tapan/finwiseai-1',
    live: 'https://finwiseai-1-yvg4.vercel.app/login',
  },
  {
    title: 'LedgerCore',
    description: 'Companies often struggle with manual expense reimbursement processes that are time-consuming, error-prone, and lack transparency',
    points: [
      'Define approval flows based on thresholds',
      'Manage multi-level approvals',
      'Support flexible approval rules',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-3.5 h-3.5" alt="React.js" />, label: 'React.js' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" className="w-3.5 h-3.5" alt="Firebase" />, label: 'Firebase' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" className="w-3.5 h-3.5" alt="Tailwind CSS" />, label: 'Tailwind CSS' },
      { icon: <img src="https://cdn.simpleicons.org/openai/white" className="w-3.5 h-3.5" alt="OpenAI API" />, label: 'OpenAI API' },
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1774370854/finwisescreenshot_vflxu5.jpg',
    github: 'https://github.com/Vachhani-Tapan/Exp',
    live: '#',
  },
  {
    title: 'LearnSmart AI',
    description: 'Companies often struggle with manual expense reimbursement processes that are time-consuming, error-prone, and lack transparency',
    points: [
      'User registration, profile viewing, and networking.',
      'Real-time chat with Socket.IO.',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-3.5 h-3.5" alt="React.js" />, label: 'React.js' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" className="w-3.5 h-3.5" alt="Redux Toolkit" />, label: 'Redux Toolkit' },
      
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    github: '#',
    live: '#',
  },
  {
    title: 'LedgerCore',
    description: 'Companies often struggle with manual expense reimbursement processes that are time-consuming, error-prone, and lack transparency',
    points: [
      'Define approval flows based on thresholds',
      'Manage multi-level approvals',
      'Support flexible approval rules',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-3.5 h-3.5" alt="React.js" />, label: 'React.js' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" className="w-3.5 h-3.5" alt="Firebase" />, label: 'Firebase' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" className="w-3.5 h-3.5" alt="Tailwind CSS" />, label: 'Tailwind CSS' },
      { icon: <img src="https://cdn.simpleicons.org/openai/white" className="w-3.5 h-3.5" alt="OpenAI API" />, label: 'OpenAI API' },
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1774370854/finwisescreenshot_vflxu5.jpg',
    github: 'https://github.com/Vachhani-Tapan/Exp',
    live: '#',
  },
  {
    title: 'Sky-Update',
    description: 'Real-time weather app with dark mode and accurate forecasts.',
    points: [
      'Weather updates for 200,000+ cities.',
      'Geolocation-based weather search.',
      'Dark mode and intuitive UI.',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-3.5 h-3.5" alt="React.js" />, label: 'React.js' },
      { icon: <Cloud size={14} className="text-gray-300" />, label: 'Weather API' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-3.5 h-3.5" alt="CSS3" />, label: 'CSS3' },
      { icon: <MapPin size={14} className="text-gray-300" />, label: 'Geolocation' },
    ],
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80',
    github: '#',
    live: '#',
  },
];

export default projectsData;
