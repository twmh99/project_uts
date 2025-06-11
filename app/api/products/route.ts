import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, image, price, stock, status, unggulan, kategori } = body;

    const query = `
      INSERT INTO products (name, image, price, stock, status, unggulan, kategori)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      name,
      image,
      price,
      stock,
      status,
      unggulan || null,
      kategori || null,
    ];

    const result = await db.query(query, values);

    return NextResponse.json({ success: true, product: result.rows[0] });
  } catch (error) {
    console.error('Insert error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat menyimpan produk.' },
      { status: 500 }
    );
  }
}
