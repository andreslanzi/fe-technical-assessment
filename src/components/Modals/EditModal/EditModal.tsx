import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons'
import { capitalize } from '../../../utils/stringUtils'
import { WorkflowItem, ModalContent } from '../../../types/workflow'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  workflow: WorkflowItem | null
  onSave: (item: WorkflowItem) => void
  content: ModalContent
}

const EditModal = ({ isOpen, onClose, workflow, onSave, content = 'menu' }: EditModalProps) => {
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [tags, setTags] = useState<{ name: string; color: string }[]>([])
  const firstTagInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (workflow) {
      const normalizedType = workflow.type.toLowerCase().includes('workflow')
        ? 'Workflow' 
        : workflow.type.toLowerCase().includes('agent') 
        ? 'Agent' 
        : workflow.type
      setType(normalizedType)
      setName(workflow.name)
      if (content === 'tags') {
        // If opening in tags mode, add a new tag if there are no tags
        const existingTags = workflow.tags && Array.isArray(workflow.tags) && workflow.tags.length > 0 ? [...workflow.tags] : []
        setTags(existingTags.length > 0 ? existingTags : [{ name: '', color: '#000000' }])
      } else {
        setTags(workflow.tags && Array.isArray(workflow.tags) && workflow.tags.length > 0 ? [...workflow.tags] : [])
      }
    } else {
      setType('Workflow')
      setName('')
      setTags([])
    }
  }, [workflow, content])

  // Focus on first tag input when opening in tags mode
  useEffect(() => {
    if (isOpen && content === 'tags' && tags.length > 0) {
      // Small delay to ensure the input is rendered
      setTimeout(() => {
        if (firstTagInputRef.current) {
          firstTagInputRef.current.focus()
          // Select the text if it's empty
          if (firstTagInputRef.current.value === '') {
            firstTagInputRef.current.select()
          }
        }
      }, 100)
    }
  }, [isOpen, content, tags.length])

  if (!isOpen) return null

  const handleTagChange = (index: number, field: 'name' | 'color', value: string) => {
    const newTags = [...tags]
    newTags[index] = { ...newTags[index], [field]: value }
    setTags(newTags)
  }

  const handleAddTag = () => {
    setTags([...tags, { name: '', color: '#000000' }])
  }

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index)
    setTags(newTags)
  }

  // Saves the workflow with updated information
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const filteredTags = tags.filter(tag => tag.name.trim())
    
    const updatedItem: WorkflowItem = {
      type,
      name: capitalize(name.trim() || 'No Name'),
      tags: filteredTags,
      lastUpdated: Math.floor(Date.now() / 1000),
      id: workflow?.id || Date.now()
    }
    onSave(updatedItem)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4 text-gray-600" />
        </button>
        {content !== 'tags' && (
          <h2 className="text-xl font-semibold mb-4">{workflow ? 'Edit Workflow' : 'New Workflow'}</h2>
        )}
        <form onSubmit={handleSubmit}>
          {content === 'menu' && (
            <>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="Workflow"
                  checked={type === 'Workflow'}
                  onChange={(e) => setType(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Workflow</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="Agent"
                  checked={type === 'Agent'}
                  onChange={(e) => setType(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Agent</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
            </>
          )}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Tags</label>
            <div className="space-y-2">
              {tags.length > 0 && tags.map((tag, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    ref={index === 0 ? firstTagInputRef : null}
                    type="text"
                    value={tag.name}
                    onChange={(e) => handleTagChange(index, 'name', e.target.value)}
                    placeholder="Tag name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="color"
                    value={tag.color}
                    onChange={(e) => handleTagChange(index, 'color', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddTag}
                className="flex items-center gap-2 px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                <span>Add Tag</span>
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {workflow ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal

