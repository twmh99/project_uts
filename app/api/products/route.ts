import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '9999999')
    const categories = searchParams.getAll('categories')

    const limit = 9
    const offset = (page - 1) * limit
    const where: string[] = []
    const values: any[] = []

    if (q) {
      values.push(`%${q.toLowerCase()}%`)
      where.push(`LOWER(name) LIKE $${values.length}`)
    }

    if (categories.length) {
      const placeholders = categories.map((_, i) => {
        values.push(categories[i])
        return `$${values.length}`
      })
      where.push(`kategori IN (${placeholders.join(',')})`)
    }

    if (maxPrice < 9999999) {
      values.push(maxPrice)
      where.push(`price <= $${values.length}`)
    }

    const whereSQL = where.length ? `WHERE ${where.join(' AND ')}` : ''

    const totalRes = await db.query(`SELECT COUNT(*)::int AS total FROM products ${whereSQL}`, values)
    const total = totalRes.rows[0].total
    const totalPages = Math.ceil(total / limit)

    const prodRes = await db.query(
      `SELECT * FROM products ${whereSQL} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`,
      values
    )

    return NextResponse.json({ success: true, products: prodRes.rows, total, totalPages })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, message: 'Gagal memuat produk.' }, { status: 500 })
  }
}

// POST /api/products
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, image, price, stock, status, unggulan, kategori, description } = body

    if (!name || !image || !price || !stock || !status) {
      return NextResponse.json({ success: false, message: 'Mohon lengkapi data yang wajib diisi.' }, { status: 400 })
    }

    const result = await db.query(
      `INSERT INTO products (name, image, price, stock, status, unggulan, kategori, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, image, price, stock, status, unggulan, kategori, description]
    )

    return NextResponse.json({ success: true, product: result.rows[0] })
  } catch (err: any) {
    console.error('POST /api/products error:', err)
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan saat menyimpan produk.' }, { status: 500 })
  }
}
