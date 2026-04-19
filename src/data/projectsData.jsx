import React from 'react';
import { Cloud, MapPin } from 'lucide-react';

const projectsData = [
  {
    title: 'FinWise AI',
    description: 'FinWise AI — an AI-powered personal finance platform that centralizes expenses, investments, goals, and financial planning in one place.',
    points: [
      'Real-time expense tracking with AI-driven categorization and budget alerts',
      'Predictive investment insights using historical market data analysis',
      'Automated financial goal setting with personalized savings recommendations',
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
      'Streamlined reimbursement portal with automated receipt verification',
      'Role-based access control for multi-departmental financial oversight',
      'Real-time audit logs and compliance reporting for enterprise transparency',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-3.5 h-3.5" alt="HTML" />, label: 'HTML' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-3.5 h-3.5" alt="CSS" />, label: 'CSS' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" className="w-3.5 h-3.5" alt="JavaScript" />, label: 'JavaScript' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" className="w-3.5 h-3.5" alt="MongoDB" />, label: 'MongoDB' },
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776517876/download_ewfxqz.png',
    github: 'https://github.com/Vachhani-Tapan/Exp',
    live: 'https://expense-management-ledgercore.netlify.app/',
  },
  {
    title: 'LearnSmart AI',
    description: 'An AI-powered educational ecosystem designed to personalize student learning paths and foster collaborative technical growth.',
    points: [
      'AI-curated learning paths tailored to individual student progress',
      'Interactive collaborative coding environment with live peer feedback',
      'Gamified skill assessment modules to boost engagement and retention',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-3.5 h-3.5" alt="HTML" />, label: 'HTML' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-3.5 h-3.5" alt="CSS" />, label: 'CSS' },
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776513272/download_kb3yxv.png',
    github: 'https://github.com/Vachhani-Tapan/ELeaningPath',
    live: 'https://learn-smart-project.netlify.app/',
  },
  {
    title: 'Western-Rise Clone',
    description: 'A technical e-commerce storefront replica of Western Rise, showcasing high-performance apparel with a minimalist and functional aesthetic.',
    points: [
      'High-fidelity replica of the premium technical apparel storefront',
      'Advanced product grid with multi-attribute filtering logic',
      'Performance-optimized UI for high-res product showcases',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-3.5 h-3.5" alt="HTML" />, label: 'HTML5' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-3.5 h-3.5" alt="CSS" />, label: 'CSS3' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" className="w-3.5 h-3.5" alt="JS" />, label: 'JavaScript' },
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776612136/download_ieqgg2.png',
    github: 'https://github.com/Vachhani-Tapan/WesternRise-Clone',
    live: 'https://westernrise.netlify.app/',
  },
  {
    title: 'Urban Monkey Clone',
    description: 'A bold streetwear marketplace clone mirroring the Urban Monkey aesthetic, featuring dynamic product grids and youth-centric branding.',
    points: [
      'Bold streetwear e-commerce layout with high-impact visuals',
      'Dynamic category navigation for street culture accessories',
      'Mobile-first responsive design for the modern consumer',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-3.5 h-3.5" alt="HTML" />, label: 'HTML5' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-3.5 h-3.5" alt="CSS" />, label: 'CSS3' },
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776612115/download_np5lou.png',
    github: 'https://github.com/Vachhani-Tapan/Urban-Monkey-Clone',
    live: 'https://urbanmonkeyclone1.netlify.app/',
  },
  {
    title: 'Udaan Website Clone',
    description: 'A B2B commerce platform design inspired by Udaan, optimized for large-scale trade, catalog management, and bulk logistics.',
    points: [
      'Scale-focused B2B trade platform interface with catalog management',
      'Efficient bulk ordering and inventory visualization workflows',
      'Enterprise-grade navigation for complex supply chain hierarchies',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-3.5 h-3.5" alt="HTML" />, label: 'HTML5' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-3.5 h-3.5" alt="CSS" />, label: 'CSS3' },
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776612974/download_wa1amg.png',
    github: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/Udaan',
    live: 'https://udaanwebclone.netlify.app/',
  },
  {
    title: 'My Ether Wallet Clone',
    description: 'A security-focused crypto wallet interface replica, demonstrating decentralized finance (DeFi) management and secure interaction.',
    points: [
      'Client-side Ethereum interface focused on safe decentralized finance',
      'Comprehensive dashboard for real-time asset and transaction tracking',
      'Secure-by-design UI/UX for frictionless crypto management',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-3.5 h-3.5" alt="HTML" />, label: 'HTML5' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-3.5 h-3.5" alt="CSS" />, label: 'CSS3' },
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776612956/download_jhyjx6.png',
    github: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/myetherwallet',
    live: 'https://myetherwalletclone.netlify.app/',
  },
  {
    title: 'DataBricks Clone',
    description: 'An enterprise data platform replica inspired by Databricks, focusing on complex data visualization and collaborative workspaces.',
    points: [
      'Sophisticated enterprise lakehouse platform visualization',
      'Collaborative workspace layout for advanced data engineering',
      'Interactive analytics dashboard panels for complex data insights',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-3.5 h-3.5" alt="HTML" />, label: 'HTML5' },
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-3.5 h-3.5" alt="CSS" />, label: 'CSS3' },
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776612964/download_f6oyz1.png',
    github: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/Databricks',
    live: 'https://databricksclone.netlify.app/',
  },
];

export default projectsData;
