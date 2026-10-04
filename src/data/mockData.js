// List of 20 Diverse Store Outlets across India
export const INITIAL_OUTLETS = [
  { id: 'out-1', name: 'Amber Cafe & Bistro (Jaipur Main)', city: 'Jaipur', tablesCount: 12, phone: '+91 141 2780001', manager: 'Karan Mathur', monthlySales: 1530000 },
  { id: 'out-2', name: 'Royal Heritage Lounge (Udaipur)', city: 'Udaipur', tablesCount: 16, phone: '+91 294 2780002', manager: 'Vikramaditya Singh', monthlySales: 1840000 },
  { id: 'out-3', name: 'Urban Coffee House (CP Delhi)', city: 'New Delhi', tablesCount: 14, phone: '+91 11 43500003', manager: 'Ananya Gupta', monthlySales: 2100000 },
  { id: 'out-4', name: 'Flavors of Malabar (Kochi Port)', city: 'Kochi', tablesCount: 10, phone: '+91 484 2780004', manager: 'Rahul Menon', monthlySales: 1250000 },
  { id: 'out-5', name: 'The Chai Tapri (Bandra Mumbai)', city: 'Mumbai', tablesCount: 8, phone: '+91 22 26400005', manager: 'Rohan Deshmukh', monthlySales: 1680000 },
  { id: 'out-6', name: 'Bistro 1898 (Park Street Kolkata)', city: 'Kolkata', tablesCount: 12, phone: '+91 33 22800006', manager: 'Subhash Sen', monthlySales: 1420000 },
  { id: 'out-7', name: 'Highway Express Diner (Gurgaon NH-8)', city: 'Gurgaon', tablesCount: 20, phone: '+91 124 4500007', manager: 'Amitabh Choudhury', monthlySales: 2450000 },
  { id: 'out-8', name: 'Goa Beach Shack Cafe (Calangute)', city: 'Goa', tablesCount: 15, phone: '+91 832 2780008', manager: 'Joao D’Souza', monthlySales: 1950000 },
  { id: 'out-9', name: 'Deccan Spice Hub (Jubilee Hills)', city: 'Hyderabad', tablesCount: 18, phone: '+91 40 23500009', manager: 'Srinivas Rao', monthlySales: 2200000 },
  { id: 'out-10', name: 'Highland Roasters (Shimla Mall)', city: 'Shimla', tablesCount: 8, phone: '+91 177 2780010', manager: 'Neeraj Verma', monthlySales: 980000 },
  { id: 'out-11', name: 'Bengaluru Brew Lab (Koramangala)', city: 'Bengaluru', tablesCount: 16, phone: '+91 80 41200011', manager: 'Aditya Hegde', monthlySales: 2600000 },
  { id: 'out-12', name: 'Awadh Royal Dining (Hazratganj)', city: 'Lucknow', tablesCount: 14, phone: '+91 522 2780012', manager: 'Tariq Khan', monthlySales: 1750000 },
  { id: 'out-13', name: 'Pine & Peak Cafe (Manali Old Town)', city: 'Manali', tablesCount: 10, phone: '+91 1902 278013', manager: 'Siddharth Thakur', monthlySales: 1120000 },
  { id: 'out-14', name: 'Varanasi Ghat Chai Bar (Dashashwamedh)', city: 'Varanasi', tablesCount: 8, phone: '+91 542 2780014', manager: 'Pandit Shivnath', monthlySales: 890000 },
  { id: 'out-15', name: 'Chowpatty Eats (Juhu Beach)', city: 'Mumbai', tablesCount: 12, phone: '+91 22 26100015', manager: 'Kunal Shah', monthlySales: 1580000 },
  { id: 'out-16', name: 'Pondicherry French Bistro (White Town)', city: 'Puducherry', tablesCount: 10, phone: '+91 413 2780016', manager: 'Claire Laurent', monthlySales: 1340000 },
  { id: 'out-17', name: 'Chandigarh Club House (Sector 17)', city: 'Chandigarh', tablesCount: 14, phone: '+91 172 2780017', manager: 'Gurpreet Singh', monthlySales: 1890000 },
  { id: 'out-18', name: 'Indore Sarafa Street Bistro', city: 'Indore', tablesCount: 12, phone: '+91 731 2780018', manager: 'Gaurav Agrawal', monthlySales: 1460000 },
  { id: 'out-19', name: 'Pune Artisan Bakery (Koregaon Park)', city: 'Pune', tablesCount: 14, phone: '+91 20 26150019', manager: 'Meera Kulkarni', monthlySales: 1620000 },
  { id: 'out-20', name: 'Ahmedabad Thali House (CG Road)', city: 'Ahmedabad', tablesCount: 18, phone: '+91 79 26400020', manager: 'Jignesh Patel', monthlySales: 2050000 }
];

