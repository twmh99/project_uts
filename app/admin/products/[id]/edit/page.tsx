import EditPage from "@/components/editproduct";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function PageEdit({ params }: PageProps) {
  const id = parseInt(params.id);

  return <EditPage id={id} />;
}
