export type filterProps = {
  allData: Array<{id: string}>
  columns: Array<string>
  filterTypes?: Array<string>
  loadingIcon?: string
}

export type filterUpdate = {
  type: string
  value?: string
}

export type stringKeyOptions = {
  [key: string]: any
}