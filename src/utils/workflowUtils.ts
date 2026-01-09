import { WorkflowItem } from '../types/workflow'

// Normalizes workflow data from API to ensure consistent structure
export const normalizeWorkflowItem = (item: unknown): WorkflowItem => {
  const workflow = item as WorkflowItem
  return {
    type: workflow.type || '',
    name: workflow.name || '',
    tags: Array.isArray(workflow.tags) ? workflow.tags : [],
    lastUpdated: workflow.lastUpdated || Math.floor(Date.now() / 1000),
    id: workflow.id || Date.now()
  }
}

// Normalizes array of workflows
export const normalizeWorkflowArray = (data: unknown): WorkflowItem[] => {
  if (Array.isArray(data)) {
    return data.map(normalizeWorkflowItem)
  } else if (data && typeof data === 'object' && !Array.isArray(data)) {
    return [normalizeWorkflowItem(data)]
  }
  return []
}

