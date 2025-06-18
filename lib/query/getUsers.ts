// lib/query/getUsers.ts
import { db } from '@/lib/db';

export type Customer = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
};

export async function getUsers(): Promise<Customer[]> {
  try {
    const result = await db.query(`
      SELECT id, name, email, username, role
      FROM customers
      WHERE role != 'admin'
      ORDER BY name ASC
    `);

    return result.rows;
  } catch (err) {
    console.error('❌ Gagal mengambil data user:', err);
    return [];
  }
}
