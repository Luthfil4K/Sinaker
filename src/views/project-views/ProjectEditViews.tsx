// react import
import { forwardRef, SetStateAction, useEffect, useState } from 'react'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/dist/client/router'

import { Autocomplete } from '@mui/lab'

import TableProjectEditParticipant from 'src/views/tables/TableProjectEditParticipant'
import CardProjectEdit from 'src/views/cards/CardProjectEdit'

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Start Date' autoComplete='on' />
})

const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const ProjectEditViews = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const router = useRouter()

  return (
    <Card>
      <CardProjectEdit></CardProjectEdit>
      <Grid container>
        <Grid item md={12} xs={12} justifyContent={'end'} display={'flex'} p={4}>
          {/* <Button variant='contained'> Add Participant</Button> */}
        </Grid>
      </Grid>

      {/* <TableProjectEditParticipant></TableProjectEditParticipant> */}
      <Grid container mt={4}>
        <Grid p={4} md={12} item display={'flex'} justifyContent={'end'}>
          <Button
            onClick={e => {
              router.push('/project-detail')
            }}
            variant='contained'
          >
            {' '}
            Edit Kegiatan
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProjectEditViews
