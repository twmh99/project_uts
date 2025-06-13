// lib/query/getProducts.ts
import { db } from '../db'

const ITEMS_PER_PAGE = 6

export async function getProducts() {
  const { rows } = await db.query('SELECT * FROM products')
  return rows
}

export async function getFilteredProducts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const { rows } = await db.query(
      `
        SELECT *
        FROM products
        WHERE name ILIKE $1 OR kategori ILIKE $1
        LIMIT $2 OFFSET $3
      `,
      [`%${query}%`, ITEMS_PER_PAGE, offset]
    )

    return rows
  } catch (error) {
    console.error('Database Error (getFilteredProducts):', error)
    throw new Error('Failed to fetch filtered products.')
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
    )

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error (getProductsPages):', error)
    throw new Error('Failed to fetch total number of products.')
  }
}

// FUNGSI BARU UNTUK FILTER BERDASARKAN KATEGORI & HARGA
export async function getFilteredByCategoryAndPrice(categories: string[], maxPrice: number) {
  try {
    let baseQuery = 'SELECT * FROM products WHERE price <= $1'
    const values: any[] = [maxPrice]

    if (categories.length > 0) {
      const placeholders = categories.map((_, i) => `$${i + 2}`).join(', ')
      baseQuery += ` AND kategori IN (${placeholders})`
      values.push(...categories)
    }

    const { rows } = await db.query(baseQuery, values)
    return rows
  } catch (error) {
    console.error('Database Error (getFilteredByCategoryAndPrice):', error)
    throw new Error('Failed to fetch products by category and price.')
  }
}
