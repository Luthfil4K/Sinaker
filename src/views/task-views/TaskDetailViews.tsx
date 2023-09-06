import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import CardTaskDetail from 'src/views/cards/CardTaskDetail'
import CardTaskSubmit from 'src/views/cards/CardTaskSubmit'
import CardTaskComment from 'src/views/cards/CardTaskComment'

const TaskDetailViews = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <CardTaskDetail></CardTaskDetail>
        </Grid>
        <Grid item md={4}>
          <CardTaskSubmit></CardTaskSubmit>
          <CardTaskComment></CardTaskComment>
        </Grid>
      </Grid>
    </>
  )
}

export default TaskDetailViews
