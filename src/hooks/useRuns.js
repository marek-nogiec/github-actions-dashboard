import { useQuery } from 'react-query'

import { get } from '../clients/api'

const fetchRuns = (_key, repo) => get(`/repos/${repo}/actions/runs?per_page=5`)

export const useRuns = (repo) => {
  return useQuery(['runs', repo], fetchRuns)
}
