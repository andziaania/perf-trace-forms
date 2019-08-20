import { NbMenuItem } from '@nebular/theme';

export const APP_MENU: NbMenuItem[] = [
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/pages/users-stats',
    home: true,
    expanded: true,
    children: [
      {
        title: 'Statistics',
        link: '/users-stats',
      },
      {
        title: 'Currently',
        link: ''
      },
      {
        title: 'Users info (browser, geo)',
        link: ''
      },
      {
        title: 'Engagement',
        link: ''
      }
    ],
  },
  {
    title: 'Pages',
    icon: 'browser-outline',
    link: '/pages/pages-stats',
    expanded: true,
    children: [
      {
        title: 'Statistics',
        link: '/pages-stats',
      },
      {
        title: 'Enter pages',
        link: ''
      },
      {
        title: 'Exit pages',
        link: ''
      }
    ],
  },
  {
    title: 'Site Performance',
    icon: 'pie-chart-outline',
    link: ''
  },
  {
    title: 'FEATURES',
    group: true,
  },
];
