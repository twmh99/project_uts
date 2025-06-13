// app/admin/products/[id]/edit/page.tsx

import EditPage from "@/components/editproduct";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string
  }>;
};

export default async function Page({ params }: PageProps) {
  const id = await params.then((p) => parseInt(p.id, 10));

  if (isNaN(id)) {
    notFound();
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <EditPage id={id} />
    </div>
  );
}
