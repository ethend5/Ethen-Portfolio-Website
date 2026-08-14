import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "ChainPilot",
    slug: "chainpilot",
    description:
      "A closed-loop testing framework for enterprise AI agents built in 24 hours at the Hack-a-Claw NVIDIA Hackathon at UCSC, pairing a live supply chain simulation with a multi-agent pipeline powered by NVIDIA Nemotron.",
    longDescription:
      "Designed and built ChainPilot, a closed-loop testing framework for enterprise AI agents, in 24 hours for the Hack-a-Claw NVIDIA Hackathon at UCSC. The system pairs a live supply chain simulation with a multi-agent pipeline powered by NVIDIA Nemotron and orchestrated via OpenClaw. A proposer agent, a critic agent, and an executor agent work together against a real backend with constrained APIs. Every decision gets evaluated on measurable downstream KPIs including service level, cost, emissions, and profit.",
    date: "2026-05",
    tags: ["NVIDIA Nemotron", "Multi-Agent AI", "Python", "OpenClaw", "Supply Chain", "Agentic AI"],
    image: "",
    featured: true,
    category: "ai",
    problem:
      "Most AI agent frameworks only ask whether an agent completed a task. In enterprise environments, that is not enough. An agent might call the right API but still make a decision that makes the overall system worse. Existing evaluation tools focus on reasoning and tool use, but none of them measure what actually happens after the agent acts.",
    process:
      "Started by reading research on agentic AI topics like ReAct, Reflexion, and multi-agent critique to find the gap between task completion and decision quality. From there, designed a system where three specialized agents handle proposal, critique and revision, and constrained execution separately. Built the supply chain simulation with KPIs that intentionally conflict with each other, so agents have to reason through real tradeoffs instead of just solving a static prompt.",
    challenges:
      "Keeping multi-agent state consistent across all three agent turns was tricky within a 24-hour build window. Making sure agents could not silently change simulation state required careful constraint enforcement at the API layer, so all execution had to flow through validated backend calls. Getting the real-time KPI comparison working on the dashboard, so users could see before and after impact clearly, also took several rounds of iteration under time pressure.",
    results:
      "Delivered a fully deployed, working agent system within the 24-hour limit. The demo walked through a concrete supply chain scenario where Chicago had surplus inventory and the West Coast distribution center was at risk of stockout. The full propose, critique, and execute loop ran live, and the dashboard updated in real time showing measurable KPI changes after each agent decision.",
    lessons:
      "Separating the simulator from the optimizer early on was the right call. It kept the agents honest and made the evaluation meaningful rather than circular. Defining the execution constraint model before writing agent logic also helped avoid a whole category of hard-to-debug bugs where agents were silently mutating state. Running a critic agent on top of the proposer noticeably improved decision quality, which was a good real-world validation of the core idea behind the project.",
  },
  {
    title: "Toaster Oven FSM",
    slug: "toaster-oven-fsm",
    description:
      "A simulated toaster oven controller written in embedded C for a microcontroller with an OLED display, 8 LEDs, two buttons, and a potentiometer — logic built entirely around a software finite state machine.",
    longDescription:
      "Designed and programmed a simulated toaster oven controller in C for an embedded systems course at UC Santa Cruz. The project ran on a microcontroller connected to a physical OLED screen, 8 LEDs, two buttons, and a potentiometer. The oven had three cooking modes: bake, toast, and broil, each with different heating element behavior and configurable settings. All of the logic was built around a software finite state machine written inside a single switch statement in C.",
    date: "2026-05",
    tags: ["Embedded C", "FSM", "Microcontroller", "OLED", "Embedded Systems", "State Machine", "C"],
    image: "/projects/toaster-oven-fsm.png",
    demo: "https://youtube.com/shorts/4BcS9qXNCK8?feature=share",
    demoLabel: "Watch Video",
    featured: true,
    category: "embedded",
    problem:
      "The main challenge was handling multiple things happening at once: button presses, knob adjustments, and a countdown timer all needed to work together without the system freezing or missing inputs. A simple polling loop would have been too slow and messy to manage. The system needed to respond instantly to user input while also tracking time, updating the display, and keeping several state variables in sync.",
    process:
      "Before writing any code, spent a lot of time tracing through the FSM diagram from the lab manual, following every state transition and condition by hand. The four states were SETUP, SELECTOR_CHANGE_PENDING, COOKING, and RESET_PENDING. Development was done one transition at a time, starting with getting the OLED display working with placeholder data so there was always something visible to check against. From there, the struct holding all oven data was built out, and each new state was added and tested before moving on to the next one.",
    challenges:
      "Long press detection was one of the trickier parts. Since the main loop could not be blocked waiting for a button release, a free-running counter was used instead. A hardware timer fires at 5 Hz and increments a module-level variable, and the elapsed time between two events is just the difference between the counter values at each moment. This works correctly even when the counter rolls over because of how two's complement integer subtraction works. Another challenge was the LED progress bar, which needed to show cook time remaining in eighths without using any floating point math. Getting the multiply-before-divide order right was important to avoid losing precision from integer truncation. Keeping everything event-driven also took discipline since interrupts were only allowed to set flags, with all actual logic handled back in the state machine.",
    results:
      "The finished program cycled through all three cooking modes correctly, counted down time at the right rate, and updated the OLED and LEDs only when something actually changed. Both short and long button presses were detected reliably, and the oven could never get stuck in a bad state since every possible input had a defined response in every state.",
    lessons:
      "This project showed how useful state machines are for organizing complicated behavior. What looked like a confusing mess of timing conditions and input modes became a lot clearer once everything was tied to specific states and transitions. The free-running counter was also a useful technique that would apply to a lot of other embedded projects. Writing the display function first and using it to check internal state throughout development turned out to be much faster than stepping through code with a debugger.",
  },
  {
    title: "Electromagnetic Car",
    slug: "electromagnetic-car",
    description:
      "A battery-powered car built for AP Physics C that drives to a set of paper clips and picks them up using a hand-wound electromagnet, powered by a parallel circuit from two AA batteries.",
    longDescription:
      "Designed and built a small electromagnetic car for AP Physics C in high school. The car used two AA batteries wired in a parallel circuit to power both a set of drive wheels and a homemade electromagnet at the same time. The electromagnet was built by wrapping copper wire around a bolt to create a coil that could generate a magnetic field strong enough to pick up metal objects. The goal was to drive the car to a set of paper clips and pick up all 10 of them.",
    date: "2025-05",
    tags: ["Electromagnetics", "Circuit Design", "Parallel Circuit", "Physics", "AP Physics C"],
    image: "/projects/electromagnetic-car.png",
    demo: "https://youtube.com/shorts/RFz2Em4uBmo?feature=share",
    demoLabel: "Watch Video",
    featured: true,
    category: "hardware",
    problem:
      "The main challenge was figuring out how to power two separate systems, the motors and the electromagnet, from the same low-voltage battery source without one system pulling too much current and weakening the other. A series circuit would have split the voltage and left both systems underpowered, so the wiring setup needed to be thought through carefully.",
    process:
      "Started by planning out the circuit on paper before building anything. Chose a parallel configuration so both the drive motors and the electromagnet would each receive the full 1.5 volts from the batteries rather than sharing it. The AP Physics C coursework on electromagnetism and Ampere's Law directly informed the decision to maximize the number of wire turns on the bolt, since more turns means a stronger magnetic field.",
    challenges:
      "Getting the electromagnet strong enough to reliably lift paper clips took several winding attempts. Too few turns and the magnet was too weak. The parallel circuit also needed to be wired cleanly to avoid shorts, which required careful attention during assembly. Balancing the car's weight distribution so it could drive straight while carrying the electromagnet on the front also took some adjustment.",
    results:
      "The car successfully picked up all 10 paper clips in the final test. The parallel circuit kept both systems running at full power throughout the run, and the hand-wound electromagnet held all 10 clips without dropping any.",
    lessons:
      "This project brought a lot of the AP Physics C curriculum to life in a hands-on way. Concepts like magnetic flux, current loops, and circuit analysis stopped being just formulas and became real design decisions with visible results. Planning the circuit layout before starting the physical build also saved a lot of time and prevented wiring mistakes during assembly.",
  },
  {
    title: "Thor Hammer Microphone Holder",
    slug: "thor-hammer-microphone-holder",
    description:
      "A scaled-up Thor Hammer microphone holder designed and fabricated in a PLTW Engineering Design and Development course, featuring a three-part snap assembly and custom Celtic and Greek detailing.",
    longDescription:
      "Designed and built a Thor Hammer microphone holder for Engineering Design and Development, a PLTW course in high school. The holder was scaled up from a toy Thor Hammer that belonged to our teacher and redesigned to fit a real microphone inside the handle. The final product was a three-part assembly that snaps together through a locking mechanism and lets the user speak into the microphone while it sits inside the hammer head.",
    date: "2024-11",
    tags: ["CAD", "Fusion 360", "Product Design", "Fabrication", "PLTW"],
    image: "/projects/thor-hammer.png",
    demo: "https://youtu.be/sxhJGrL8yqU",
    demoLabel: "Watch Video",
    featured: true,
    category: "hardware",
    problem:
      "This was an unnecessary invention, and we knew that going in. The goal was not to solve a practical problem but to practice the full engineering design process from constraints and research through modeling and fabrication, using a fun concept as the vehicle.",
    process:
      "Used our teacher's toy Thor Hammer as the reference model and scaled it up proportionally so the microphone could fit inside the handle without making the hammer look distorted. Broke the design into three separate parts to make it easier to manufacture and assemble. Added a locking snap mechanism so the pieces connect securely and the microphone can be loaded in through the top. Also incorporated a Celtic Star on the sides of the hammer to represent our classmate Geuss' heritage, and stamped the piece with \"Microphone Ethen and Aadi Co 2025\" written in Greek letters because it looked cool and gave the project some personality.",
    challenges:
      "The biggest constraint was keeping the hammer proportional to the original toy while also making it large enough to actually hold a microphone. Scaling up a model while preserving visual proportions required careful measurement and several design revisions. Getting the three-part locking mechanism to snap together cleanly and hold under normal use also took a few iterations to dial in.",
    results:
      "The final hammer holder fit the microphone correctly, maintained proportional dimensions relative to the original toy, and held together reliably through the locking mechanism. The top opening allowed the microphone to remain fully functional while seated inside the hammer head.",
    lessons:
      "Scaling an existing object into a functional product is harder than it looks. Small proportion errors that seem minor in a sketch become obvious in the physical model. Breaking the design into separate parts early on made the whole build more manageable and made it easier to fix individual sections without rebuilding the whole thing. Also learned that adding meaningful personal details, like the Celtic Star and the Greek text, makes a project feel like it actually belongs to the people who built it.",
  },
  {
    title: "TV Wall",
    slug: "tv-wall",
    description:
      "A four-TV video wall built as a PLTW capstone project, mounted on a custom unistrut frame and installed in a high school classroom to replace an outdated projector with a brighter, more flexible display.",
    longDescription:
      "Designed and built a four-TV video wall as the capstone project for Engineering Design and Development, a PLTW course in high school. The project spanned the entire second semester and was completed in May 2025. The display was mounted on a custom unistrut frame built from scratch and installed on the classroom wall. The four TVs could either combine into one large unified display or operate independently, giving the teacher a much more flexible and visible presentation setup than the old projector system.",
    date: "2025-05",
    tags: ["Fabrication", "Unistrut", "AV Systems", "Structural Design", "PLTW"],
    image: "/projects/tv-wall.png",
    featured: false,
    category: "hardware",
    problem:
      "The existing classroom projector was outdated, low quality, and nearly impossible to see when the lights were on. Its positioning on the ceiling made visibility even worse for students sitting at certain angles. On top of that, three whiteboards behind the projector screen were completely blocked off and going unused. The classroom needed a display solution that was brighter, clearer, and did not take up the whiteboard space.",
    process:
      "Spent the first portion of the semester defining the problem, researching solutions, and narrowing down the best approach. Landed on a four-TV setup as the most practical option because it was cheaper than a single large commercial display, more customizable, and easier to repair or replace individual panels down the line. From there, moved into designing a unistrut frame from scratch to hold all four TVs flush against the wall in a two-by-two grid. The back half of the semester was focused on fabrication, assembly, and installation. Configured the TVs so they could either mirror or extend a single source across all four screens as one large output, or run independently for different use cases.",
    challenges:
      "Building a frame sturdy enough to safely hold four TVs required careful planning around load distribution and wall anchoring. Getting all four panels aligned precisely so the combined display looked seamless took significant adjustment during installation. Routing the cables cleanly and making sure each TV could switch between unified and independent modes without a complicated setup also required some problem solving. Having a full semester to work through the project helped a lot because it gave enough time to go back and revise decisions that did not work out on the first attempt.",
    results:
      "The video wall was successfully installed and put into active use in the classroom before the end of the school year. The four-TV setup delivered a significantly brighter and clearer image than the old projector under normal classroom lighting. The whiteboards that were previously blocked became accessible again, and teachers gained the flexibility to use the full combined display or individual screens depending on the lesson.",
    lessons:
      "A semester-long capstone project teaches you things that shorter projects do not. Having extended time meant the early planning decisions actually mattered because there was enough runway to see how they played out later in the build. Working with unistrut also taught a lot about structural planning before cutting or assembling anything, since mistakes in the frame are hard to fix once the steel is mounted. The project also showed how a well-scoped engineering solution does not have to be expensive to be effective. Four consumer TVs on a custom frame outperformed a dedicated projector system at a fraction of the replacement cost.",
  },
];
