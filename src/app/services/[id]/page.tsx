import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/service-detail";
import { serviceSites } from "@/data/services";

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = serviceSites.find((item) => item.id === id);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
