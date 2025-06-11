// app/admin/products/[id]/edit/page.tsx
import EditPage from "@/components/editproduct";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <EditPage id={id} />
    </div>
  );
}
