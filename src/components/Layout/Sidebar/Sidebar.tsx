import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faDatabase, faChartSimple, faGear } from '@fortawesome/free-solid-svg-icons'

interface SidebarProps {
  onNewClick: () => void
}

const Sidebar = ({ onNewClick }: SidebarProps) => {
  return (
    <div className="w-[241px] bg-white flex flex-col border-r border-[#E6E6E6]">
      <div className="px-[17px] py-[8px] flex flex-col items-center gap-2">
        <div className='flex items-center gap-2 justify-start w-full'>
          <div className="w-9 h-9 rounded-md bg-[#ADABFF]"></div>
          <h1 className="font-inter font-semibold text-sm leading-5 tracking-normal align-middle">AirOps</h1>
        </div>
        <button 
          onClick={onNewClick}
          className="w-[224px] h-8 bg-white border border-[#09090B14] rounded-md shadow-[0px_1px_2px_0px_#1018280D] pt-1.5 pr-[10px] pb-1.5 pl-3 text-black flex items-center justify-center transition-all duration-200 ease-in hover:bg-violet-200 active:opacity-60"
        >
          <span className="text-[13px] font-[600] mr-2">New</span>
          <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
        </button>
      </div>
      <div className="flex-1">
        <div className="flex items-center py-[6px] px-[8px] rounded hover:bg-gray-100 cursor-pointer">
          <FontAwesomeIcon icon={faDatabase} className="w-3 h-3 mr-2 text-[#565656]" />
          <span className="font-inter font-medium text-xs leading-5 tracking-normal text-[#565656]">Data Name</span>
        </div>
        <div className="flex items-center py-[6px] px-[8px] rounded hover:bg-gray-100 cursor-pointer">
          <FontAwesomeIcon icon={faChartSimple} className="w-3 h-3 mr-2 text-[#565656]" />
          <span className="font-inter font-medium text-xs leading-5 tracking-normal text-[#565656]">Monitoring</span>
        </div>
        <div className="flex items-center py-[6px] px-[8px] rounded hover:bg-gray-100 cursor-pointer">
          <FontAwesomeIcon icon={faGear} className="w-3 h-3 mr-2 text-[#565656]" />
          <span className="font-inter font-medium text-xs leading-5 tracking-normal text-[#565656]">Settings</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

