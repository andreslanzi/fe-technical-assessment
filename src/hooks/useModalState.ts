import { useState, useEffect } from 'react'
import { WorkflowItem, ModalContent } from '../types/workflow'

interface ModalState {
  isOpen: boolean
  selectedItem: WorkflowItem | null
  selectedIndex: number | null
  content: ModalContent
}

// Manages edit modal state
export const useModalState = (triggerNew: number) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    selectedItem: null,
    selectedIndex: null,
    content: 'menu'
  })

  const openModal = (item: WorkflowItem | null, index: number | null, content: ModalContent = 'menu') => {
    setModalState({
      isOpen: true,
      selectedItem: item,
      selectedIndex: index,
      content
    })
  }

  const closeModal = () => {
    setModalState({
      isOpen: false,
      selectedItem: null,
      selectedIndex: null,
      content: 'menu'
    })
  }

  useEffect(() => {
    if (triggerNew > 0) {
      openModal(null, null, 'menu')
    }
  }, [triggerNew])

  return {
    ...modalState,
    openModal,
    closeModal
  }
}

