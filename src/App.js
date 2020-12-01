import React from 'react'
import { useWorkflow } from './hooks/useWorkflow'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import Icon from '@material-ui/core/Icon'
import { green, yellow } from '@material-ui/core/colors'
import { CardHeader, Grid } from '@material-ui/core'
import Container from '@material-ui/core/Container'

import { useRuns } from './hooks/useRuns'

import './App.css'

const RunIcon = ({ status }) => {
  const inProgressStyle = {
    animation: 'spin 1s ease-in-out infinite',
    color: yellow[700],
  }

  switch (status) {
    case 'completed':
      return <Icon style={{ color: green[500] }}>done</Icon>
    case 'in_progress':
      return <Icon style={inProgressStyle}>cached</Icon>
    default:
      return <Icon>help</Icon>
  }
}

const RunsOverviewItem = ({ repo, run }) => {
  const { data: workflow } = useWorkflow(repo, run.workflow_id)

  if (!workflow) return null

  const url = `https://github.com/${repo}/actions/runs/${run.id}`
  const handleClick = () => window.open(url, '_blank')
  console.log(run)
  return (
    <ListItem button onClick={handleClick}>
      <ListItemIcon>
        <RunIcon status={run.status}/>
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ noWrap: true }} primary={run.head_commit.message} secondary={workflow.name}/>
    </ListItem>
  )
}

const RunsOverview = ({ repo }) => {
  const { data = { workflow_runs: [] } } = useRuns(repo)

  const runs = data.workflow_runs.map(run => <RunsOverviewItem run={run} repo={repo} key={run.id}/>)

  return (
    <Card>
      <CardHeader title={repo}/>
      <CardContent>
        <List component='nav'>
          {runs}
        </List>
      </CardContent>
    </Card>
  )
}

const repoNames = process.env.REACT_APP_REPOS.split(',')

function App () {
  const repos = repoNames.map(repo => (
    <Grid item xs={12} lg={4} key={repo}>
      <RunsOverview repo={repo}/>
    </Grid>
  ))
  return (
    <Container className='App' maxWidth='lg'>
      <Grid container spacing={4}>
        {repos}
      </Grid>
    </Container>
  )
}

export default App
