// Public-facing copy, taken from the Eatside pitch deck. Internal material (unit economics,
// go-to-market, acquisition strategy, platform margins, brand guidelines) is deliberately left out.

export const nav = [
  { href: '#problem', label: 'Problem' },
  { href: '#platform', label: 'Platform' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#earnings', label: 'Earnings' },
  { href: '#story', label: 'Our story' },
];

export const hero = {
  title: ['Residency: Transforming Dark', 'Restaurants Into Viral Dining'],
  tagline: 'Not a restaurant. Not a pop-up. A residency.',
  sub: 'Airbnb for restaurant nights',
};

export const mission =
  'We turn underutilized commercial restaurants into revenue-generating dining residencies by matching them with local creator-chefs who bring their own audience — asset-light, viral by design, and profitable from night one.';

export const problems = [
  {
    title: 'Commercial Restaurants Are Bleeding',
    image: '/images/kitchen.jpg',
    body: 'CloudKitchens, Reef, and independent restaurants have 30–50% utilization rates. Rent is fixed. Equipment is depreciating. Staff is on salary. Every empty night is pure loss. There is no flexible, low-risk way to monetize dead hours.',
  },
  {
    title: 'Creator-Chefs Have No On-Ramp',
    image: '/images/chef-piping.jpg',
    body: 'Food influencers, culinary school grads, and home cooks with viral recipes have audiences but no infrastructure. Opening a restaurant costs $300K–$500K. Renting a commercial restaurant costs $3K–$8K/month with a 12-month lease. The barrier to entry is brutal.',
  },
  {
    title: 'Diners Are Bored',
    image: '/images/diner.jpg',
    body: 'Restaurant reservations are transactional. Food delivery is soulless. Pop-ups are rare and hard to discover. There is no scalable platform for curated, rotating, creator-led dining experiences in licensed, safe spaces.',
  },
];

export const opportunity = [
  {
    value: 900,
    prefix: '$',
    suffix: 'B',
    decimals: 0,
    title: 'U.S. Food Spending',
    body: 'Americans spend nearly a trillion dollars on food annually. A growing share wants authentic, local, and personal.',
  },
  {
    value: 2.4,
    prefix: '',
    suffix: 'M',
    decimals: 1,
    title: 'Food Creators in the U.S.',
    body: 'TikTok, Instagram, and YouTube food creators with 10K–500K followers. Many have expressed desire to "open a restaurant someday."',
  },
  {
    value: 26,
    prefix: '$',
    suffix: 'B',
    decimals: 0,
    title: 'Restaurant Market',
    body: 'Restaurants and dark restaurants are projected to be a $71B market by 2030. Most sit underutilized for 40–60% of operating hours.',
  },
];

export const flywheel = [
  'Dark Restaurant Lists Space',
  'Creator Proposes Menu',
  'Platform Matches & Onboards',
  'Creator Promotes to Audience',
  'Tickets Sell via Platform',
  'Residency Night Executes',
  'Content Goes Viral',
  'More Restaurants & Creators Join',
];

export const flywheelNote =
  'Every successful residency is free marketing for the next. Creator audiences become platform users. Platform users become new creators.';

export const platform = {
  headline:
    'A platform that matches underutilized commercial restaurants with creator-chefs for one-night residencies.',
  restaurants: {
    title: 'For Restaurants',
    body: "List your space, set availability, define equipment and capacity. Get matched with vetted creator-chefs. Earn revenue on nights you'd otherwise lose money. Zero upfront cost to join.",
    chips: ['Zero upfront cost', 'Vetted creator-chefs', 'Revenue on dead nights'],
  },
  creators: {
    title: 'For Creator-Chefs',
    body: 'Propose a concept and menu. Get matched with a licensed restaurant. Sell tickets to your audience + platform discovery. Cook one night, earn $500–$2,000, build your brand. No lease. No deposit. No risk.',
    chips: ['Earn $500–$2,000 a night', 'No lease', 'No deposit', 'No risk'],
  },
};

export const steps = [
  {
    n: '01',
    title: 'Restaurant Onboards',
    body: 'Upload space photos, equipment list, capacity, and available nights. Platform verifies health permits and insurance. Restaurant sets rental fee or revenue-share terms.',
  },
  {
    n: '02',
    title: 'Creator Proposes',
    body: 'Creator submits concept, sample menu, ticket price, and target audience size. Platform matches with compatible restaurants. Restaurant approves or counters terms.',
  },
  {
    n: '03',
    title: 'Residency Goes Live',
    body: 'Platform generates event page, handles ticketing, dietary restrictions, and payments. Creator promotes. Guests arrive. Platform provides real-time ops support.',
  },
];

export const night = {
  guests: 30,
  price: 85,
  gross: 2550,
  split: [
    { label: 'Creator Payout (50%)', value: 1275, color: 'var(--sage)' },
    { label: 'Restaurant Share', value: 600, color: 'var(--auburn)' },
  ],
  story: 'Creator walks away with $765 net after ingredient costs. Restaurant earns $600 on a dead night.',
};

export const competitors = {
  columns: ['CloudKitchens / Reef', 'EatWith / Cozymeal', 'Resy / OpenTable', 'Residency (Eatside)'],
  rows: [
    {
      label: 'Model',
      cells: ['Restaurant real estate', 'Home dining experiences', 'Restaurant reservations', 'Restaurant + creator matchmaking'],
    },
    {
      label: 'Safety',
      cells: ['Commercial-grade', 'Home kitchen (varies)', 'Restaurant-grade', 'Commercial-grade + insurance'],
    },
    {
      label: 'Creator Angle',
      cells: ['None', 'Amateur hosts', 'None', 'Professional creator-chefs'],
    },
    {
      label: 'Viral Potential',
      cells: ['Low', 'Medium', 'Low', 'High (creator audiences)'],
    },
  ],
};

export const quote = {
  kicker: '"Empty restaurants. Full tables."',
  text: '"Residency turns underutilized commercial restaurants into one-night restaurants by matching them with local creator-chefs who bring their own audience — no leases, no risk, pure margin."',
};

export const heritage = {
  lines: ['Every dish has a story. Meet the author.', 'Recipes that traveled. Made next door.', 'Not fusion. Family.'],
};

export const marquee = [
  'Not a restaurant. Not a pop-up. A residency.',
  'Empty restaurants. Full tables.',
  'Every dish has a story. Meet the author.',
  'Recipes that traveled. Made next door.',
  'Not fusion. Family.',
];
