import * as React from 'react'
import { useTranslations } from 'next-intl'

export const Error: React.FC<{ message?: string }> = ({ message }) => {
  const t = useTranslations()
  return (
    <div className="mt-2 text-red-500 text-sm">
      {message || t('forms.fieldRequired') || 'Acest câmp este obligatoriu'}
    </div>
  )
}
