import { ParticleBackground } from '@/app/ui/futuristic/particles';
import ProductForm from '../product-form';

export default function NewProductPage() {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto p-8 shadow-lg">
          <ProductForm />
        </div>
      </main>
    </div>
  );
}