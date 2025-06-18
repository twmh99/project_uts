import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, username, password } = await req.json();

    if (!name || !email || !username || !password) {
      return NextResponse.json({ error: 'Semua field wajib diisi.' }, { status: 400 });
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email harus menggunakan domain @gmail.com' },
        { status: 400 }
      );
    }

    const check = await db.query(
      'SELECT id FROM customers WHERE email = $1 OR username = $2',
      [email.trim().toLowerCase(), username.trim()]
    );
    if (check.rows.length > 0) {
      return NextResponse.json({ error: 'Email atau username sudah terdaftar.' }, { status: 409 });
    }

    const result = await db.query(
      `INSERT INTO customers (name, email, username, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, username`,
      [name.trim(), email.trim().toLowerCase(), username.trim(), password]
    );

    return NextResponse.json({ message: 'Registrasi berhasil.', user: result.rows[0] });
  } catch (error) {
    console.error('REGISTER ERROR', error);
    return NextResponse.json({ error: 'Gagal melakukan registrasi.' }, { status: 500 });
  }
}
