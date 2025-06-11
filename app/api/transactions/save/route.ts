import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, amount, date, status } = body;

    // Validasi field wajib
    if (!customer || !items || !amount || !date || !status) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    // Validasi tipe data
    if (
      typeof customer !== 'string' ||
      !Array.isArray(items) ||
      typeof amount !== 'number' ||
      typeof date !== 'string' ||
      typeof status !== 'string'
    ) {
      return NextResponse.json({ success: false, error: 'Invalid field types' }, { status: 400 });
    }

    // Format tanggal ke ISO
    const isoDate = new Date(date).toISOString();

    // Simpan ke DB
    const result = await db.query(
      `INSERT INTO transactions (customer, items, amount, transaction_date, status) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [customer, JSON.stringify(items), amount, isoDate, status]
    );

    const insertedId = result.rows[0].id;
    return NextResponse.json({ success: true, id: insertedId });
  } catch (error: any) {
    console.error('Gagal menyimpan transaksi:', error.message ?? error);
    return NextResponse.json({ success: false, error: 'Failed to save transaction' }, { status: 500 });
  }
}
