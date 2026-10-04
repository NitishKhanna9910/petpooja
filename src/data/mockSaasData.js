// SaaS Workspaces dataset
export const INITIAL_WORKSPACES = [
  {
    id: 'ws-101',
    name: 'Royal Hospitality Group',
    slug: 'royal-hospitality',
    plan: 'Enterprise Estateline',
    planBadge: '⚡ Enterprise Plan',
    outletsLimit: 5,
    ordersUsed: 1420,
    ordersLimit: 10000,
    membersCount: 8,
    owner: 'Karan Mathur (Sales Director)',
    logo: '👑',
    branches: [
      { id: 'br-1', name: 'Amber Cafe & Bistro (Jaipur Main)', city: 'Jaipur', tables: 12, posTerminals: 3, monthlySales: 1530000 },
      { id: 'br-2', name: 'Highway Express Cafe (Outlet #2)', city: 'Jaipur Highway', tables: 8, posTerminals: 2, monthlySales: 840000 }
    ]
  },
  {
    id: 'ws-102',
    name: 'Jaipur Highway Food Courts Corp',
    slug: 'jaipur-foodcourts',
    plan: 'Floorline Pro',
    planBadge: '🚀 Pro Plan',
    outletsLimit: 2,
    ordersUsed: 650,
    ordersLimit: 3000,
    membersCount: 4,
    owner: 'Rajesh Sharma',
    logo: '🍔',
    branches: [
      { id: 'br-3', name: 'Highway Plaza Outlet', city: 'NH-8 Jaipur', tables: 10, posTerminals: 2, monthlySales: 620000 }
    ]
  },
  {
    id: 'ws-103',
    name: 'Urban Brews & Artisan Cafes Ltd',
    slug: 'urban-brews',
    plan: 'Tableline Starter',
    planBadge: '🌱 Starter Plan',
    outletsLimit: 1,
    ordersUsed: 210,
    ordersLimit: 1000,
    membersCount: 2,
    owner: 'Ananya Gupta',
    logo: '☕',
    branches: [
      { id: 'br-4', name: 'Urban Coffee Bar', city: 'C-Scheme Jaipur', tables: 6, posTerminals: 1, monthlySales: 310000 }
    ]
  }
];

// SaaS Team Members Directory
export const INITIAL_TEAM_MEMBERS = [
  {
    id: 'mem-1',
    name: 'Karan Mathur',
    email: 'karan@gssoftwares.com',
    role: 'Workspace Admin (Owner)',
    branchAccess: 'All Branches',
    status: 'Active',
    avatar: 'KM'
  },
  {
    id: 'mem-2',
    name: 'Rohan Sharma',
    email: 'rohan.s@ambercafe.com',
    role: 'Floor Manager',
    branchAccess: 'Jaipur Main',
    status: 'Active',
    avatar: 'RS'
  },
  {
    id: 'mem-3',
    name: 'Priya Verma',
    email: 'priya.v@ambercafe.com',
    role: 'Head Cashier',
    branchAccess: 'Jaipur Main',
    status: 'Active',
    avatar: 'PV'
  },
  {
    id: 'mem-4',
    name: 'Suresh Kumar',
    email: 'suresh.k@ambercafe.com',
    role: 'Kitchen Head Chef',
    branchAccess: 'Jaipur Main',
    status: 'Active',
    avatar: 'SK'
  },
  {
    id: 'mem-5',
    name: 'Vikas Singh',
    email: 'vikas.s@ambercafe.com',
    role: 'Waiter Staff',
    branchAccess: 'Highway Express',
    status: 'Invited',
    avatar: 'VS'
  }
];

// Subscription Plans List
export const SAAS_PLANS = [
  {
    id: 'plan-starter',
    name: 'Tableline Starter',
    price: 1499,
    period: 'per month / outlet',
    description: 'Perfect for small single-outlet cafes starting with QR phone ordering.',
    features: [
      '1 Cafe Outlet & 10 Tables',
      'QR Menu Browser & Mobile Order',
      'UPI Payment QR Generator',
      'Basic Sales Reports'
    ]
  },
  {
    id: 'plan-pro',
    name: 'Floorline Pro',
    price: 2999,
    period: 'per month / outlet',
    bestseller: true,
    description: 'Complete cafe floor automation with Cashier POS, KDS & Waiter floorplan.',
    features: [
      'Up to 3 Cafe Outlets',
      'Counter POS & Billing Desk',
      'Kitchen Ticket KDS (Station Split)',
      'Discount & Refund Audit Logs',
      'Google Review Scratch Card Engine',
      'WhatsApp Bill Sharing'
    ]
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Estateline',
    price: 4999,
    period: 'per month',
    description: 'Multi-outlet franchise suite with recipe stock inventory & supplier billing.',
    features: [
      'Unlimited Outlets & POS Terminals',
      'Estateline Recipe Stock Tracker',
      'Vendor & Supplier Bill Manager',
      'Multi-Tenant Workspace Roles & RBAC',
      'Custom QR Branding & Domain',
      'Dedicated Account Manager'
    ]
  }
];
