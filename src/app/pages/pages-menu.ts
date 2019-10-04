import { NbMenuItem } from '@nebular/theme';

export const APP_MENU: NbMenuItem[] = [
  {
    title: 'ABOUT',
    link: '/pages/about',
    icon: 'home-outline'
  },
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/pages/users',
    home: true,
  },
  {
    title: 'Site Performance',
    icon: 'activity-outline',
    link: '/pages/performance',
  },
  {
    title: 'Pages Statistics',
    icon: 'archive-outline',
    link: '/pages/urls',
  },
];
