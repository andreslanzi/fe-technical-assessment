// Displays empty state message when no workflows are available
const EmptyWorkflowsDisplay = () => {
  return (
    <div className="flex-1 overflow-auto flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Workflows Found</h3>
          <p className="text-sm text-gray-600 mb-4">There are no workflows available at the moment.</p>
          <p className="text-xs text-gray-500">Create a new workflow to get started.</p>
        </div>
      </div>
    </div>
  )
}

export default EmptyWorkflowsDisplay

