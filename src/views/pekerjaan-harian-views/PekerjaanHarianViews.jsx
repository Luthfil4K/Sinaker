// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import

import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/dist/client/router'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'

import TablePekerjaanHarian from 'src/views/pekerjaan-harian-views/TablePekerjaanHarianPages'

// icon
import GridViewIcon from '@mui/icons-material/GridView'
import IconButton from '@mui/material/IconButton'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

const ProjectListViews = props => {
  const cardPRef = useRef([{ id: 1 }])
  const [valueDropDown, setValueDropDown] = useState({
    periode: 1
  })

  const handleDropDown = params => {
    setValueDropDown(valueDropDown => ({
      ...valueDropDown,
      periode: params.target.value
    }))
  }

  const [cardP, setCardP] = useState(
    props.data.map(data => {
      return {
        ...data
      }
    })
  )

  const [periode, setPeriode] = useState(1)

  useEffect(() => {
    setPeriode(valueDropDown.periode)
  }, [valueDropDown])

  const handleTandaRef = id => {
    cardPRef.current = [...cardPRef.current, { id }]
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6}></Grid>
        <Grid item md={6} display={'flex'} justifyContent={'end'}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-helper-label'>Periode</InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={valueDropDown.periode}
              label='Periode'
              size={'small'}
              onChange={handleDropDown}
            >
              <MenuItem value={1}>Hari Ini</MenuItem>
              <MenuItem value={2}>Bulan Ini</MenuItem>
              <MenuItem value={3}>Tahun Ini</MenuItem>
              <MenuItem value={4}>--Semua--</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} mt={5}>
          {' '}
          <Grid container spacing={6}>
            {cardP.length > 0 ? (
              <>
                <TablePekerjaanHarian data={cardP} periode={periode}></TablePekerjaanHarian>
              </>
            ) : (
              <>
                <Grid item md={12} xs={12}>
                  <Typography>Belum Ada Pekerjaan Hari Ini </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectListViews
