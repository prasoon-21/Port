import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { baseMeta } from '~/utils/meta';
import { Link as RouterLink } from '@remix-run/react';
import styles from './about.module.css';

export const meta = () => {
  return baseMeta({
    title: 'In-Depth About Me | Prasoon Kumar',
    description: 'Detailed background, academic transformation, technical philosophy, soft skills, and competitive athletics of Prasoon Kumar.',
  });
};

export const About = () => {
  return (
    <>
      <Section className={styles.aboutPage} as="article">
        <RouterLink to="/#details" className={styles.backLink}>
          ← Back to Portfolio
        </RouterLink>

        <header className={styles.header}>
          <Heading level={2} as="h1" className={styles.title}>
            <DecoderText text="In-Depth Profile" delay={200} />
          </Heading>
          <p className={styles.subtitle}>Prasoon Kumar • AI Engineer & Creative Developer</p>
        </header>

        <div className={styles.introBox}>
          Hi, I’m <strong>Prasoon Kumar</strong>, a Computer Science student pursuing my B.Tech in Artificial
          Intelligence and Data Science at Global Institute of Technology. I am deeply passionate about
          leveraging agentic AI, modern web frameworks, and robust DevOps architectures to build impactful,
          real-world systems that bridge humans with intelligent machines.
        </div>

        <div className={styles.sectionsGrid}>
          {/* Academics */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>🎓</div>
              <h2 className={styles.sectionTitle}>Academic Journey & Work Ethic</h2>
            </div>
            <p className={styles.sectionText}>
              Evolving focus and increasing commitment have characterized my journey into technology. Though at
              school, I maintained an average academic record, it was during my college years that things began to
              fall into place, and I started to channelize my energy seriously into my career.
            </p>
            <p className={styles.sectionText}>
              This transformation ignited a powerful work ethic and a determination to excel, evidenced by my
              consistent academic performance maintaining a <strong>9.2 GPA</strong> in B.Tech Computer Science with
              specialization in Artificial Intelligence and Data Science. This dedication fuels my passion to thrive
              in high-growth technical environments.
            </p>
            <div className={styles.badgeGroup}>
              <span className={styles.badge}>9.2 College GPA</span>
              <span className={styles.badge}>B.Tech AI & Data Science</span>
              <span className={styles.badge}>Global Institute of Technology (2023–2027)</span>
            </div>
          </div>

          {/* Technical Philosophy & Interests */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>⚡</div>
              <h2 className={styles.sectionTitle}>Technical Philosophy & Interests</h2>
            </div>
            <p className={styles.sectionText}>
              I am deeply fascinated by the transformative potential of <strong>Cloud</strong>, <strong>DevOps</strong>,
              and <strong>Agentic AI</strong>. My focus centers on how LLM orchestration (n8n, LangChain, FastMCP) can
              streamline fragmented workflows, automate complex business logic, and eliminate repetitive friction for users.
            </p>
            <p className={styles.sectionText}>
              From architecting <strong>WorkSync AI</strong> to orchestrate Google Workspace via local SQLite and Gemini, to
              engineering <strong>FlipMO</strong> on Salesforce Experience Cloud with reusable LWC components, I enjoy
              blending clean visual aesthetics with resilient backend infrastructure.
            </p>
            <div className={styles.badgeGroup}>
              <span className={styles.badge}>Model Context Protocol (FastMCP)</span>
              <span className={styles.badge}>Salesforce Lightning / LWC</span>
              <span className={styles.badge}>Docker & Kubernetes</span>
              <span className={styles.badge}>Three.js & React</span>
              <span className={styles.badge}>WebRTC Peer-to-Peer</span>
            </div>
          </div>

          {/* Core Soft Skills */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>🤝</div>
              <h2 className={styles.sectionTitle}>Core Soft Skills</h2>
            </div>
            <p className={styles.sectionText}>
              Great software engineering extends far beyond writing code; it hinges on clarity, collaboration, and grit:
            </p>
            <ul className={styles.skillsList}>
              <li className={styles.skillItem}>
                <strong>Communication</strong>
                Ability to articulate technical trade-offs, write clear documentation, and converse effectively across teams.
              </li>
              <li className={styles.skillItem}>
                <strong>Teamwork & Collaboration</strong>
                A collaborative mindset that values mutual code reviews, paired debugging, and collective ownership of goals.
              </li>
              <li className={styles.skillItem}>
                <strong>Resilience</strong>
                Approaching tough blockers and edge-cases methodically, learning from setbacks, and persisting until resolved.
              </li>
              <li className={styles.skillItem}>
                <strong>Adaptability & Rapid Learning</strong>
                Thriving in fast-paced startup environments and mastering unfamiliar frameworks, tools, or APIs within days.
              </li>
            </ul>
          </div>

          {/* Extracurriculars & Competitive Sports */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>🏆</div>
              <h2 className={styles.sectionTitle}>Extracurriculars & Athletic Background</h2>
            </div>
            <p className={styles.sectionText}>
              Beyond academics, I have a well-rounded and disciplined foundation. Early on, I challenged myself by
              participating in national Olympiads. In college, I actively collaborate with our premier coding clubs,
              <strong>Code-Up</strong> and <strong>Hack-the-Mint</strong>, organizing peer hackathons and tech bootcamps.
            </p>
            <p className={styles.sectionText}>
              My experience in competitive athletics has been equally formative. As a competitive Kabaddi player, I
              represented <strong>Saran district, Bihar at the district level</strong>. In college, I had the honor of
              leading and captaining collegiate squads in inter-college sports championships and was selected for the
              prestigious <strong>Rajasthan Technical University (RTU) trials</strong>.
            </p>
            <p className={styles.sectionText}>
              The mat taught me quick tactical assessment, staying calm under intense pressure, anticipating opponents’
              moves, and relying wholly on teammates — qualities that translate directly to engineering under production deadlines.
            </p>
            <div className={styles.badgeGroup}>
              <span className={styles.badge}>District Kabaddi Representative (Saran, Bihar)</span>
              <span className={styles.badge}>RTU University Trials Selection</span>
              <span className={styles.badge}>Collegiate Team Captain</span>
              <span className={styles.badge}>Code-Up & Hack-the-Mint Clubs</span>
            </div>
          </div>
        </div>

        <div className={styles.calloutBox}>
          I actively seek opportunities to apply my technical knowledge, soft skills, and team-oriented mindset to real-world
          engineering challenges. I am eager to join a forward-thinking team to build cutting-edge intelligent products.
        </div>

        <div className={styles.actions}>
          <Button href="/resume.pdf" download="Prasoon_Kumar_Resume.pdf" icon="arrow-right">
            Download Resume (CV)
          </Button>
          <Button secondary href="/contact" icon="send">
            Send Me a Message
          </Button>
          <Button secondary href="/#details" icon="arrow-right">
            Back to Portfolio
          </Button>
        </div>
      </Section>
      <Footer />
    </>
  );
};
