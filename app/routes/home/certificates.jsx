import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import styles from './certificates.module.css';

const certificates = [
  {
    title: 'McKinsey Forward Program',
    issuer: 'McKinsey & Company',
    date: 'Dec 2025',
    tag: 'Leadership & Strategy',
    description: 'Practical business transformation, strategic leadership, dynamic problem solving, and adaptability credential.',
    image: '/certificates/screenshot 2025-12-27 054856.png',
    link: 'https://www.credly.com/badges/52b55b84-7d31-4a2b-bc68-30f1c4395da2/linked_in_profile',
  },
  {
    title: 'Advance MCP (Model Context Protocol)',
    issuer: 'Anthropic / Skilljar',
    date: 'Nov 2025',
    tag: 'AI Engineering',
    description: 'Hands-on architectural mastery building custom MCP servers and Claude tool-use client integrations.',
    image: '/certificates/screenshot 2025-12-27 054917.png',
    link: 'https://verify.skilljar.com/c/35uu9g3pmwfo',
  },
  {
    title: 'Wells Fargo Software Engineering',
    issuer: 'Wells Fargo & Forage',
    date: 'Oct 2025',
    tag: 'Software Engineering',
    description: 'Virtual engineering job simulation covering entity-relationship diagram design and enterprise Java implementation.',
    image: '/certificates/screenshot 2025-12-27 054758.png',
    link: 'https://www.theforage.com/dashboard',
  },
  {
    title: 'HackerRank Software Engineer',
    issuer: 'HackerRank',
    date: 'Oct 2025',
    tag: 'Algorithms & Core CS',
    description: 'Certified software engineer demonstration across data structures, algorithmic efficiency, and problem solving.',
    image: '/certificates/screenshot 2025-10-26 230236.png',
    link: 'https://www.hackerrank.com/certificates/4c45bb395e54',
  },
  {
    title: 'Java & SQL Proficiency',
    issuer: 'Industry Certification',
    date: 'Sep 2025',
    tag: 'Backend & DB',
    description: 'Demonstrated mastery in object-oriented Java programming and relational database query manipulation.',
    image: '/certificates/screenshot 2025-12-27 054729.png',
    link: 'https://www.linkedin.com/in/prasoon-mishra-04409b32b/details/certifications/',
  },
  {
    title: 'HackerRank SQL (Advanced)',
    issuer: 'HackerRank',
    date: 'Oct 2025',
    tag: 'Database Engineering',
    description: 'Advanced SQL certification demonstrating complex multi-table joins, subqueries, and database performance optimization.',
    image: '/certificates/screenshot 2025-12-27 054839.png',
    link: 'https://www.hackerrank.com/certificates/4c45bb395e54',
  },
  {
    title: 'Basic Cloud Computing',
    issuer: 'Cloud Fundamentals',
    date: 'Apr 2025',
    tag: 'Cloud & Infrastructure',
    description: 'Foundational cloud computing architectures, storage mechanisms, virtual instances, and deployment strategies.',
    image: '/certificates/screenshot 2025-12-27 054700.png',
    link: 'https://www.linkedin.com/in/prasoon-mishra-04409b32b/details/certifications/1760010569457/single-media-viewer/?profileId=ACoAAFMg03QBWZAh3QmU15h-0lQ5CgK7Tt5myII',
  },
];

export function Certificates({ id = 'certificates', sectionRef, visible = true }) {
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.certificates}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0}>
        {({ visible: isVisible, nodeRef }) => (
          <div ref={nodeRef}>
            <header className={styles.header}>
              <Heading level={3} as="h2" id={titleId}>
                <DecoderText text="Verified Certificates & Credentials" start={isVisible} delay={300} />
              </Heading>
              <p className={styles.subtitle}>
                Industry-recognized achievements and credentials from continuous learning and professional development.
              </p>
            </header>

            <div className={styles.grid}>
              {certificates.map((cert, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className={styles.image}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.metaRow}>
                      <span className={styles.badge}>{cert.tag}</span>
                      <span className={styles.date}>{cert.date}</span>
                    </div>
                    <h3 className={styles.title}>{cert.title}</h3>
                    <p className={styles.description}>{cert.description}</p>
                    <div className={styles.actionButton}>
                      <Button
                        secondary
                        href={cert.link}
                        target="_blank"
                        icon="arrow-right"
                      >
                        View Credential
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
