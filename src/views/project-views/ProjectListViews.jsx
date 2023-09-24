// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/dist/client/router'
import { styled } from '@mui/material/styles'

// icon

import CardProjectDetails from 'src/views/cards/CardProjectDetails'

const ProjectListViews = props => {
  const [gaji, setGaji] = useState(0)
  const cardPRef = useRef([{ id: 1 }])
  const [cardP, setCardP] = useState(
    props.data.map(data => {
      return {
        ...data
      }
    })
  )
  console.log(props.data)
  console.log('asd')
  console.log('asds')
  console.log(cardP)

  // useEffect(() => {
  //   setCardP([{ id: 1 }])
  // }, [])

  // useEffect(() => {
  //   const sum = cardP.reduce((acc, item) => {
  //     const kegiatan = Kegiatan.find(kegiatan => kegiatan.id === item.id)
  //     return kegiatan.totalGaji + acc
  //   }, 0)
  //   setGaji(sum)
  // }, [cardP])

  // const handleTanda = keg => {
  //   setCardP([
  //     ...cardP,
  //     {
  //       id: keg
  //     }
  //   ])
  // }
  const handleTandaRef = id => {
    cardPRef.current = [...cardPRef.current, { id }]
  }

  return (
    <>
      <Grid container spacing={6}>
        {cardP.map(kegiatan => (
          <>
            <Grid key={kegiatan.id} item md={6} xs={12}>
              <CardProjectDetails
                id={kegiatan.id}
                namaKegiatan={kegiatan.project.title}
                intervalWaktu={kegiatan.project.rentangWaktu}
                tanggalDimulai={kegiatan.project.startdate}
                tanggalBerakhir={kegiatan.project.enddate}
                jumlahParicipant={kegiatan.project.UserProject}
                totalSubKegiatan={kegiatan.project.Task}
                totalGaji={kegiatan.totalGaji}
              ></CardProjectDetails>
            </Grid>
          </>
        ))}
        <Grid item md={6} xs={12}>
          <Typography>{gaji}</Typography>
          {/* {cardP.map(item => {
            const keg = Kegiatan.find(kegiatan => kegiatan.id === item.id)
            return (
              <>
                <li>
                  {item.id}&{keg.namaKegiatan}
                </li>
              </>
            )
          })} */}
          {/* {cardPRef.current.map(item => {
            const keg = Kegiatan.find(kegiatan => kegiatan.id === item.id)
            return (
              <>
                <li>
                  {item.id}&{keg.namaKegiatan}
                </li>
              </>
            )
          })} */}
          {/* {cardP.map(item => (
            <li>{item.id}</li>
          ))} */}
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectListViews
