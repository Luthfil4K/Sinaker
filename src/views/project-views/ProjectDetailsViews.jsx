import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'

// swall
import Swal from 'sweetalert2'

import CardProjectInfo from 'src/views/cards/CardProjectInfo'
import TableProjectDetailTask from 'src/views/tables/TableProjectDetailTask'
import CardProjectDetailProgress from 'src/views/cards/CardProjectDetailProgress'

const ProjectDetailsViews = props => {
  const router = useRouter()
  const [project, setProject] = useState(props.data)
  const handleEdit = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'You will not be able to recover this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, archive it!'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/project-edit')
      } else {
        router.push('/project-detail')
      }
    })
  }
  const handleDelete = () => {
    Swal.fire({
      title: 'Apa anda yakin?',
      text: 'Untuk menghapus project ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hapus'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('project di hapus')
        router.push('/project-detail')
      } else {
        router.push('/project-detail')
      }
    })
  }
  const handleArchieve = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'Untuk Mengarsipkan Kegiatan Ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, arsipkan!'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('project di arsipkan')
      }
    })
  }
  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={8}>
          <CardProjectInfo data={project}></CardProjectInfo>
        </Grid>
        <Grid item sm={12} md={4}>
          <CardProjectDetailProgress data={project}></CardProjectDetailProgress>
        </Grid>
        <Grid item sm={12} md={12}>
          <TableProjectDetailTask data={project.Task}></TableProjectDetailTask>
        </Grid>
      </Grid>
      <Grid mt={2} container>
        <Grid item md={12} display={'flex'} justifyContent={'end'} flexDirection={'row'}>
          <Button
            onClick={e => {
              router.push('/project-edit')
            }}
            size='medium'
            variant={'contained'}
            sx={{ margin: 2 }}
          >
            Edit
          </Button>

          {/* <Link onClick={e => router.push('/project-edit')}>
            <Button onClick={handleEdit} size='medium' variant={'contained'} sx={{ margin: 2 }}>
              Edit
            </Button>
          </Link> */}
          <Button onClick={handleDelete} size='medium' variant={'contained'} sx={{ margin: 2 }}>
            Delete
          </Button>
          <Button onClick={handleArchieve} size='medium' variant={'contained'} sx={{ margin: 2 }}>
            Archieve
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectDetailsViews
