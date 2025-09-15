import SliderClient from "./SliderClient";
import ApiClient from "@/Services/APIs";

export default async function SliderServer() {
  const res = await ApiClient.get("slider");
  const slides = res?.data || [];

  return <SliderClient slides={slides}  />;
}
