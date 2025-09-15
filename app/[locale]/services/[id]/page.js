// app/[locale]/services/[id]/page.jsx
import ServiceDetails from "./ServiceDetails";
import { getAPI, getServiceById } from "@/Services/APIs";
import PageServerHeader from "@/components/PageHeaderServer";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function ServiceDetailsPage({ params }) {
  const { id, locale } = params;

  let service = null;
  let allServices = [];
  let faqs = [];
  let setting = null;

  try {
    const serviceRes = await getServiceById(id);
    service = serviceRes.data.data;

    const servicesRes = await getAPI("service");
    allServices = servicesRes.data.data;

    const faqsRes = await getAPI("faqs");
    faqs = faqsRes.data.data;

    const settingRes = await getAPI("setting");
    setting = settingRes.data.data;
  } catch (e) {
    console.error("Error fetching data:", e);
  }

  return (
    <>
      <PageServerHeader titleKey={"service"} />

      <ServiceDetails
        id={id}
        locale={locale}
        service={service}
        allServices={allServices}
        faqs={faqs}
        setting={setting}
      />
    </>
  );
}
