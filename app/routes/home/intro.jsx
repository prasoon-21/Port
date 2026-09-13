import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Section } from '~/components/section';
import { useTheme } from '~/components/theme-provider';
import { Transition } from '~/components/transition';
import { useInterval, usePrevious } from '~/hooks';
import { Suspense, lazy, useEffect, useState } from 'react';
import config from '~/config.json';
import { useHydrated } from '~/hooks/useHydrated';
import styles from './intro.module.css';

const DisplacementSphere = lazy(() =>
  import('./displacement-sphere').then(module => ({ default: module.DisplacementSphere }))
);

export function Intro({ id, sectionRef, ...rest }) {
  const { theme } = useTheme();
  const { disciplines } = config;
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const prevTheme = usePrevious(theme);
  const currentDiscipline = disciplines[disciplineIndex] || disciplines[0];
  const titleId = `${id}-title`;
  const isHydrated = useHydrated();

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    3000,
    theme
  );

  useEffect(() => {
    if (prevTheme && prevTheme !== theme) {
      setDisciplineIndex(0);
    }
  }, [theme, prevTheme]);

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme} timeout={3000}>
        {({ visible, status }) => (
          <>
            {isHydrated && (
              <Suspense>
                <DisplacementSphere />
              </Suspense>
            )}
            <header className={styles.text}>
              <h2 className={styles.name} data-visible={visible} id={titleId}>
                <DecoderText text={config.name} delay={400} />
              </h2>

              <div className={styles.headingContainer}>
                <h1 className={styles.lineOne}>{config.role}</h1>
                <div className={styles.lineTwo}>
                  <span className={styles.plusSign}>+</span>
                  <span key={currentDiscipline} className={styles.animatedDiscipline}>
                    {currentDiscipline}
                  </span>
                </div>
              </div>

              <div className={styles.actions}>
                <Button iconHoverShift href="/#project-1" iconEnd="arrow-right">
                  Check Out My Works
                </Button>
              </div>
            </header>
          </>
        )}
      </Transition>
    </Section>
  );
}
