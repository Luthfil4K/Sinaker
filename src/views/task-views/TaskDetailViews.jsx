import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import CardTaskDetail from 'src/views/cards/CardTaskDetail'
import CardTaskSubmit from 'src/views/cards/CardTaskSubmit'
import CardTaskComment from 'src/views/cards/CardTaskComment'

const TaskDetailViews = props => {
  console.log(props.data)
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <CardTaskDetail data={props.data}></CardTaskDetail>
        </Grid>
        <Grid item md={4}>
          <CardTaskSubmit data={props.data}></CardTaskSubmit>
          <CardTaskComment data={props.data}></CardTaskComment>
        </Grid>
      </Grid>
    </>
  )
}

export default TaskDetailViews
