import { Game } from '@/types';

export const gamesData: Game[] = [
  {
    id: 'game-2048',
    slug: 'cyber-2048',
    title: 'Cyber 2048',
    tagline: 'Neon sliding block puzzle game. Merge matching numbers to reach the legendary 2048 tile and beyond.',
    description: 'A cyberpunk-themed, responsive 2048 puzzle game built with React state and smooth CSS grid transitions. Features high score persistence, keyboard arrows, and mobile touch swipe controls.',
    category: 'Puzzle',
    thumbnail: '/images/games/cyber-2048.png',
    tags: ['React', 'TypeScript', 'CSS Grid', 'Local Storage', 'Sound FX'],
    featured: true,
    playableOnline: true,
    controls: ['Arrow Keys or W/A/S/D to slide tiles', 'Swipe gestures on touchscreen devices', 'R key or Restart button to start fresh'],
    instructions: [
      'Use arrow keys or swipe to move all tiles in that direction.',
      'When two tiles with the same number collide, they merge into one with double value.',
      'Aim for the 2048 tile to achieve victory and keep pushing for the highest score!'
    ],
    difficulty: 'Medium',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Web Audio API']
  },
  {
    id: 'game-snake',
    slug: 'retro-snake-quest',
    title: 'Retro Snake Quest',
    tagline: 'Classic arcade snake with neon particle effects, speed scaling, and high score tracking.',
    description: 'A smooth 60 FPS HTML5 Canvas snake game with responsive D-pad controls for mobile devices, dynamic food generation, and customizable speed tiers.',
    category: 'Arcade',
    thumbnail: '/images/games/retro-snake.png',
    tags: ['HTML5 Canvas', 'TypeScript', 'Animation Loop', 'Arcade'],
    featured: true,
    playableOnline: true,
    controls: ['Arrow Keys or W/A/S/D to change direction', 'Touch directional pad on mobile', 'Spacebar to pause/resume'],
    instructions: [
      'Guide the snake to consume cyber energy orbs to grow longer and gain points.',
      'Avoid running into the outer perimeter walls or your own tail.',
      'Each orb consumed slightly increases snake velocity for greater challenge!'
    ],
    difficulty: 'Medium',
    techStack: ['HTML5 Canvas', 'RequestAnimationFrame', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'game-memory-matrix',
    slug: 'memory-matrix',
    title: 'Memory Matrix (Brain Hacker)',
    tagline: 'Neural pattern recall game. Memorize increasingly complex glowing sequences.',
    description: 'An interactive audio-visual memory challenge where players replicate illuminated tile sequences across escalating levels with life meters and combo multipliers.',
    category: 'Strategy',
    thumbnail: '/images/games/memory-matrix.png',
    tags: ['React', 'Web Audio API', 'State Machine', 'Memory Challenge'],
    featured: true,
    playableOnline: true,
    controls: ['Click or tap the illuminated pads in matching sequence', 'Watch carefully during the computer replay phase'],
    instructions: [
      'The matrix will illuminate a sequence of pads accompanied by tone frequencies.',
      'Once the demonstration concludes, repeat the sequence in the exact order.',
      'Each successful round adds another step. You have 3 shields before game over!'
    ],
    difficulty: 'Challenging',
    techStack: ['React', 'Web Audio Synthesizer', 'TypeScript', 'CSS Glow Effects']
  },
  {
    id: 'game-speed-typer',
    slug: 'code-speed-typer',
    title: 'Dev Code Typer',
    tagline: 'Developer typing sprint with real code snippets, live WPM, and syntax accuracy scoring.',
    description: 'Test your typing speed and programming fluency by typing real TypeScript, React, and SQL snippets under time pressure with instant visual error feedback.',
    category: 'Speed',
    thumbnail: '/images/games/code-typer.png',
    tags: ['TypeScript', 'Typing Engine', 'WPM Calculator', 'Developer Tools'],
    featured: false,
    playableOnline: true,
    controls: ['Type the displayed code snippet accurately', 'Press Tab or restart button to select a new snippet'],
    instructions: [
      'Begin typing the presented snippet in the input area.',
      'Correct letters show green, while incorrect keystrokes highlight red.',
      'Track your gross Words Per Minute (WPM) and accuracy percentage in real-time!'
    ],
    difficulty: 'Easy',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Typing Metrics Engine']
  }
];
