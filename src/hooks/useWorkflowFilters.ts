import { useMemo } from 'react'
import { WorkflowItem, SortColumn, SortDirection } from '../types/workflow'

interface FilteredDataItem {
  row: WorkflowItem
  originalIndex: number
}

// Filters and sorts workflows based on search and sort settings
export const useWorkflowFilters = (
  data: WorkflowItem[],
  searchQuery: string,
  sortColumn: SortColumn,
  sortDirection: SortDirection
): FilteredDataItem[] => {
  return useMemo(() => {
    let result = data.map((row, index) => ({ row, originalIndex: index }))

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(({ row }) => {
        const typeMatch = row.type.toLowerCase().includes(query)
        const nameMatch = row.name.toLowerCase().includes(query)
        const tagsMatch = row.tags && Array.isArray(row.tags) && row.tags.some(tag => tag.name.toLowerCase().includes(query))
        
        return typeMatch || nameMatch || tagsMatch
      })
    }

    // Apply sorting
    if (sortColumn !== null) {
      result = [...result].sort((a, b) => {
        let comparison = 0
        
        if (sortColumn === 'name') {
          const getSortableText = (text: string) => {
            return (text || '').replace(/^[^\p{L}\p{N}\s]+/u, '').toLowerCase().trim()
          }
          const nameA = getSortableText(a.row.name)
          const nameB = getSortableText(b.row.name)
          comparison = nameA.localeCompare(nameB, undefined, { sensitivity: 'base' })
        } else if (sortColumn === 'type') {
          const typeA = a.row.type.toLowerCase()
          const typeB = b.row.type.toLowerCase()
          comparison = typeA.localeCompare(typeB)
        } else if (sortColumn === 'lastUpdated') {
          comparison = b.row.lastUpdated - a.row.lastUpdated
        }
        
        return sortDirection === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [data, searchQuery, sortColumn, sortDirection])
}

