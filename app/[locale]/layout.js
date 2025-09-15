import Navbar from "@/components/Navbar";
import { dir } from "i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsappButton";
import ChatWidget from "@/components/ChatWidget";

export const languages = ["en", "ar"];

export function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/cannata21.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/cannata21.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/cannata21.png"
        />
      </head>
      <body>
        <Navbar />
        <div>
          {children}

            <ChatWidget />
            
            <WhatsAppButton />
        </div>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
