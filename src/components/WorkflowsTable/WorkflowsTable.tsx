import { useState, useEffect } from 'react'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import PaginationControls from './components/PaginationControls'
import EditModal from '../Modals/EditModal'
import DeleteModal from '../Modals/DeleteModal'
import SkeletonRow from './components/SkeletonRow'
import ErrorDisplay from './components/ErrorDisplay'
import EmptyWorkflowsDisplay from './components/EmptyWorkflowsDisplay'
import { useWorkflowSelection } from '../../hooks/useWorkflowSelection'
import { useWorkflowFilters } from '../../hooks/useWorkflowFilters'
import { useModalState } from '../../hooks/useModalState'
import { WorkflowItem, SortColumn, SortDirection } from '../../types/workflow'

interface WorkflowsTableProps {
  searchQuery: string
  triggerNew: number
  data: WorkflowItem[]
  isLoading: boolean
  error: Error | null
}

const ITEMS_PER_PAGE = 10

const WorkflowsTable = ({ searchQuery, triggerNew, data: fetchedData, isLoading, error }: WorkflowsTableProps) => {
  const [localData, setLocalData] = useState<WorkflowItem[]>(fetchedData)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Update local data when prop changes
  useEffect(() => {
    setLocalData(fetchedData)
  }, [fetchedData])

  // Modal state management
  const { isOpen: isModalOpen, selectedItem, selectedIndex, content, openModal, closeModal } = useModalState(triggerNew)

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState<{ item: WorkflowItem; index: number } | null>(null)
  const [isBulkDelete, setIsBulkDelete] = useState(false)

  // Filter and sort workflows
  const filteredData = useWorkflowFilters(localData, searchQuery, sortColumn, sortDirection)

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Selection management
  const {
    selectedWorkflowIds,
    handleCheckboxChange,
    handleSelectAll,
    clearSelection,
    isAllSelected,
    isSomeSelected,
    selectedCount
  } = useWorkflowSelection(paginatedData)

  // Handlers
  const handleEdit = (item: WorkflowItem, index: number, type: 'menu' | 'tags' = 'menu') => {
    openModal(item, index, type)
  }

  const handleSave = (updatedItem: WorkflowItem) => {
    if (selectedIndex !== null) {
      // Editing existing workflow
      setLocalData(prev => {
        const newData = [...prev]
        newData[selectedIndex] = { ...updatedItem }
        return newData
      })
    } else {
      // Creating new workflow and putting it first in the list
      setLocalData(prev => [{ ...updatedItem }, ...prev])
    }
  }

  const handleDelete = (item: WorkflowItem, index: number) => {
    setDeleteItem({ item, index })
    setIsBulkDelete(false)
    setIsDeleteModalOpen(true)
  }

  const handleBulkDeleteClick = () => {
    setIsBulkDelete(true)
    setIsDeleteModalOpen(true)
  }

  // Unified delete handler
  const handleDeleteConfirm = () => {
    if (isBulkDelete) {
      setLocalData(prev => prev.filter(item => !selectedWorkflowIds.has(item.id)))
      clearSelection()
    } else if (deleteItem) {
      setLocalData(prev => prev.filter((_, index) => index !== deleteItem.index))
    }
    setIsDeleteModalOpen(false)
    setDeleteItem(null)
    setIsBulkDelete(false)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeleteItem(null)
    setIsBulkDelete(false)
  }

  const handleSort = (column: 'name' | 'lastUpdated' | 'type') => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  // Reset page when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [sortColumn, sortDirection, searchQuery])

  // Show error message if fetch failed
  if (error && !isLoading) {
    return <ErrorDisplay message={error.message} />
  }

  // Show empty state message if no workflows are available
  if (!error && !isLoading && localData.length === 0) {
    return <EmptyWorkflowsDisplay />
  }

  return (
    <div className="flex-1 overflow-auto flex flex-col px-5">
      <table className="w-full table-fixed">
        <TableHeader
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          isAllSelected={isAllSelected}
          isSomeSelected={isSomeSelected}
          onSelectAll={handleSelectAll}
        />
        <tbody>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="border-b border-[#E6E6E6] max-h-[64px]">
                <SkeletonRow />
              </tr>
            ))
          ) : (
            paginatedData.map(({ row, originalIndex }) => (
              <TableRow
                key={row.id}
                row={row}
                originalIndex={originalIndex}
                isSelected={selectedWorkflowIds.has(row.id)}
                onCheckboxChange={handleCheckboxChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                selectedCount={selectedCount}
                onBulkDelete={handleBulkDeleteClick}
              />
            ))
          )}
        </tbody>
      </table>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
      />
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        workflow={selectedItem}
        onSave={handleSave}
        content={content}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        itemName={isBulkDelete ? '' : (deleteItem?.item.name || '')}
        itemCount={isBulkDelete ? selectedCount : null}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

export default WorkflowsTable
