import EditPage from "@/components/editproduct";

export default function pageEdit({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <EditPage id={id} />
    </div>
  );
}
