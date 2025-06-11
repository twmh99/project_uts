// app/admin/products/[id]/edit/page.tsx
import EditPage from "@/components/editproduct";

export default async function pageEdit({ params }: any) {
  const id = parseInt(params.id);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <EditPage id={id} />
    </div>
  );
}
