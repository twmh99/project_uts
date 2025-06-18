import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 });
    }

    const userCheck = await db.query(
      'SELECT id, name, email, username, role FROM customers WHERE username = $1 AND password = $2',
      [username, password]
    );

    const user = userCheck.rows[0];

    if (!user) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    (await cookies()).set('token', user.username, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return NextResponse.json({ message: 'Login berhasil', user });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return NextResponse.json({ error: 'Gagal memproses login' }, { status: 500 });
  }
}
