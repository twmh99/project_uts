import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getFilteredByCategoryAndPrice } from '@/lib/query/getProducts'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '9999999')
    const categories = searchParams.getAll('categories') // bisa banyak

    const products = await getFilteredByCategoryAndPrice(categories, maxPrice)
    return NextResponse.json(products)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil produk.' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, image, price, stock, status, unggulan, kategori, description } = body

    if (!name || !image || !price || !stock || !status) {
      return NextResponse.json(
        { success: false, message: 'Nama, gambar, harga, stok, dan status wajib diisi.' },
        { status: 400 }
      )
    }

    const query = `
      INSERT INTO products (name, image, price, stock, status, unggulan, kategori, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `
    const values = [
      name,
      image,
      price,
      stock,
      status,
      unggulan || null,
      kategori || null,
      description || ''
    ]

    const result = await db.query(query, values)

    return NextResponse.json({ success: true, product: result.rows[0] })
  } catch (error) {
    console.error('Insert error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat menyimpan produk.' },
      { status: 500 }
    )
  }
}
