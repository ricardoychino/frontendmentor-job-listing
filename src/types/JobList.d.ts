export type Job = {
  id: number,
  company: string,
  position: string,
  logo?: string,
  new?: boolean,
  featured?: boolean,
  role?: string,
  level?: string,
  postedAt?: string,
  contract?: string,
  location?: string,
  languages?: string[],
  tools?: string[]
}