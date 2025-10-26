import type { Blog, Authors } from 'contentlayer/generated'

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function sortPosts<T extends { date: string }>(allPosts: T[]) {
  return allPosts.sort((a, b) => dateSortDesc(a.date, b.date))
}

export function coreContent<T extends Record<string, any>>(content: T): CoreContent<T> {
  const { body, _raw, _id, ...rest } = content
  return rest as CoreContent<T>
}

export function allCoreContent<T extends Record<string, any>>(contents: T[]): CoreContent<T>[] {
  return contents.map((c) => coreContent(c))
}
