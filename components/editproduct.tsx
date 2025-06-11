import EditProductForm from '@/app/admin/products/[id]/edit/form';
import { db } from '@/lib/db';

export default async function EditPage({ id }: { id: number }) {

  const res = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  const product = res.rows[0];

  if (!product) {
    return <div className="p-8">Produk tidak ditemukan.</div>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
      <EditProductForm product={product} />
    </div>
  );
}
