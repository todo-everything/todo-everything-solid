/**
 * Generic interface for REST API resources.
 */
export interface IHttpApi<T> {
  create: (data: any) => Promise<T>
  get: (id: number) => Promise<T>
  update: (id: number, updates: any) => Promise<T>
  delete: (id: number) => Promise<void>
  fetchAll: () => Promise<T[]>
}
