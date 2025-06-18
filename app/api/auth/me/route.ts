// FILE: app/api/auth/me/route.ts
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Tidak ada sesi aktif.' }, { status: 401 });

    const res = await db.query(
      'SELECT id, name, email, username FROM customers WHERE username = $1',
      [token]
    );
    const user = res.rows[0];

    if (!user) return NextResponse.json({ error: 'User tidak ditemukan.' }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal mengambil data user.' }, { status: 500 });
  }
}
