import worksyncImg from '~/assets/worksync-ai.png';
import flipmoImg from '~/assets/flipmo-1.png';
import asesinoMeetImg from '~/assets/asesino-meet.png';
import characterQuestImg from '~/assets/character-quest.png';
import mcpServerImg from '~/assets/mcp-server.png';
import tempifyImg from '~/assets/tempify.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { Skills } from './skills';
import { Stats } from './stats';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

export const links = () => [];

export const meta = () => {
  return baseMeta({
    title: 'Frontend Engineer & Creative Developer',
    description: `Portfolio of ${config.name} — Frontend Engineer specializing in interactive UI, Three.js, Salesforce LWC, AI Agents, and modern web architectures.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const intro = useRef();
  const statsRef = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const projectSix = useRef();
  const skillsSection = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [
      intro,
      statsRef,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive,
      projectSix,
      skillsSection,
      details,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    sections.forEach(section => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
      />

      {/* Key Metrics / Highlights */}
      <Stats
        id="stats"
        sectionRef={statsRef}
        visible={visibleSections.includes(statsRef.current)}
      />

      {/* Project 1: WorkSync AI */}
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="WorkSync AI: Unified Google Workspace Agent"
        description="An AI-powered multi-agent hub allowing users to manage their entire Google Workspace (Gmail, Calendar, Drive, Docs, Sheets, Slides, Tasks) through a single conversational interface. Eliminates tab switching through an n8n orchestration layer, Google Gemini LLM API, NVIDIA Nemotron reasoning, and local SQLite synchronization."
        techStack={[
          'Multi-Agent AI',
          'n8n Orchestrator',
          'Google Gemini API',
          'NVIDIA Nemotron',
          'Workspace APIs',
          'SQLite Sync',
          'React',
        ]}
        buttonText="Live"
        buttonLink="https://chat-summery-buddy.onrender.com/hikpmx7g"
        githubLink="https://github.com/prasoon-21/chat-summery-buddy"
        model={{
          type: 'custom',
          image: worksyncImg,
          alt: 'WorkSync AI - Workspace Agent Interface',
        }}
      />

      {/* Project 2: FlipMO on Salesforce */}
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="FlipMO: Unified Commerce Platform on Salesforce"
        description="Enterprise multi-vertical platform combining E-commerce (Flipkart-style), Travel Booking (Flights, Hotels, Buses), and Movie Ticket Booking into a single Salesforce Lightning application. Built with a 'Maximum Standard, Minimum Custom' philosophy using 7 reusable LWC components, Standard Objects, SLDS styling, and Lightning Flows for cross-vertical unified cart and checkout."
        techStack={[
          'Salesforce',
          'Lightning Web Components (LWC)',
          'Apex',
          'Lightning Flows',
          'SLDS Styling',
          'Unified Cart',
        ]}
        buttonText="Live"
        buttonLink="https://orgfarm-9743fa1da3-dev-ed.develop.my.site.com/flipmo/s/"
        githubLink="https://github.com/prasoon-21/FlipMO"
        model={{
          type: 'custom',
          image: flipmoImg,
          alt: 'FlipMO Salesforce Unified Commerce Platform',
        }}
      />

      {/* Project 3: Asesino Meet */}
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Asesino Meet: Serverless WebRTC Video Calling"
        description="A real-time peer-to-peer video conferencing application with instant media streaming, no central server logs, rooms management, and smooth responsive UI."
        techStack={['React.js', 'WebRTC', 'Socket.io', 'CSS Modules']}
        buttonText="Live"
        buttonLink="https://asesino-meet.vercel.app/"
        githubLink="https://github.com/prasoon-21/WebRTC"
        model={{
          type: 'custom',
          image: asesinoMeetImg,
          alt: 'Asesino Meet WebRTC Application',
        }}
      />

      {/* Project 4: Character Quest */}
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Character Quest: PC Game Character Encyclopedia"
        description="A fan-crafted Game Character Encyclopedia website showcasing iconic PC game characters with detailed profiles, game-specific themes, and interactive animations."
        techStack={['HTML5', 'CSS3', 'JavaScript', 'Responsive UI']}
        buttonText="Live"
        buttonLink="https://character-quest.vercel.app/"
        githubLink="https://github.com/prasoon-21/characterQuest"
        model={{
          type: 'custom',
          image: characterQuestImg,
          alt: 'Character Quest Game Encyclopedia',
        }}
      />

      {/* Project 5: AsesinoMCP */}
      <ProjectSummary
        id="project-5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
        title="AsesinoMCP: Model Context Protocol Server"
        description="Engineered a custom Model Context Protocol (MCP) server for AI assistants and Claude, eliminating manual context switching to track expenses, manage habits, and automate system tasks."
        techStack={['Python', 'FastMCP', 'SQLite', 'Agentic AI']}
        buttonText="Live Server"
        buttonLink="https://AsesinoMCP.fastmcp.app"
        githubLink="https://github.com/prasoon-21/AsesinoMCP-Server"
        model={{
          type: 'custom',
          image: mcpServerImg,
          alt: 'AsesinoMCP Server Architecture',
        }}
      />

      {/* Project 6: Tempify */}
      <ProjectSummary
        id="project-6"
        alternate
        sectionRef={projectSix}
        visible={visibleSections.includes(projectSix.current)}
        index={6}
        title="Tempify: Atmospheric Sky & Weather Forecaster"
        description="Interactive weather platform delivering sky and atmospheric forecasts with dynamic condition rendering and OpenWeatherMap API integration."
        techStack={['Golang', 'OpenWeatherMap API', 'HTML5', 'CSS3']}
        buttonText="Live"
        buttonLink="https://tempify-forecating-sky.vercel.app/"
        githubLink="https://github.com/prasoon-21/Tempify"
        model={{
          type: 'custom',
          image: tempifyImg,
          alt: 'Tempify Weather Application',
        }}
      />

      <Skills
        id="skills"
        sectionRef={skillsSection}
        visible={visibleSections.includes(skillsSection.current)}
      />

      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />

      <Footer />
    </div>
  );
};
