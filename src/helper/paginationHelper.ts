export function convertObjToQueryParam(obj: { [key: string]: any }): string {
  return (
    '?' +
    Object.keys(obj)
      .filter(
        (key) => key !== undefined && key !== null && obj[key] !== undefined && obj[key] !== null
      ) // Exclude keys and values that are undefined or null
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&')
  )
}

export interface defaultPaginationType {
  page: number
  size: number
  type?: string
  sub_type?: string
  query?: string
}

export const defaultPaginationObj: defaultPaginationType = {
  size: 10,
  page: 0
}
