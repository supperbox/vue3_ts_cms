import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(date: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.utc(date).format(format)
}

export function utcFormat(date: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.utc(date).format(format)
}
