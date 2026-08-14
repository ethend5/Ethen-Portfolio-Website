import type { Skill } from "@/types";

// Set icon to a path like "/skills/python.png" to show an image in the skill card.
// Leave icon unset to show the skill's initials as a placeholder.
export const skills: Skill[] = [
  {
    name: "JavaScript",
    category: "programming",
    icon: "/skills/javascript.svg",
    description: "ES2020+, async/await, DOM manipulation, and browser APIs.",
    proficiency: 4,
  },
  {
    name: "Python",
    category: "programming",
    icon: "/skills/python.png",
    description: "Primary scripting language for data processing, instrument control, and ML pipelines.",
    proficiency: 5,
  },
  {
    name: "C",
    category: "programming",
    icon: "/skills/C.png",
    description: "Bare-metal and RTOS firmware for ARM Cortex-M microcontrollers.",
    proficiency: 4,
  },
  {
    name: "MATLAB",
    category: "programming",
    icon: "/skills/matlab.svg",
    description: "Signal processing, control system design (Simulink), and numerical analysis.",
    proficiency: 3,
  },
  {
    name: "React",
    category: "frontend",
    icon: "/skills/react.svg",
    description: "Component-driven UIs with hooks, context, and server components via Next.js.",
    proficiency: 4,
  },
  {
    name: "TailwindCSS",
    category: "frontend",
    icon: "/skills/tailwindcss.svg",
    description: "Utility-first styling with custom design systems and responsive layouts.",
    proficiency: 4,
  },
  {
    name: "CSS",
    category: "frontend",
    icon: "/skills/css.svg",
    description: "Grid, Flexbox, animations, and custom properties for polished interfaces.",
    proficiency: 4,
  },
  {
    name: "Node.js",
    category: "backend",
    icon: "/skills/nodejs.svg",
    description: "REST APIs, WebSocket servers, and instrument-control bridge scripts.",
    proficiency: 3,
  },
  {
    name: "Onshape",
    category: "cad",
    icon: "/skills/onshape.png",
    description: "Parametric part and assembly modeling for enclosures and mechanical fixtures.",
    proficiency: 3,
  },
  {
    name: "Fusion 360",
    category: "cad",
    icon: "/skills/fusion360.svg",
    description: "3D modeling and CAM for prototyping custom hardware enclosures and brackets.",
    proficiency: 5,
  },
];
