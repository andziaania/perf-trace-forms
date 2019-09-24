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
    icon: 'pie-chart-outline',
    link: '/pages/performance',
  },
];
