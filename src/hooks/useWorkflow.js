import { useQuery } from 'react-query'

import { get } from '../clients/api'

const fetchWorkflow = (_key, repo, workflowId) => get(`/repos/${repo}/actions/workflows/${workflowId}`)

export const useWorkflow = (repo, workflowId) => {
  return useQuery(['workflow', repo, workflowId], fetchWorkflow, { staleTime: Infinity })
}