// Helper to generate 20 to 25 items per store
const generateDishesForStore = (storeId, storeName) => {
  const baseTemplates = [
    { name: 'Kulhad Masala Chai', cat: 'Artisanal Chai & Coffee', price: 40, station: 'Chai & Beverage Bar', img: '/images/chai.jpg' },
    { name: 'Special Kesar Elaichi Tea', cat: 'Artisanal Chai & Coffee', price: 50, station: 'Chai & Beverage Bar', img: '/images/chai.jpg' },
    { name: 'Classic Espresso Cold Coffee', cat: 'Artisanal Chai & Coffee', price: 150, station: 'Chai & Beverage Bar', img: '/images/chai.jpg' },
    { name: 'Hazelnut Cappuccino', cat: 'Artisanal Chai & Coffee', price: 180, station: 'Chai & Beverage Bar', img: '/images/chai.jpg' },
    { name: 'South Indian Filter Coffee', cat: 'Artisanal Chai & Coffee', price: 60, station: 'Chai & Beverage Bar', img: '/images/chai.jpg' },
    
    { name: 'Crispy Royal Samosa Platter', cat: 'Royal Snacks & Starters', price: 80, station: 'Grill & Snack Station', img: '/images/samosa.jpg' },
    { name: 'Gourmet Tandoori Paneer Tikka', cat: 'Royal Snacks & Starters', price: 240, station: 'Grill & Snack Station', img: '/images/paneer.jpg' },
    { name: 'Signature Maska Bun', cat: 'Royal Snacks & Starters', price: 60, station: 'Chai & Beverage Bar', img: '/images/chai.jpg' },
    { name: 'Cheese Corn Nuggets', cat: 'Royal Snacks & Starters', price: 160, station: 'Grill & Snack Station', img: '/images/samosa.jpg' },
    { name: 'Crispy Hara Bhara Kebab', cat: 'Royal Snacks & Starters', price: 190, station: 'Grill & Snack Station', img: '/images/paneer.jpg' },
    { name: 'Aloo Tikki Chaat Deluxe', cat: 'Royal Snacks & Starters', price: 110, station: 'Grill & Snack Station', img: '/images/samosa.jpg' },
    { name: 'Chilli Paneer Dry', cat: 'Royal Snacks & Starters', price: 230, station: 'Grill & Snack Station', img: '/images/paneer.jpg' },

    { name: 'Special Chef Dum Biryani', cat: 'Mains & Curries', price: 320, station: 'Main Kitchen', img: '/images/paneer.jpg' },
    { name: 'Shahi Paneer Butter Masala', cat: 'Mains & Curries', price: 280, station: 'Main Kitchen', img: '/images/paneer.jpg' },
    { name: 'Dal Makhani Handi', cat: 'Mains & Curries', price: 240, station: 'Main Kitchen', img: '/images/paneer.jpg' },
    { name: 'Garlic Butter Naan (2 Pcs)', cat: 'Mains & Curries', price: 70, station: 'Main Kitchen', img: '/images/samosa.jpg' },
    { name: 'Chana Bhatura Special', cat: 'Mains & Curries', price: 180, station: 'Main Kitchen', img: '/images/samosa.jpg' },
    { name: 'Veg Hakka Noodles', cat: 'Mains & Curries', price: 190, station: 'Main Kitchen', img: '/images/paneer.jpg' },

    { name: 'Royal Gulab Jamun (2 Pcs)', cat: 'Desserts & Sweets', price: 90, station: 'Desserts & Pantry', img: '/images/samosa.jpg' },
    { name: 'Rasmalai Kesar Bowl', cat: 'Desserts & Sweets', price: 120, station: 'Desserts & Pantry', img: '/images/chai.jpg' },
    { name: 'Chocolate Brownie with Ice Cream', cat: 'Desserts & Sweets', price: 180, station: 'Desserts & Pantry', img: '/images/chai.jpg' },
    { name: 'Sizzling Brownie Hot Fudge', cat: 'Desserts & Sweets', price: 220, station: 'Desserts & Pantry', img: '/images/chai.jpg' }
  ];

  return baseTemplates.map((item, index) => ({
    id: `dish-${storeId}-${index + 1}`,
    storeId: storeId,
    name: `${item.name}`,
    category: item.cat,
    price: item.price,
    isVeg: true,
    bestseller: index % 3 === 0,
    chefSpecial: index % 4 === 0,
    image: item.img,
    description: `Authentic house-special ${item.name} prepared fresh at ${storeName}.`,
    station: item.station,
    stock: Math.floor(15 + Math.random() * 60),
    isFinished: false,
    extras: [
      { id: `ext-${storeId}-${index}-1`, name: 'Extra Dip / Sauce', price: 15 },
      { id: `ext-${storeId}-${index}-2`, name: 'Extra Cheese / Drizzle', price: 25 }
    ]
  }));
};

