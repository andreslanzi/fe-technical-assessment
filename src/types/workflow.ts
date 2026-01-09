export interface WorkflowItem {
  type: string
  name: string
  tags: { name: string; color: string }[]
  lastUpdated: number
  id: number
}

export type SortColumn = 'name' | 'lastUpdated' | 'type' | null
export type SortDirection = 'asc' | 'desc'
export type ModalContent = 'menu' | 'tags'

