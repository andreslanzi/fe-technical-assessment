import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  itemName: string
  itemCount: number | null
  onConfirm: () => void
}

const DeleteModal = ({ isOpen, onClose, itemName, itemCount, onConfirm }: DeleteModalProps) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const isBulkDelete = itemCount !== null && itemCount > 1

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4 text-gray-600" />
        </button>
        <h2 className="text-xl mb-4">
          {isBulkDelete ? (
            <>Delete <span className="font-semibold">{itemCount} Workflows</span></>
          ) : (
            <>Delete <span className="font-semibold">{itemName}</span></>
          )}
        </h2>
        <p className="mb-6">
          {isBulkDelete
            ? `Are you sure you want to delete ${itemCount} workflows? This action cannot be undone.`
            : 'Are you sure you want to delete this workflow? This action cannot be undone.'}
        </p>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal

