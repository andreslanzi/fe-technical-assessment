import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import TagsBadge from '../../TagsBadge'
import { WorkflowItem, ModalContent } from '../../../types/workflow'
import { formatDateRelative } from '../../../utils/dateUtils'

interface TableRowProps {
  row: WorkflowItem
  originalIndex: number
  isSelected: boolean
  onCheckboxChange: (workflowId: number) => void
  onEdit: (item: WorkflowItem, index: number, type?: ModalContent) => void
  onDelete: (item: WorkflowItem, index: number) => void
  selectedCount: number
  onBulkDelete: () => void
}

// Individual table row component
const TableRow = ({
  row,
  originalIndex,
  isSelected,
  onCheckboxChange,
  onEdit,
  onDelete,
  selectedCount,
  onBulkDelete
}: TableRowProps) => {
  return (
    <tr className="border-b border-[#E6E6E6] max-h-[64px]">
      <td className="py-[22px] px-[16px] max-h-[64px]">
        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onCheckboxChange(row.id)}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      </td>
      <td className="py-[22px] px-[16px] overflow-hidden font-inter font-normal text-[13px] leading-5 tracking-normal text-[#868686] max-h-[64px]">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.type}</div>
      </td>
      <td className="py-[22px] px-[16px] overflow-hidden font-inter font-medium text-sm leading-5 tracking-normal text-[#09090B] max-h-[64px]">
        {row.name === 'No Name' ? (
          <div className="font-inter font-normal text-[13px] leading-5 text-[#868686]">No Name</div>
        ) : (
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.name}</div>
        )}
      </td>
      <td className="py-[17px] px-[16px] overflow-hidden max-h-[64px]">
        <div className="overflow-hidden">
          <TagsBadge 
            tags={row.tags} 
            onAddTagClick={() => onEdit(row, originalIndex, 'tags')}
          />
        </div>
      </td>
      <td className="py-[22px] px-[16px] overflow-hidden font-inter font-normal text-[13px] leading-5 text-[#808593] max-h-[64px]">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{formatDateRelative(row.lastUpdated)}</div>
      </td>
      <td className="py-[20px] px-[16px] max-h-[64px]">
        {selectedCount > 1 ? (
          isSelected ? (
            <div className="flex items-center h-6">
              <button 
                onClick={onBulkDelete}
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs font-inter leading-tight h-8 flex items-center"
              >
                Delete All
              </button>
            </div>
          ) : null
        ) : (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onEdit(row, originalIndex)}
              className="w-6 h-6 rounded-[6px] p-[6px] flex items-center justify-center bg-[#09090B0A] hover:bg-[#09090B14] transition-colors"
            >
              <FontAwesomeIcon icon={faPencil} className="w-[13px] h-[13px] text-black" />
            </button>
            <button 
              onClick={() => onDelete(row, originalIndex)}
              className="w-6 h-6 rounded-[6px] p-[6px] flex items-center justify-center bg-[#09090B0A] hover:bg-red-100 transition-colors"
            >
              <FontAwesomeIcon icon={faTrashCan} className="w-[13px] h-[13px] text-black hover:text-red-600 transition-colors" />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default TableRow

