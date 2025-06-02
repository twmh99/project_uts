import { db } from '@/lib/db';

export async function getUsers() {
  const result = await db.query(`
    SELECT id, name, email, image_url
    FROM customers
    LIMIT 10
  `);
  return result.rows;
}
