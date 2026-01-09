import { useState, useEffect, useRef } from 'react'
import AirOps from '@airops/airops-js'
import { WorkflowItem } from '../types/workflow'
import { normalizeWorkflowArray } from '../utils/workflowUtils'

// Fetches workflows from AirOps API
export const useAirOps = () => {
  const [data, setData] = useState<WorkflowItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const userId = import.meta.env.VITE_USER_ID
        const workspaceId = import.meta.env.VITE_WORKSPACE_ID
        const hashedUserId = import.meta.env.VITE_HASHED_USER_ID
        const appIdStr = import.meta.env.VITE_AIROPS_APP_ID
        const appVersionStr = import.meta.env.VITE_AIROPS_APP_VERSION
        const appId = appIdStr ? Number(appIdStr) : NaN
        const appVersion = appVersionStr ? Number(appVersionStr) : NaN

        if (!userId || !workspaceId || !hashedUserId || !appIdStr || isNaN(appId)) {
          throw new Error('Missing required AirOps environment variables')
        }

        const client = AirOps.identify({
          userId,
          workspaceId: Number(workspaceId),
          hashedUserId
        })

        const response = await client.apps.execute({
          appId,
          version: appVersion,
          payload: {
            inputs: {
              count: 12,
            }
          },
          stream: true,
          streamCallback: () => (null),
          streamCompletedCallback: () => (null),
        })

        const result = await response.result()
        
        const resultData = result.output && typeof result.output === 'object' && 'data' in result.output
          ? result.output.data
          : result.output

        const workflowsArray = normalizeWorkflowArray(resultData)
        
        setData(workflowsArray)
      } catch (err) {
        console.error('Error fetching workflows:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch workflows'))
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading, error }
}
