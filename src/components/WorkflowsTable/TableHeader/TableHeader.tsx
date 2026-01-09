import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { SortColumn, SortDirection } from '../../../types/workflow'

interface TableHeaderProps {
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSort: (column: 'name' | 'lastUpdated' | 'type') => void
  isAllSelected: boolean
  isSomeSelected: boolean
  onSelectAll: (checked: boolean) => void
}

// Table header with sortable columns and select all checkbox
const TableHeader = ({ 
  sortColumn, 
  sortDirection, 
  onSort, 
  isAllSelected, 
  isSomeSelected, 
  onSelectAll 
}: TableHeaderProps) => {
  return (
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
              onChange={(e) => onSelectAll(e.target.checked)}
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
              onClick={() => onSort('type')}
            />
          </div>
        </th>
        <th className="text-left py-[18px] px-[16px] font-inter font-semibold text-sm leading-5 text-[#09090B] w-[56.08%] max-w-[650px]">
          <div className="flex items-center gap-1">
            <span>Name</span>
            <FontAwesomeIcon 
              icon={sortColumn === 'name' && sortDirection === 'asc' ? faCaretUp : faCaretDown} 
              className="w-3 h-3 text-black cursor-pointer hover:opacity-70" 
              onClick={() => onSort('name')}
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
              onClick={() => onSort('lastUpdated')}
            />
          </div>
        </th>
        <th className="text-left py-[18px] px-[16px] font-inter font-semibold text-sm leading-5 text-[#09090B] w-[7.59%] max-w-[88px]">Actions</th>
      </tr>
    </thead>
  )
}

export default TableHeader

