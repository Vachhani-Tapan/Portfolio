import React from 'react';

const figmaData = [
  {
    title: 'MediTravel Assist',
    description: 'A comprehensive medical tourism platform design that simplifies finding and booking international healthcare services.',
    points: [
      'Patient-centric medical inquiry flow',
      'Hospital and specialist discovery module',
      'Integrated travel logistics for medical care',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" className="w-3.5 h-3.5" alt="Figma" />, label: 'Figma' },
      { icon: <span className="text-white/60 font-bold leading-none">UI</span>, label: 'UI Design' },
      { icon: <span className="text-white/60 font-bold leading-none">UX</span>, label: 'UX Research' }
    ],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    figmaLink: 'https://www.figma.com/design/DSdKqksDFdXESRzpUY1ZLN/Untitled?node-id=0-1&t=UWFXXoFgCkPoFRW1-1',
    liveLink: 'https://www.figma.com/design/DSdKqksDFdXESRzpUY1ZLN/Untitled?node-id=0-1&t=UWFXXoFgCkPoFRW1-1',
  },
  {
    title: 'BookMyShow',
    description: 'A modern and cinematic re-imagining of an entertainment booking platform, optimizing for seat selection and discovery.',
    points: [
      'Interactive seat selection and floor mapping',
      'Event discovery with personalized filters',
      'Streamlined mobile-first checkout experience',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" className="w-3.5 h-3.5" alt="Figma" />, label: 'Figma' },
      { icon: <span className="text-white/60 font-bold leading-none">DS</span>, label: 'Design System' }
    ],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    figmaLink: 'https://www.figma.com/design/b0vRq6yo9mHm6iBWN8tqil/Untitled?node-id=3-3&t=TecfSr4gH2ElU31a-1',
    liveLink: 'https://www.figma.com/design/b0vRq6yo9mHm6iBWN8tqil/Untitled?node-id=3-3&t=TecfSr4gH2ElU31a-1',
  },
  {
    title: 'DashStack',
    description: 'A modular and high-performance admin dashboard system providing deep insights through clean data visualization components.',
    points: [
      'Modular component library for enterprise apps',
      'High-conversion analytical widgets',
      'Customizable data visualization patterns',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" className="w-3.5 h-3.5" alt="Figma" />, label: 'Figma' },
      { icon: <span className="text-white/60 font-bold leading-none">DS</span>, label: 'Design System' }
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    figmaLink: 'https://www.figma.com/design/b0vRq6yo9mHm6iBWN8tqil/Untitled?node-id=9-202&t=TecfSr4gH2ElU31a-1',
    liveLink: 'https://www.figma.com/design/b0vRq6yo9mHm6iBWN8tqil/Untitled?node-id=9-202&t=TecfSr4gH2ElU31a-1',
  },
  {
    title: 'Hospital Management System',
    description: 'A robust enterprise design system for managing healthcare workflows, patient records, and hospital resource allocation.',
    points: [
      'Optimized doctor scheduling and bed tracking',
      'Secure electronic health record (EHR) layouts',
      'Departmental resource allocation dashboard',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" className="w-3.5 h-3.5" alt="Figma" />, label: 'Figma' },
      { icon: <span className="text-white/60 font-bold leading-none">DS</span>, label: 'Design System' }
    ],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    figmaLink: 'https://www.figma.com/design/b0vRq6yo9mHm6iBWN8tqil/Untitled?node-id=9-359&t=TecfSr4gH2ElU31a-1',
    liveLink: 'https://www.figma.com/design/b0vRq6yo9mHm6iBWN8tqil/Untitled?node-id=9-359&t=TecfSr4gH2ElU31a-1',
  },
  {
    title: 'CodingGita Website',
    description: 'A modern educational portal design for technical bootcamps, focusing on curriculum delivery and student progress tracking.',
    points: [
      'Interactive roadmap for tech career paths',
      'Student performance and enrollment tracking',
      'Community-focused peer networking space',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" className="w-3.5 h-3.5" alt="Figma" />, label: 'Figma' },
      { icon: <span className="text-white/60 font-bold leading-none">DS</span>, label: 'Design System' }
    ],
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80',
    figmaLink: 'https://www.figma.com/design/23M8zSsQp9W0kntUVDDQ09/Untitled?node-id=451-592&t=mIqAFHL4RUtrXhel-1',
    liveLink: 'https://www.figma.com/design/23M8zSsQp9W0kntUVDDQ09/Untitled?node-id=451-592&t=mIqAFHL4RUtrXhel-1',
  },
  {
    title: 'Ozark Website',
    description: 'An immersive and focus-oriented student learning portal designed for deep study and comprehensive course management.',
    points: [
      'Focus-oriented study mode with dark themes',
      'Comprehensive course progress visualization',
      'Integrated resource library for students',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" className="w-3.5 h-3.5" alt="Figma" />, label: 'Figma' },
      { icon: <span className="text-white/60 font-bold leading-none">DS</span>, label: 'Design System' }
    ],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    figmaLink: 'https://www.figma.com/design/DSdKqksDFdXESRzpUY1ZLN/Untitled?node-id=41-2&t=W4EsYY7Kx5NVvWxn-1',
    liveLink: 'https://www.figma.com/design/DSdKqksDFdXESRzpUY1ZLN/Untitled?node-id=41-2&t=W4EsYY7Kx5NVvWxn-1',
  },
];

export default figmaData;
