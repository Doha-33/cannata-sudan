'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLocale = params.locale || 'en';

  // ⬇️ اول ما يفتح الموقع يخلي الديفولت en
  useEffect(() => {
    if (!params.locale) {
      router.replace(`/en${pathname}`);
    }
  }, [params.locale, pathname, router]);

  function toggleLanguage() {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  }

  return (
    <button
      onClick={toggleLanguage}
      style={{
        color: "white",
        padding: '4px 8px',
        cursor: 'pointer',
        borderRadius: '4px',
        backgroundColor: 'rgb(45, 44, 111)',
      }}
      aria-label="Toggle Language"
    >
      {currentLocale === 'en' ? 'عربي' : 'English'}
    </button>
  );
}