// Generate full menu dataset mapping storeId -> 22 items
export const STORE_MENUS_MAP = INITIAL_OUTLETS.reduce((acc, store) => {
  acc[store.name] = generateDishesForStore(store.id, store.name);
  return acc;
}, {});

// Default initial dishes for Amber Cafe
export const INITIAL_DISHES = STORE_MENUS_MAP[INITIAL_OUTLETS[0].name];

// Table Layout setup
export const INITIAL_TABLES = [
  { id: 'T-01', name: 'Table 01', capacity: 2, status: 'empty', assignedStaff: 'Vikas Singh', activeOrderId: null },
  { id: 'T-02', name: 'Table 02', capacity: 4, status: 'paid', assignedStaff: 'Rohan Sharma', activeOrderId: 'ORD-1079' },
  { id: 'T-03', name: 'Table 03', capacity: 4, status: 'cooking', assignedStaff: 'Vikas Singh', activeOrderId: 'ORD-1080' },
  { id: 'T-04', name: 'Table 04 (Active QR Guest)', capacity: 2, status: 'ordering', assignedStaff: 'Rohan Sharma', activeOrderId: 'ORD-1081' },
  { id: 'T-05', name: 'Table 05', capacity: 6, status: 'served', assignedStaff: 'Priya Verma', activeOrderId: 'ORD-1082' },
  { id: 'T-06', name: 'Table 06', capacity: 2, status: 'empty', assignedStaff: 'Vikas Singh', activeOrderId: null },
  { id: 'T-07', name: 'Table 07', capacity: 4, status: 'cooking', assignedStaff: 'Rohan Sharma', activeOrderId: 'ORD-1083' },
  { id: 'T-08', name: 'Table 08', capacity: 4, status: 'empty', assignedStaff: 'Priya Verma', activeOrderId: null },
  { id: 'T-09', name: 'Table 09', capacity: 6, status: 'empty', assignedStaff: 'Vikas Singh', activeOrderId: null },
  { id: 'T-10', name: 'Table 10', capacity: 2, status: 'empty', assignedStaff: 'Rohan Sharma', activeOrderId: null },
  { id: 'T-11', name: 'Table 11', capacity: 4, status: 'empty', assignedStaff: 'Priya Verma', activeOrderId: null },
  { id: 'T-12', name: 'Table 12', capacity: 8, status: 'empty', assignedStaff: 'Vikas Singh', activeOrderId: null }
];

// Orders
export const INITIAL_ORDERS = [
  {
    id: 'ORD-1081',
    tableId: 'T-04',
    tableName: 'Table 04',
    outlet: 'Amber Cafe & Bistro (Jaipur Main)',
    orderType: 'Dine-In (QR Code)',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98290 11223',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    status: 'Preparing',
    stationStatus: {
      'Chai & Beverage Bar': 'Preparing',
      'Grill & Snack Station': 'Preparing'
    },
    items: [
      {
        dishId: 'dish-1-1',
        dishName: 'Kulhad Masala Chai',
        price: 40,
        quantity: 2,
        selectedExtras: [{ name: 'Extra Dip / Sauce', price: 15 }],
        notes: 'Make it extra hot please'
      },
      {
        dishId: 'dish-1-6',
        dishName: 'Crispy Royal Samosa Platter',
        price: 80,
        quantity: 1,
        selectedExtras: [{ name: 'Extra Cheese / Drizzle', price: 25 }],
        notes: ''
      }
    ],
    subtotal: 200,
    taxGst: 10,
    netTotal: 210,
    discountAmount: 0,
    discountReason: '',
    refundAmount: 0,
    refundReason: '',
    paymentStatus: 'Pending',
    paymentMethod: 'UPI',
    rating: 0,
    scratchReward: '🎉 15% OFF On Your Next Visit! (Code: GS15)'
  },
  {
    id: 'ORD-1082',
    tableId: 'T-05',
    tableName: 'Table 05',
    outlet: 'Amber Cafe & Bistro (Jaipur Main)',
    orderType: 'Dine-In (QR Code)',
    customerName: 'Priya Patel',
    customerPhone: '+91 98290 44556',
    timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
    status: 'Served',
    stationStatus: {
      'Grill & Snack Station': 'Served'
    },
    items: [
      {
        dishId: 'dish-1-7',
        dishName: 'Gourmet Tandoori Paneer Tikka',
        price: 240,
        quantity: 1,
        selectedExtras: [{ name: 'Extra Cheese / Drizzle', price: 25 }],
        notes: 'Less spicy'
      },
      {
        dishId: 'dish-1-3',
        dishName: 'Classic Espresso Cold Coffee',
        price: 150,
        quantity: 2,
        selectedExtras: [],
        notes: ''
      }
    ],
    subtotal: 565,
    taxGst: 28.25,
    netTotal: 593.25,
    discountAmount: 0,
    discountReason: '',
    refundAmount: 0,
    refundReason: '',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI GPay',
    rating: 5,
    reviewText: 'Amazing ambiance & lightning fast QR order experience!',
    scratchReward: '☕ FREE Kulhad Chai On Next Order'
  }
];

