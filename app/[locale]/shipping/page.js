import ShippingClient from "./ShippingClient";
import seoConfig from "@/config/seoConfig";
import ApiClient from "@/Services/APIs";

export async function generateMetadata({ params }) {
  const locale = params.locale;
  const seo = seoConfig.shippingRequest[locale] || seoConfig.shippingRequest.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      languages: {
        en: seoConfig.shippingRequest.en.url,
        ar: seoConfig.shippingRequest.ar.url,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.url,
      siteName: "Cannata",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
  };
}

export default async function ShippingServer({ locale }) {
  const data = [
    {
      id: 1,
      from: {
        country: "Afghanistan",
        state: "Andaman and Nicobar Islands",
        city: "Bombuflat",
      },
      to: {
        country: "Albania",
        state: "Andhra Pradesh",
        city: "Garacharma",
      },
      shipping_methods: [
        {
          id: 1,
          type: "air",
          price: "14.00",
        },
        {
          id: 4,
          type: "sea",
          price: "12.00",
        },
        {
          id: 5,
          type: "land",
          price: "23.00",
        },
      ],
    },
    {
      id: 2,
      from: {
        country: "Afghanistan",
        state: "Andaman and Nicobar Islands",
        city: "Bombuflat",
      },
      to: {
        country: "Albania",
        state: "Andhra Pradesh",
        city: "Garacharma",
      },
      shipping_methods: [
        {
          id: 2,
          type: "air",
          price: "9.00",
        },
      ],
    },
    {
      id: 3,
      from: {
        country: "Afghanistan",
        state: "Andaman and Nicobar Islands",
        city: "Bombuflat",
      },
      to: {
        country: "Albania",
        state: "Andhra Pradesh",
        city: "Garacharma",
      },
      shipping_methods: [
        {
          id: 3,
          type: "air",
          price: "15.00",
        },
      ],
    },
  ];
  const res = await ApiClient.get("tracks");
  // const tracks = res?.data || data;
  const tracks =  data;
  const trackOptions = tracks.map((track) => ({
    value: track.id,
    label: `${track.from.city} ➝ ${track.to.city}`,
    methods: track.shipping_methods,
  }));

  return <ShippingClient trackOptions={trackOptions} locale={locale} />;
}
