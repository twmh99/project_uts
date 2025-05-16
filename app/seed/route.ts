import { hash } from 'bcryptjs';
import postgres from 'postgres';
import {
  invoices,
  customers,
  revenue,
  users,
  products,
} from '@/app/lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
});

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  for (const user of users) {
    const hashedPassword = await hash(user.password, 10);
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (email) DO NOTHING;
    `;
  }
}

async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  for (const customer of customers) {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${customer.name}, ${customer.email}, ${customer.image_url})
      ON CONFLICT (email) DO NOTHING;
    `;
  }
}

async function seedInvoices() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );
  `;

  const dbCustomers = await sql`SELECT id, email FROM customers`;

  for (const invoice of invoices) {
    const customer = dbCustomers.find((c: any) => c.email === invoice.customer_email);
    if (!customer) continue;

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customer.id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  for (const rev of revenue) {
    await sql`
      INSERT INTO revenue (month, revenue)
      VALUES (${rev.month}, ${rev.revenue})
      ON CONFLICT (month) DO NOTHING;
    `;
  }
}

async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      image TEXT NOT NULL,
      price INTEGER NOT NULL,
      stock INTEGER NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `;

  for (const product of products) {
    await sql`
      INSERT INTO products (name, image, price, stock, status)
      VALUES (${product.name}, ${product.image}, ${product.price}, ${product.stock}, ${product.status})
      ON CONFLICT DO NOTHING;
    `;
  }
}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await seedUsers();
      await seedCustomers();
      await seedInvoices();
      await seedRevenue();
      await seedProducts(); // ← include this to seed products
    });

    return new Response(
      JSON.stringify({ message: 'Database seeded successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Seed error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
