// app/[locale]/components/FooterWrapper.jsx
import FooterClient from "./FooterClient";
import  ApiClient  from "../Services/APIs";

export default async function Footer({ locale }) {
  // هنا بنجيب الداتا من السيرفر
  const settingRes = await ApiClient.get("setting");
  const servicesRes = await ApiClient.get("service");

  const setting = settingRes?.data || null;
  const services = servicesRes?.data || [];

  return <FooterClient locale={locale} setting={setting} services={services} />;
}
