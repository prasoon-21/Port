import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import styles from './stats.module.css';

const stats = [
  { number: '30+', label: 'Git Repositories', sub: 'Open-source & personal' },
  { number: '10+', label: 'Real-Life Projects', sub: 'AI, Full-Stack & Salesforce' },
  { number: '11 Mos', label: 'Experience', sub: 'Salesforce Trainee & AI Intern' },
  { number: '9.2', label: 'College CGPA', sub: 'B.Tech AI & Data Science' },
];

export function Stats({ id = 'stats', sectionRef, visible = true }) {
  return (
    <Section
      className={styles.statsSection}
      as="section"
      id={id}
      ref={sectionRef}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0}>
        {({ visible: isVisible, nodeRef }) => (
          <div ref={nodeRef} className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statSub}>{stat.sub}</div>
              </div>
            ))}
          </div>
        )}
      </Transition>
    </Section>
  );
}
