import { FaWhatsapp } from "react-icons/fa";
import ApiClient from "@/Services/APIs";
export default async function WhatsAppButton() {
const setting = await ApiClient.get("setting");
const whatsappNumber = setting?.data?.phone || "97142396252";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=مرحبًا، أود الاستفسار عن خدماتكم`}

      target="_blank"
      rel="noopener noreferrer" 
      style={{

        position: 'fixed',
        bottom: '10px',
        right: '20px',
        backgroundColor: 'rgb(191, 5, 22)',
        color: 'white',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '30px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
    >
      <FaWhatsapp  />
    </a>
  );
};

