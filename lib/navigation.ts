export interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export const navigationItems: NavItem[] = [
  {
    label: 'Solutions',
    href: '#',
    children: [
      {
        label: 'Data & Analytics',
        href: '/solutions/data',
        description: 'BI, ML, data pipelines, visualization & insights',
      },
      {
        label: 'Development',
        href: '/solutions/development',
        description: 'Web, mobile, desktop & full-stack solutions',
      },
      {
        label: 'Design & UX',
        href: '/solutions/design',
        description: 'UI/UX, branding & digital experience design',
      },
    ],
  },
  {
    label: 'Services',
    href: '#',
    children: [
      {
        label: 'Tech Strategy',
        href: '/services/strategy',
        description: 'From concept to scalable architecture',
      },
      {
        label: 'Custom Solutions',
        href: '/services/custom',
        description: 'Tailored tech for your unique challenges',
      },
      {
        label: 'Digital Growth',
        href: '/services/growth',
        description: 'Modernize & scale your local business',
      },
    ],
  },
  //   {
  //     label: 'Success Stories',
  //     href: '/stories',
  //   },
  {
    label: 'Connect',
    href: '/connect',
  },
];
