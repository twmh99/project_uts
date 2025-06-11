import EditPage from "@/components/editproduct";

// Tipe parameter halaman
type PageProps = {
  params: {
    id: string;
  };
};

// Komponen halaman edit
export default function PageEdit({ params }: PageProps) {
  // Convert id dari string ke number jika dibutuhkan
  const id = parseInt(params.id);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <EditPage id={id} />
    </div>
  );
}
