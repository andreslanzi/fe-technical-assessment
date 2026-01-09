import { useState, useMemo } from 'react'
import { WorkflowItem } from '../types/workflow'

interface FilteredDataItem {
  row: WorkflowItem
  originalIndex: number
}

// Manages workflow selection state and operations
export const useWorkflowSelection = (paginatedData: FilteredDataItem[]) => {
  const [selectedWorkflowIds, setSelectedWorkflowIds] = useState<Set<number>>(new Set())

  const handleCheckboxChange = (workflowId: number) => {
    setSelectedWorkflowIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(workflowId)) {
        newSet.delete(workflowId)
      } else {
        newSet.add(workflowId)
      }
      return newSet
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedData.map(({ row }) => row.id))
      setSelectedWorkflowIds(prev => {
        const newSet = new Set(prev)
        allIds.forEach(id => newSet.add(id))
        return newSet
      })
    } else {
      const paginatedIds = new Set(paginatedData.map(({ row }) => row.id))
      setSelectedWorkflowIds(prev => {
        const newSet = new Set(prev)
        paginatedIds.forEach(id => newSet.delete(id))
        return newSet
      })
    }
  }

  const clearSelection = () => {
    setSelectedWorkflowIds(new Set())
  }

  const isAllSelected = useMemo(() => {
    return paginatedData.length > 0 && paginatedData.every(({ row }) => selectedWorkflowIds.has(row.id))
  }, [paginatedData, selectedWorkflowIds])

  const isSomeSelected = useMemo(() => {
    return paginatedData.some(({ row }) => selectedWorkflowIds.has(row.id))
  }, [paginatedData, selectedWorkflowIds])

  const selectedCount = selectedWorkflowIds.size

  return {
    selectedWorkflowIds,
    handleCheckboxChange,
    handleSelectAll,
    clearSelection,
    isAllSelected,
    isSomeSelected,
    selectedCount
  }
}

