import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  // Skip revalidation in development to prevent HMR issues
  if (process.env.NODE_ENV === 'development') {
    return doc
  }

  payload.logger.info(`Revalidating footer`)

  revalidateTag('global_footer')

  return doc
}
