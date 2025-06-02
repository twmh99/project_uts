// File: /lib/query/getTransactions.ts

import { db } from '../db';

// Fungsi untuk mendapatkan recent transactions (10 terakhir)
export async function getRecentTransactions() {
  try {
    const result = await db.query(`
      SELECT id, customer, amount, transaction_date, status
      FROM transactions
      ORDER BY transaction_date DESC
      LIMIT 10
    `);
    return result.rows;
  } catch (error) {
    console.error('Database Error (getRecentTransactions):', error);
    throw new Error('Failed to fetch recent transactions.');
  }
}

// Fungsi untuk mendapatkan transaksi berdasarkan query (search) dan halaman
export async function getFilteredTransactions(query: string, currentPage: number) {
  const ITEMS_PER_PAGE = 6;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const result = await db.query(
      `
      SELECT id, customer, amount, transaction_date, status
      FROM transactions
      WHERE 
        customer ILIKE $1 OR
        id::text ILIKE $1 OR
        status ILIKE $1
      ORDER BY transaction_date DESC
      LIMIT $2 OFFSET $3
    `,
      [`%${query}%`, ITEMS_PER_PAGE, offset]
    );

    return result.rows;
  } catch (error) {
    console.error('Database Error (getFilteredTransactions):', error);
    throw new Error('Failed to fetch filtered transactions.');
  }
}

// Fungsi untuk menghitung total halaman transaksi berdasarkan query
export async function getTransactionsPages(query: string) {
  const ITEMS_PER_PAGE = 6;

  try {
    const result = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM transactions
      WHERE 
        customer ILIKE $1 OR
        id::text ILIKE $1 OR
        status ILIKE $1
    `,
      [`%${query}%`]
    );

    const totalCount = Number(result.rows[0].total);
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error('Database Error (getTransactionsPages):', error);
    throw new Error('Failed to fetch total number of transactions.');
  }
}
