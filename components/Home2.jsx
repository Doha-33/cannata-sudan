import ApiClient from "@/Services/APIs";
import Home2Client from "./Home2Client";
export default async function Home2() {
  const about = await ApiClient.get("about");

  return  <Home2Client about={about.data} />;
}