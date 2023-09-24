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

const Kegiatan = [
  {
    id: 1,
    namaKegiatan: 'Sakernas Semesteran',
    intervalWaktu: 'Semesteran',
    tanggalDimulai: '22/08/2023',
    tanggalBerakhir: '22/12/2023',
    jumlahParicipant: 40,
    totalSubKegiatan: 4,
    totalGaji: 45000000
  },
  {
    id: 2,
    namaKegiatan: 'Susenas Semesteran',
    intervalWaktu: 'Semesteran',
    tanggalDimulai: '12/04/2023',
    tanggalBerakhir: '22/09/2023',
    jumlahParicipant: 10,
    totalSubKegiatan: 2,
    totalGaji: 32000000
  },
  {
    id: 3,
    namaKegiatan: 'Survei Tahunan',
    intervalWaktu: 'Tahunan',
    tanggalDimulai: '22/08/2023',
    tanggalBerakhir: '22/08/2024',
    jumlahParicipant: 80,
    totalSubKegiatan: 8,
    totalGaji: 140000000
  }
]
const ProjectListViews = () => {
  const [gaji, setGaji] = useState(0)
  // const cardPRef2 = useRef(JSON.parse(localStrorage.getItem('cardP')) || [])
  const cardPRef = useRef([{ id: 1 }])
  const [cardP, setCardP] = useState([
    {
      id: 1,
      namaKegiatan: 'Sakernas Semesteran',
      intervalWaktu: 'Semesteran',
      tanggalDimulai: '22/08/2023',
      tanggalBerakhir: '22/12/2023',
      jumlahParicipant: 40,
      totalSubKegiatan: 4,
      totalGaji: 200
    }
  ])

  useEffect(() => {
    setCardP([{ id: 1 }])
  }, [])

  useEffect(() => {
    const sum = cardP.reduce((acc, item) => {
      const kegiatan = Kegiatan.find(kegiatan => kegiatan.id === item.id)
      return kegiatan.totalGaji + acc
    }, 0)
    setGaji(sum)
  }, [cardP])

  const handleTanda = keg => {
    setCardP([
      ...cardP,
      {
        id: keg
      }
    ])
  }
  const handleTandaRef = id => {
    cardPRef.current = [...cardPRef.current, { id }]
    // localStorage.setItem('cardP', JSON.stringify(cardpRef.current))
  }

  return (
    <>
      <Grid container spacing={6}>
        {Kegiatan.map(kegiatan => (
          <>
            <Grid item md={6} xs={12}>
              <CardProjectDetails
                id={kegiatan.id}
                namaKegiatan={kegiatan.namaKegiatan}
                intervalWaktu={kegiatan.intervalWaktu}
                tanggalDimulai={kegiatan.tanggalDimulai}
                tanggalBerakhir={kegiatan.tanggalBerakhir}
                jumlahParicipant={kegiatan.jumlahParicipant}
                totalSubKegiatan={kegiatan.totalSubKegiatan}
                totalGaji={kegiatan.totalGaji}
                justt={handleTanda}
                // justt={handleTandaRef}
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
