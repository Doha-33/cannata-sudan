'use client';

import { useEffect, useState } from 'react';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';

export default function useTranslationClient() {
  const { locale } = useParams();
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!locale) return;
    i18n.changeLanguage(locale).then(() => {
      setReady(true);
    });
  }, [locale]);

  return { t, ready };
}