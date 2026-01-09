import { useState, useMemo, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import TagsBadge from '../TagsBadge'
import EditModal from '../Modals/EditModal'
import DeleteModal from '../Modals/DeleteModal'
import SkeletonRow from '../SkeletonRow'
import { formatDateRelative } from '../../utils/dateUtils'

interface WorkflowItem {
  type: string
  name: string
  tags: { name: string; color: string }[]
  lastUpdated: number
  id: number
}

interface WorkflowItem {
  type: string
  name: string
  tags: { name: string; color: string }[]
  lastUpdated: number
  id: number
}

interface WorkflowsTableProps {
  searchQuery: string
  triggerNew: number
  data: WorkflowItem[]
  isLoading: boolean
}

const formatLastUpdated = (timestamp: number): string => {
  return formatDateRelative(timestamp)
}

const WorkflowsTable = ({ searchQuery, triggerNew, data: propData, isLoading: isLoadingProp }: WorkflowsTableProps) => {
  const [localData, setLocalData] = useState<WorkflowItem[]>(propData)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<'name' | 'lastUpdated' | 'type' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const ITEMS_PER_PAGE = 10

  // Update local data when prop changes
  useEffect(() => {
    setLocalData(propData)
  }, [propData])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<WorkflowItem | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [content, setcontent] = useState<'menu' | 'tags'>('menu')

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [deleteItemName, setDeleteItemName] = useState<string>('')
  const [selectedWorkflowIds, setSelectedWorkflowIds] = useState<Set<number>>(new Set())
  const [isBulkDelete, setIsBulkDelete] = useState(false)

  const handleEdit = (item: WorkflowItem, index: number, type: 'menu' | 'tags' = 'menu') => {
    setSelectedItem(item)
    setSelectedIndex(index)
    setcontent(type)
    setIsModalOpen(true)
  }

  // Saves changes to a workflow or creates a new one
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

  useEffect(() => {
    if (triggerNew > 0) {
      setSelectedItem(null)
      setSelectedIndex(null)
      setcontent('menu')
      setIsModalOpen(true)
    }
  }, [triggerNew])

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    setSelectedIndex(null)
    setcontent('menu')
  }

  // Opens delete confirmation for a single workflow
  const handleDelete = (item: WorkflowItem, index: number) => {
    setDeleteIndex(index)
    setDeleteItemName(item.name)
    setIsBulkDelete(false)
    setIsDeleteModalOpen(true)
  }

  // Opens delete confirmation for multiple workflows
  const handleBulkDeleteClick = () => {
    setIsBulkDelete(true)
    setIsDeleteModalOpen(true)
  }

  // Deletes selected workflows
  const handleDeleteConfirm = () => {
    if (isBulkDelete) {
      setLocalData(prev => prev.filter(item => !selectedWorkflowIds.has(item.id)))
      setSelectedWorkflowIds(new Set())
      setIsBulkDelete(false)
    } else if (deleteIndex !== null) {
      setLocalData(prev => prev.filter((_, index) => index !== deleteIndex))
    }
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeleteIndex(null)
    setDeleteItemName('')
    setIsBulkDelete(false)
  }

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

  const handleSelectAll = (checked: boolean, paginatedData: typeof filteredData) => {
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

  const handleSort = (column: 'name' | 'lastUpdated' | 'type') => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  // Filters and sorts workflows based on search and sort settings
  const filteredData = useMemo(() => {
    let result = localData.map((row, index) => ({ row, originalIndex: index }))

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(({ row }) => {
        const typeMatch = row.type.toLowerCase().includes(query)
        const nameMatch = row.name.toLowerCase().includes(query)
        const tagsMatch = row.tags && Array.isArray(row.tags) && row.tags.some(tag => tag.name.toLowerCase().includes(query))
        
        return typeMatch || nameMatch || tagsMatch
      })
    }

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
  }, [localData, searchQuery, sortColumn, sortDirection])

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const isAllSelected = paginatedData.length > 0 && paginatedData.every(({ row }) => selectedWorkflowIds.has(row.id))
  const isSomeSelected = paginatedData.some(({ row }) => selectedWorkflowIds.has(row.id))
  const selectedCount = selectedWorkflowIds.size

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [sortColumn, sortDirection])

  return (
    <div className="flex-1 overflow-auto flex flex-col">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-[#E6E6E6]">
            <th className="text-center py-[18px] px-[16px] font-inter font-semibold text-sm leading-5 text-[#09090B] w-[4%] max-w-[50px]">
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected && !isAllSelected
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked, paginatedData)}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            </th>
            <th className="text-left py-[18px] px-[16px] font-inter font-semibold text-sm leading-5 text-[#09090B] w-[9.23%] max-w-[107px]">
              <div className="flex items-center gap-1">
                <span>Type</span>
                <FontAwesomeIcon 
                  icon={sortColumn === 'type' && sortDirection === 'asc' ? faCaretUp : faCaretDown} 
                  className="w-3 h-3 text-black cursor-pointer hover:opacity-70" 
                  onClick={() => handleSort('type')}
                />
              </div>
            </th>
            <th className="text-left py-[18px] px-[16px] font-inter font-semibold text-sm leading-5 text-[#09090B] w-[56.08%] max-w-[650px]">
              <div className="flex items-center gap-1">
                <span>Name</span>
                <FontAwesomeIcon 
                  icon={sortColumn === 'name' && sortDirection === 'asc' ? faCaretUp : faCaretDown} 
                  className="w-3 h-3 text-black cursor-pointer hover:opacity-70" 
                  onClick={() => handleSort('name')}
                />
              </div>
            </th>
            <th className="text-left py-[18px] px-[16px] font-inter font-semibold text-sm leading-5 text-[#09090B] w-[15.53%] max-w-[180px]">Tags</th>
            <th className="text-left py-[18px] px-[16px] font-inter font-semibold text-sm leading-5 text-[#09090B] w-[11.56%] max-w-[134px]">
              <div className="flex items-center gap-1">
                <span>Last Updated</span>
                <FontAwesomeIcon 
                  icon={sortColumn === 'lastUpdated' && sortDirection === 'asc' ? faCaretUp : faCaretDown} 
                  className="w-3 h-3 text-black cursor-pointer hover:opacity-70" 
                  onClick={() => handleSort('lastUpdated')}
                />
              </div>
            </th>
            <th className="text-left py-[18px] px-[16px] font-inter font-semibold text-sm leading-5 text-[#09090B] w-[7.59%] max-w-[88px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingProp ? (
            Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="border-b border-[#E6E6E6] max-h-[64px]">
                <SkeletonRow />
              </tr>
            ))
          ) : (
            paginatedData.map(({ row, originalIndex }, index) => (
            <tr key={index} className="border-b border-[#E6E6E6] max-h-[64px]">
              <td className="py-[22px] px-[16px] max-h-[64px]">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={selectedWorkflowIds.has(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </td>
              <td className="py-[22px] px-[16px] overflow-hidden font-inter font-normal text-[13px] leading-5 tracking-normal text-[#868686] max-h-[64px]">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.type}</div>
              </td>
              <td className="py-[22px] px-[16px] overflow-hidden font-inter font-medium text-sm leading-5 tracking-normal text-[#09090B] max-h-[64px]">
                {row.name === 'No Name' ? <div className="font-inter font-normal text-[13px] leading-5 text-[#868686]">No Name</div> : <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.name}</div>}
              </td>
              <td className="py-[17px] px-[16px] overflow-hidden max-h-[64px]">
                <div className="overflow-hidden">
                  <TagsBadge 
                    tags={row.tags} 
                    onAddTagClick={() => handleEdit(row, originalIndex, 'tags')}
                  />
                </div>
              </td>
              <td className="py-[22px] px-[16px] overflow-hidden font-inter font-normal text-[13px] leading-5 text-[#808593] max-h-[64px]">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">{formatLastUpdated(row.lastUpdated)}</div>
              </td>
              <td className="py-[20px] px-[16px] max-h-[64px]">
                {selectedCount > 1 ? (
                  selectedWorkflowIds.has(row.id) && (
                    <div className="flex items-center h-6">
                      <button 
                        onClick={handleBulkDeleteClick}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs font-inter leading-tight h-6 flex items-center"
                      >
                        Delete All
                      </button>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(row, originalIndex)}
                      className="w-6 h-6 rounded-[6px] p-[6px] flex items-center justify-center bg-[#09090B0A] hover:bg-[#09090B14] transition-colors"
                    >
                      <FontAwesomeIcon icon={faPencil} className="w-[13px] h-[13px] text-black" />
                    </button>
                    <button 
                      onClick={() => handleDelete(row, originalIndex)}
                      className="w-6 h-6 rounded-[6px] p-[6px] flex items-center justify-center bg-[#09090B0A] hover:bg-red-100 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="w-[13px] h-[13px] text-black hover:text-red-600 transition-colors" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E6E6E6]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-[#ECEDEF] rounded text-sm font-inter disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-inter rounded ${
                    currentPage === page
                      ? 'bg-[#ADABFF] text-white'
                      : 'border border-[#ECEDEF] hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-[#ECEDEF] rounded text-sm font-inter disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="text-sm font-inter text-[#808593]">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
          </div>
        </div>
      )}
      <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        workflow={selectedItem}
        onSave={handleSave}
        content={content}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        itemName={isBulkDelete ? '' : deleteItemName}
        itemCount={isBulkDelete ? selectedCount : null}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

export default WorkflowsTable


