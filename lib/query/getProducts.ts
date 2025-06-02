// lib/query/getProducts.ts
import { db } from '../db';

const ITEMS_PER_PAGE = 6;

export async function getProducts() {
  const { rows } = await db.query('SELECT * FROM products');
  return rows;
}

export async function getFilteredProducts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { rows } = await db.query(
      `
        SELECT *
        FROM products
        WHERE name ILIKE $1 OR kategori ILIKE $1
        LIMIT $2 OFFSET $3
      `,
      [`%${query}%`, ITEMS_PER_PAGE, offset]
    );

    return rows;
  } catch (error) {
    console.error('Database Error (getFilteredProducts):', error);
    throw new Error('Failed to fetch filtered products.');
  }
}

export async function getProductsPages(query: string) {
  try {
    const count = await db.query(
      `
        SELECT COUNT(*)
        FROM products
        WHERE name ILIKE $1 OR kategori ILIKE $1
      `,
      [`%${query}%`]
    );

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error (getProductsPages):', error);
    throw new Error('Failed to fetch total number of products.');
  }
}
