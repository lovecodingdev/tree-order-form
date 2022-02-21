export interface File {
  path: string
  url: string
  size: string
}

export interface Tree {
  label: string
  nodes?: Tree[]
  lastFolder?: boolean
  file?: File
  key: string
}
