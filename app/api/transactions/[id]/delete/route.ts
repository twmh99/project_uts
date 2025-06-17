// app/api/transactions/[id]/delete/route.ts
import { db } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').at(-2); // Ambil ID dari path: /api/transactions/[id]/delete

  const parsedId = Number(id);

  if (!parsedId || isNaN(parsedId)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
  }

  try {
    await db.query('DELETE FROM transactions WHERE id = $1', [parsedId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gagal menghapus transaksi:', error);
    return NextResponse.json({ error: 'Gagal menghapus transaksi' }, { status: 500 });
  }
}
