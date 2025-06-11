// app/admin/products/[id]/edit/page.tsx

import EditPage from "@/components/editproduct";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound(); // akan tampilkan 404 page
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <EditPage id={id} />
    </div>
  );
}
