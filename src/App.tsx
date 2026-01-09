import { useState } from 'react'
import Sidebar from './components/Layout/Sidebar'
import TopBar from './components/Layout/TopBar'
import WorkflowsTable from './components/WorkflowsTable'
import { useAirOps } from './hooks/useAirOps'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const [triggerNew, setTriggerNew] = useState(0)
  const { data, isLoading, error } = useAirOps()

  // Opens the new workflow modal
  const handleNewClick = () => {
    setTriggerNew(prev => prev + 1)
  }

  return (
    <div className="flex h-screen">
      <Sidebar onNewClick={handleNewClick} />
      <div className="flex-1 flex flex-col">
        <TopBar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
        />
        <WorkflowsTable 
          searchQuery={debouncedSearchQuery} 
          triggerNew={triggerNew}
          data={data}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}

export default App

