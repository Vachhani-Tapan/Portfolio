import React from 'react';
import { Gamepad2 } from 'lucide-react';

const gameData = [
  {
    title: 'Color Guess Game',
    description: 'An engaging quiz game testing your ability to identify the correct RGB/HEX color codes among varying visual palettes.',
    points: [
      'Dynamic DOM manipulation',
      'Randomized color generation logic',
      'Instant interactive feedback',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-3.5 h-3.5" alt="JS" />, label: 'JavaScript' },
      { icon: <Gamepad2 size={14} className="text-gray-300" />, label: 'Game Dev' }
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776443397/WhatsApp_Image_2026-04-17_at_9.55.37_PM_sbmykg.jpg',
    github: 'https://github.com/Vachhani-Tapan/Games/tree/main/ColorGuess',
    live: 'https://color-guessing-project.netlify.app/',
  },
  {
    title: 'Typing Speed Game',
    description: 'A fast-paced typing test application that calculates your precise WPM (Words Per Minute) and accuracy in real-time.',
    points: [
      'Real-time keystroke event listeners',
      'Countdown timer mechanics',
      'Accuracy calculation algorithm',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-3.5 h-3.5" alt="JS" />, label: 'JavaScript' },
      { icon: <Gamepad2 size={14} className="text-gray-300" />, label: 'Game Dev' }
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776443616/WhatsApp_Image_2026-04-17_at_9.55.21_PM_ip0zky.jpg',
    github: 'https://github.com/Vachhani-Tapan/Games/tree/main/TypingSpeed',
    live: 'https://typing-speed-game1.netlify.app/',
  },
  {
    title: 'Memory Flip Game',
    description: 'A classic memory matching brain game featuring satisfying card flip animations and score tracking based on attempts.',
    points: [
      'CSS 3D transform animations',
      'Fisher-Yates array shuffling',
      'Match tracking and validation state',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-3.5 h-3.5" alt="JS" />, label: 'JavaScript' },
      { icon: <Gamepad2 size={14} className="text-gray-300" />, label: 'Game Dev' }
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776444000/WhatsApp_Image_2026-04-17_at_9.56.00_PM_u8irrk.jpg',
    github: 'https://github.com/Vachhani-Tapan/Games/tree/main/MemoryFilp',
    live: 'https://memory-flip-cardgame1.netlify.app/',
  },
  {
    title: 'Whack-a-mole Game',
    description: 'An interactive, arcade-style reflex game where players click randomly emerging targets before the rapid timer runs out.',
    points: [
      'Asynchronous interval event looping',
      'Score multiplier logic',
      'Cursor-based hit detection',
    ],
    tags: [
      { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-3.5 h-3.5" alt="JS" />, label: 'JavaScript' },
      { icon: <Gamepad2 size={14} className="text-gray-300" />, label: 'Game Dev' }
    ],
    image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/q_auto/f_auto/v1776443397/WhatsApp_Image_2026-04-17_at_9.56.53_PM_pjog4o.jpg',
    github: 'https://github.com/Vachhani-Tapan/Games/tree/main/Whack-a-Mole',
    live: 'https://whack-a-mole-proj1.netlify.app/',
  },
];

export default gameData;
