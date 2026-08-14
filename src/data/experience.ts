import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "internship-2023",
    company: "Ushur",
    role: "Machine Learning Intern",
    type: "professional",
    startDate: "2023-06",
    endDate: "2023-08",
    description:
      "Gained hands-on experience building AI-powered automation solutions at Ushur, a Customer Experience Automation platform serving regulated industries.",
    responsibilities: [
      "Obtained practical experience with Customer Experience Automation systems, which intelligently automate complete customer experiences.",
      "Developed AI-powered workflows for practical uses, such as arranging appointments, processing claims, and providing customer service.",
      "Worked with regulated sectors, such as financial services, healthcare, and insurance, to comprehend automation and compliance needs.",
    ],
    skills: ["AI", "ML", "NLP"],
  },
  {
    id: "180-consulting-2026",
    company: "180 Degrees Consulting",
    role: "Junior Consultant",
    type: "technical",
    startDate: "2026-05",
    endDate: "Present",
    description:
      "Delivering strategic consulting services to nonprofit and social enterprise clients as part of the world's largest consultancy for nonprofits.",
    responsibilities: [
      "Worked directly with nonprofit clients to diagnose operational gaps and deliver actionable recommendations across a 10-week engagement cycle.",
      "Conducted market research and stakeholder interviews to build out strategy decks used in client presentations.",
      "Collaborated with a team of 4–6 consultants to scope project deliverables, divide workstreams, and hit weekly milestones.",
    ],
    skills: ["Strategy", "Market Research", "Client Management", "Consulting", "Presentation"],
  },
  {
    id: "akpsi-2026",
    company: "Alpha Kappa Psi",
    role: "Vice President of Professional Development",
    type: "leadership",
    startDate: "2026-05",
    endDate: "Present",
    description: "",
    responsibilities: [],
    skills: ["Leadership", "Public Speaking", "Budget Management", "Event Planning", "Conflict Resolution"],
  },
  {
    id: "formula-slug-2025",
    company: "Formula Slug",
    role: "High Voltage Electrical Team Member",
    type: "technical",
    startDate: "2025-10",
    endDate: "Present",
    description:
      "Contributing to the high voltage electrical systems of an FSAE electric race car, focusing on safety-critical power electronics and battery systems.",
    responsibilities: [
      "Performed electrical schematic design and PCB layout for high voltage components using industry-standard CAD tools.",
      "Diagnosed and troubleshot faults in the HV interlock loop and safety shutdown circuitry.",
      "Assembled and tested lithium-ion battery pack segments, including cell welding/bonding, module integration, and insulation resistance testing.",
    ],
    skills: ["PCB Design", "High Voltage", "Battery Systems", "Altium", "Electrical Schematics"],
  },
];
