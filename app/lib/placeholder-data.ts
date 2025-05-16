export const users = [
  { id: 'uuid-1', name: 'Willy', email: 'willy@example.com', password: '123456' },
  { id: 'uuid-2', name: 'Yoel', email: 'yoel@example.com', password: '654321' },
];

export const customers = [
  { id: 'uuid-cust-1', name: 'Customer A', email: 'a@example.com', image_url: '/img/a.png' },
];

export const invoices = [
  {
    customer_email: 'a@example.com',
    amount: 500,
    status: 'paid',
    date: '2024-01-01',
  },
];

export const revenue = [
  { month: 'JAN', revenue: 1000 },
  { month: 'FEB', revenue: 2000 },
];
