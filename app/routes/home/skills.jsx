import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { useEffect, useRef, useState } from 'react';
import styles from './skills.module.css';


const skillItems = [
  { name: 'React JS', image: '/skills/react.webp' },
  { name: 'JavaScript', image: '/skills/javascript.jpg' },
  { name: 'HTML5', image: '/skills/html.webp' },
  { name: 'CSS3', image: '/skills/css.webp' },
  { name: 'Bootstrap', image: '/skills/bootstrap.webp' },
  { name: 'AI Agents & MCP', image: '/skills/mcp.png' },
  { name: 'Docker', image: '/skills/docker.webp' },
  { name: 'Kubernetes', image: '/skills/kubernetes.webp' },
  { name: 'Jenkins CI/CD', image: '/skills/jenkins.webp' },
  { name: 'Git & GitHub', image: '/skills/github.svg' },
  { name: 'n8n Automation', image: '/skills/n8n.webp' },
  { name: 'MySQL', image: '/skills/sql.webp' },
  { name: 'Postman', image: '/skills/postman.webp' },
  { name: 'Tableau', image: '/skills/tableau.webp' },
  { name: 'Go (Golang)', image: '/skills/golang.webp' },
  { name: 'C++', image: '/skills/cpp.webp' },
  { name: 'Java', image: '/skills/java.webp' },
  { name: 'Ubuntu / Linux', image: '/skills/ubuntu.webp' },
];

export function Skills({ id, visible, sectionRef }) {
  const titleId = `${id}-title`;
  const arenaRef = useRef(null);
  const itemsRef = useRef([]);
  const hoveredIndexRef = useRef(null);

  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    let animId;
    const cardSize = window.innerWidth <= 696 ? 75 : 90;
    let width = arena.clientWidth || 900;
    let height = arena.clientHeight || 550;

    // Distribute skills across the container initially
    const cols = Math.max(3, Math.floor(width / (cardSize + 40)));
    const rows = Math.ceil(skillItems.length / cols);
    const colWidth = width / cols;
    const rowHeight = height / rows;

    const particles = skillItems.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const baseX = col * colWidth + Math.random() * (colWidth - cardSize);
      const baseY = row * rowHeight + Math.random() * (rowHeight - cardSize);

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.35 + Math.random() * 0.45;

      return {
        x: Math.max(10, Math.min(width - cardSize - 10, baseX)),
        y: Math.max(10, Math.min(height - cardSize - 10, baseY)),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });

    const handleResize = () => {
      if (!arena) return;
      width = arena.clientWidth;
      height = arena.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const updatePhysics = () => {
      const maxX = width - cardSize;
      const maxY = height - cardSize;

      particles.forEach((p, idx) => {
        const el = itemsRef.current[idx];
        if (!el) return;

        // If hovered, pause movement
        if (hoveredIndexRef.current === idx) {
          return;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off left/right
        if (p.x <= 5) {
          p.x = 5;
          p.vx = Math.abs(p.vx);
        } else if (p.x >= maxX) {
          p.x = maxX;
          p.vx = -Math.abs(p.vx);
        }

        // Bounce off top/bottom
        if (p.y <= 5) {
          p.y = 5;
          p.vy = Math.abs(p.vy);
        } else if (p.y >= maxY) {
          p.y = maxY;
          p.vy = -Math.abs(p.vy);
        }

        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      });

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Section
      className={styles.skills}
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
                <DecoderText text="Skills & Technologies" start={isVisible} delay={300} />
              </Heading>
            </header>

            {/* Freely Moving Skills Arena (Hidden/No Border) */}
            <div className={styles.arenaContainer} ref={arenaRef}>
              {skillItems.map((skill, idx) => (
                <div
                  key={idx}
                  ref={el => (itemsRef.current[idx] = el)}
                  className={styles.floatingSkill}
                  onMouseEnter={() => {
                    hoveredIndexRef.current = idx;
                  }}
                  onMouseLeave={() => {
                    hoveredIndexRef.current = null;
                  }}
                >
                  <div className={styles.skillBubble}>
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className={styles.skillImg}
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.skillTooltip}>{skill.name}</span>
                </div>
              ))}
            </div>

            {/* Separate Card for Certificates */}
            <div className={styles.certCard}>
              <div className={styles.certContent}>
                <div className={styles.certBadge}>Credentials & Awards</div>
                <h3 className={styles.certTitle}>Verified Certifications</h3>
                <p className={styles.certDesc}>
                  Professional certifications from McKinsey & Company, Anthropic / Skilljar (Advance MCP), Wells Fargo Software Engineering, HackerRank, and Cloud Computing.
                </p>
              </div>
              <Button href="/certificates" iconHoverShift iconEnd="arrow-right">
                View All Certificates
              </Button>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
