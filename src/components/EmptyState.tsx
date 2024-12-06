import { t } from 'i18next'

export function EmptyState() {
  return (
    <div className="w-full h-96 bg-white flex items-center justify-center flex-col gap-5">
      <h1 className="capitalize text-slate-600 text-3xl">{t('no-data-available')}</h1>
    </div>
  )
}
