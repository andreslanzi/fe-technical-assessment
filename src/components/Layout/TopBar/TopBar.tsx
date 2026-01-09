import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface TopBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

const TopBar = ({ searchQuery, onSearchChange }: TopBarProps) => {
  return (
    <div className="w-full h-[80px] border-b border-[#E6E6E6] bg-white px-6 py-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="font-inter font-bold text-[30px] leading-9 tracking-[-0.02em] text-black">Workflows</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, tags, or type"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full min-w-[300px] max-w-[500px] max-h-[32px] px-8 py-[6px] border border-[#00000029] rounded text-sm font-inter shadow-[0px_1px_3px_0px_#1018281A] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

export default TopBar

