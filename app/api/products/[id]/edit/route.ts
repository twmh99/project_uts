// app/api/products/[id]/edit/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    const { id, name, image, price, stock, status, unggulan, kategori } = body

    if (
      !id ||
      !name ||
      !image ||
      typeof price !== 'number' ||
      typeof stock !== 'number' ||
      !status
    ) {
      return NextResponse.json(
        { error: 'Data tidak lengkap atau format salah.' },
        { status: 400 }
      )
    }

    await db.query(
      `
      UPDATE products 
      SET 
        name = $1, 
        image = $2, 
        price = $3, 
        stock = $4, 
        status = $5, 
        unggulan = $6, 
        kategori = $7
      WHERE id = $8
    `,
      [name, image, price, stock, status, unggulan, kategori, id]
    )

    return NextResponse.json({ message: 'Produk berhasil diperbarui.' })
  } catch (error) {
    console.error('Gagal update produk:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memperbarui produk.' },
      { status: 500 }
    )
  }
}
