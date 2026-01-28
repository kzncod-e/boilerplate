import PageHeader from "@/components/global/page-header";

export default function MicroSNA() {
  return (
    <>
      <PageHeader
        title="SNA (Social Network Analysis)"
        description="Visual network of key actors and connections."
      />

      <iframe
        src="/sna.html"
        className="w-full h-[90vh] border-none"
        loading="lazy"
      />
    </>
  );
}
