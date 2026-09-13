import config from '~/config.json';

export const navLinks = [
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Skills',
    pathname: '/#skills',
  },
  {
    label: 'About',
    pathname: '/#details',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: `https://www.linkedin.com/in/${config.linkedin}/`,
    icon: 'linkedin',
  },
  {
    label: 'LeetCode',
    url: `https://leetcode.com/u/${config.leetcode}/`,
    icon: 'leetcode',
  },
  {
    label: 'Hashnode',
    url: `https://hashnode.com/@${config.hashnode}`,
    icon: 'hashnode',
  },
];
