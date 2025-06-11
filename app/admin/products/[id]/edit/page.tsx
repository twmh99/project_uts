import EditPage from "@/components/editproduct";

type PageProps = {
  params: {
    id: string;
  };
};

export default function pageEdit({ params }: PageProps) {
  const id = parseInt(params.id);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <EditPage id={id} />
    </div>
  );
}