// CRM Customers
export const INITIAL_CUSTOMERS = [
  { id: 'CUST-801', name: 'Aarav Sharma', phone: '+91 98290 11223', email: 'aarav.sharma@example.com', tier: 'VIP Gold', totalVisits: 14, totalSpent: 4820, loyaltyPoints: 340, favoriteDish: 'Kulhad Masala Chai', lastVisit: '2026-10-01', birthday: '14 Oct', notes: 'Prefers quiet window seating at Table 04.' },
  { id: 'CUST-802', name: 'Priya Patel', phone: '+91 98290 44556', email: 'priya.p@example.com', tier: 'Platinum Club', totalVisits: 28, totalSpent: 12400, loyaltyPoints: 980, favoriteDish: 'Gourmet Tandoori Paneer Tikka', lastVisit: '2026-10-02', birthday: '22 Nov', notes: 'Allergic to peanuts. Always requests extra mint chutney.' },
  { id: 'CUST-803', name: 'Vikramaditya Singh', phone: '+91 98290 77889', email: 'vikram.singh@example.com', tier: 'Silver Member', totalVisits: 6, totalSpent: 1850, loyaltyPoints: 120, favoriteDish: 'Crispy Royal Samosa Platter', lastVisit: '2026-09-28', birthday: '05 Mar', notes: 'Regular weekend afternoon tea customer.' },
  { id: 'CUST-804', name: 'Ananya Gupta', phone: '+91 98290 99001', email: 'ananya.g@example.com', tier: 'VIP Gold', totalVisits: 19, totalSpent: 7300, loyaltyPoints: 510, favoriteDish: 'Classic Espresso Cold Coffee', lastVisit: '2026-10-02', birthday: '18 Dec', notes: 'Leaves 5-star Google reviews consistently!' }
];

// Reservations
export const INITIAL_RESERVATIONS = [
  { id: 'RES-301', customerName: 'Aarav Sharma', phone: '+91 98290 11223', tableId: 'T-04', tableName: 'Table 04', partySize: 2, date: 'Today', time: '20:30', status: 'Confirmed', notes: 'Anniversary celebration. Place flower vase.' },
  { id: 'RES-302', customerName: 'Meera Deshmukh', phone: '+91 98765 43210', tableId: 'T-05', tableName: 'Table 05', partySize: 6, date: 'Today', time: '21:00', status: 'Seated', notes: 'Family dinner.' }
];

// Inventory
export const INITIAL_INVENTORY = [
  { id: 'ing-1', name: 'Fresh Whole Milk', category: 'Dairy', currentStock: 14.5, unit: 'Liters', minThreshold: 5.0, supplier: 'Amul Dairy Distributors' },
  { id: 'ing-2', name: 'Special Assam Tea Leaves', category: 'Dry Ingredients', currentStock: 3.8, unit: 'kg', minThreshold: 1.0, supplier: 'Jaipur Spices & Tea Merchants' },
  { id: 'ing-3', name: 'Fresh Paneer (Cottage Cheese)', category: 'Dairy', currentStock: 6.2, unit: 'kg', minThreshold: 2.0, supplier: 'Fresh Farms Vegetables' },
  { id: 'ing-4', name: 'Amul Table Butter', category: 'Dairy', currentStock: 4.0, unit: 'kg', minThreshold: 1.5, supplier: 'Amul Dairy Distributors' }
];

// Audit Logs
export const INITIAL_AUDIT_LOGS = [
  { id: 'log-1', timestamp: new Date(Date.now() - 45 * 60000).toLocaleString(), type: 'Discount', orderId: 'ORD-1077', table: 'Table 02', amount: '₹50.00 (10%)', authorizer: 'Manager (Karan Mathur)', reason: 'Happy Hour Promotional Offer' },
  { id: 'log-2', timestamp: new Date(Date.now() - 120 * 60000).toLocaleString(), type: 'Refund', orderId: 'ORD-1072', table: 'Takeaway #04', amount: '₹80.00', authorizer: 'Cashier (Rohan S.)', reason: 'Guest cancelled order due to urgent departure' }
];

export const SCRATCH_REWARDS = [
  '🎉 15% OFF On Your Next Order! (Code: GS15)',
  '☕ 1 FREE Artisanal Kulhad Chai On Next Visit!',
  '🍰 1 FREE Royal Gulab Jamun Dessert!',
  '🌟 ₹100 Cashback Voucher (Code: LUCKY100)'
];
