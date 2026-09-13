import profileImgLarge from '~/assets/profile-large.jpg';
import profileImgPlaceholder from '~/assets/profile-placeholder.jpg';
import profileImg from '~/assets/profile.jpg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import katakana from './katakana.svg';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="About Me" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Hi, I’m <strong>Prasoon Kumar</strong>, a Computer Science student pursuing my
      B.Tech in Artificial Intelligence & Data Science at Global Institute of Technology,
      maintaining a consistent <strong>9.2 GPA</strong>. My core passion lies in crafting
      delightful frontend experiences, interactive Three.js visuals, and building AI agent
      architectures that bridge user interfaces with intelligent systems.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Outside of coding, I’m a competitive Kabaddi player who competed at the district level
      for Saran, Bihar, and led collegiate squads to the RTU trials. I actively solve data
      structure problems on{' '}
      <Link href="https://leetcode.com/u/prasoon_mishra_21/" target="_blank">
        LeetCode
      </Link>
      , write technical writeups on{' '}
      <Link href="https://hashnode.com/@pkcmishra" target="_blank">
        Hashnode
      </Link>
      , and collaborate with our coding clubs <em>Code-Up</em> and <em>Hack-the-Mint</em>.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <div className={styles.buttonRow}>
                <Button
                  className={styles.button}
                  data-visible={visible}
                  href="/contact"
                  icon="send"
                >
                  Contact Me
                </Button>
                <Button
                  secondary
                  className={styles.button}
                  data-visible={visible}
                  href="/resume.pdf"
                  download="Prasoon_Kumar_Resume.pdf"
                  icon="arrow-right"
                >
                  Download CV
                </Button>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                  width={960}
                  height={1280}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Prasoon Kumar"
                />
                <svg className={styles.svg} data-visible={visible} viewBox="0 0 136 766">
                  <use href={`${katakana}#katakana-profile`} />
                </svg>
                <div className={styles.imageOverlayAction}>
                  <Button
                    href="/about"
                    iconEnd="arrow-right"
                    className={styles.overlayButton}
                  >
                    Read In-Depth Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
