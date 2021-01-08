export type filterProps = {
  allData: Array<object>
  columns: Array<string>
  filterTypes?: Array<string>
}

export type filterUpdate = {
  type: string
  value?: string
}

export type stringKeyOptions = {
  [key: string]: any
}