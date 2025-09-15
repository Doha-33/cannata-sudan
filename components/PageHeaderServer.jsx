import React from 'react'
import ApiClient from "@/Services/APIs";
import PageHeader from './PageHeader';
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function PageServerHeader({ titleKey }) {
    const imgUrl = titleKey + "_image"
      console.log("imgUrl",imgUrl);
      const getImg = await ApiClient.get("setting");
      console.log("getImg",getImg);
      
      const img = getImg.data ? getImg.data[imgUrl] : "/images/image16.png";
      console.log("img",img);
  return (
    <PageHeader titleKey={titleKey} img={img} />
  )
}

