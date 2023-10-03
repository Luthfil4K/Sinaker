import * as React from 'react'
import { useState, useEffect } from 'react'
import prisma from '../services/db'

// ** MUI Imports
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// ** MUI chart
// import { BarPlot } from '@mui/x-charts/BarChart'
// import { ChartContainer } from '@mui/x-charts/ChartContainer'

// Chart js
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)

import LinearProgress from '@mui/material/LinearProgress'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import TabelTaskDashboard from 'src/views/tables/TableTaskDashboard'
import TableTaskDashboard from 'src/views/tables/TableTaskDashboard'

const Dashboard = ({ dataTask }) => {
  const [task, setTask] = useState(JSON.parse(dataTask))
  const dataawal = [12, 19, 3, 5, 2, 3, 8, 10, 6, 7, 14, 12]
  const realisasiAwal = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))

  // SubKegBulan Ini
  // const [taskBulanIni, setTaskBulanIni] = useState({ test: task.map(task=>{

  // })})

  // State Bar
  const [targetBar, setTargetBar] = useState(dataawal)
  const [realisasiBar, setRealisasiBar] = useState(dataawal)
  const [valueDropBar, setvalueDropBar] = useState(0)
  const [tahunBar, SetTahunBar] = useState(2023)

  // State Line
  const [bulan, SetBulan] = useState(1)
  const [valueDropLine, setvalueDropLine] = useState(0)
  const [targetLine, setTargetLine] = useState(realisasiAwal)
  const [realisasiLine, setRealisasiLine] = useState(dataawal)
  const [labelsLine, setLabelsLine] = useState(dataawal)

  // State doughnut
  const [doughnut, setDoughnut] = useState(0)

  // state LineProgress
  const [linearProgress, setLinearProgress] = useState(0)
  const [totalTarget, setTotalTarget] = useState(0)
  const [totalRealisasi, setTotalRealisasi] = useState(0)

  // handle dropdown
  const handleChangeBulan = event => {
    SetBulan(event.target.value)
  }

  const handleChangeBar = event => {
    const untukTarget = []
    const untukRealisasi = []

    for (let value = 2; value <= 7; value++) {
      if (event.target.value === value) {
        let targetAccumulator = 0
        let realisasiAccumulator = 0

        for (let month = 1; month <= 12; month++) {
          let monthlyTarget = 0
          let monthlyRealisasi = 0

          task.forEach(task => {
            if (task.project.fungsi === value && task.month === month && task.year === tahunBar) {
              monthlyTarget += task.target
              monthlyRealisasi += task.realisasi
            }
          })

          targetAccumulator += monthlyTarget
          realisasiAccumulator += monthlyRealisasi

          // console.log('Akumulasi Target:', targetAccumulator)
          // console.log('Akumulasi Realisasi:', realisasiAccumulator)

          untukTarget.push(targetAccumulator)
          untukRealisasi.push(realisasiAccumulator)

          // Mengatur ulang akumulator ke 0 untuk bulan selanjutnya
          targetAccumulator = 0
          realisasiAccumulator = 0
        }

        setTargetBar(untukTarget)
        setRealisasiBar(untukRealisasi)

        break // Keluar dari loop setelah menemukan nilai yang sesuai
      }
    }

    console.log(event.target.value)
    setvalueDropBar(event.target.value)
  }

  const handleChangeBarTahun = event => {
    SetTahunBar(event.target.value)
  }

  const handleChangeLine = event => {
    console.log(event.target.value)
    setvalueDropLine(event.target.value)
  }

  // UE here, refresh data
  const calculateTargetAndRealisasi = () => {
    const untukTarget = []
    const untukRealisasi = []

    let targetAccumulator = 0
    let realisasiAccumulator = 0

    for (let month = 1; month <= 12; month++) {
      let monthlyTarget = 0
      let monthlyRealisasi = 0

      task.forEach(task => {
        if (task.project.fungsi === valueDropBar && task.month === month && task.year === tahunBar) {
          monthlyTarget += task.target
          monthlyRealisasi += task.realisasi
        }
      })

      targetAccumulator += monthlyTarget
      realisasiAccumulator += monthlyRealisasi

      // console.log('Akumulasi Target:', targetAccumulator)
      // console.log('Akumulasi Realisasi:', realisasiAccumulator)

      untukTarget.push(targetAccumulator)
      untukRealisasi.push(realisasiAccumulator)

      targetAccumulator = 0
      realisasiAccumulator = 0
    }

    setTargetBar(untukTarget)
    setRealisasiBar(untukRealisasi)
  }

  useEffect(() => {
    calculateTargetAndRealisasi()
  }, [tahunBar])

  useEffect(() => {
    let hasil = task.reduce(
      (acc, angka) => {
        if (angka.project.fungsi) {
          if (angka.project.fungsi >= 1 && angka.project.fungsi <= 7) {
            acc[angka.project.fungsi - 1]++
          }
        }
        return acc
      },
      [0, 0, 0, 0, 0, 0, 0]
    )
    setDoughnut(hasil)
    console.log(hasil)
  }, [])

  useEffect(() => {
    const untukTargetLine = []
    const untukRealisasiLine = []
    const untukLabelsLine = []
    task.map(task => {
      if (task.month === bulan && task.project.fungsi === valueDropLine) {
        untukTargetLine.push(task.target)
        untukRealisasiLine.push(task.realisasi)
        untukLabelsLine.push(task.title)
      }
    })
    setTargetLine(untukTargetLine)
    setRealisasiLine(untukRealisasiLine)
    setLabelsLine(untukLabelsLine)
    // console.log(bulan + 'ini pas ganti bulan' + valueDropLine)
  }, [bulan])

  useEffect(() => {
    const untukTargetLine = []
    const untukRealisasiLine = []
    const untukLabelsLine = []
    task.map(task => {
      if (task.month === bulan && task.project.fungsi === valueDropLine) {
        untukTargetLine.push(task.target)
        untukRealisasiLine.push(task.realisasi)
        untukLabelsLine.push(task.title)
      }
    })
    setTargetLine(untukTargetLine)
    setRealisasiLine(untukRealisasiLine)
    setLabelsLine(untukLabelsLine)
    console.log(bulan + 'ini pas ganti valuedropline' + valueDropLine)
  }, [valueDropLine])

  // useEffect(() => {
  //   task.map(task => {
  //     task.month == dateSekarang.bulan && task.year == dateSekarang.tahun ? setTaskBulanIni(task) : 0
  //   })
  // }, [dateSekarang])

  useEffect(() => {
    const untukLinearProgress = 0
    let targetLinear = 0
    let realisasiLinear = 0

    task.map(task => {
      targetLinear += task.target
      realisasiLinear += task.realisasi
    })
    untukLinearProgress = 100 * (realisasiLinear / targetLinear)
    setLinearProgress(untukLinearProgress)
    setTotalRealisasi(realisasiLinear)
    setTotalTarget(targetLinear)

    console.log(bulan + 'ini pas ganti valuedropline' + valueDropLine)
  }, [task])

  // data buat chartnya
  const dataBar = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Realisasi',
        data: targetBar,
        backgroundColor: ['rgba(255, 99, 132,1)']
      },
      {
        label: 'Target',
        data: realisasiBar,
        backgroundColor: ['rgba(255, 159, 64,1)']
      }
    ]
  }

  const dataLine = {
    labels: labelsLine,
    datasets: [
      {
        label: 'Target',
        data: targetLine,
        backgroundColor: ['rgba(255, 99, 132, 1)']
      },
      {
        label: 'Realisasi',
        data: realisasiLine,
        backgroundColor: ['rgba(25, 19, 132, 1)']
      }
    ]
  }

  const dataDoughnut = {
    datasets: [
      {
        data: doughnut,
        backgroundColor: [
          'rgba(255, 99, 132,1)',
          'rgba(49, 10, 49,1)',
          'rgba(115, 93, 120,1)',
          'rgba(167, 196, 194,1)',
          'rgba(151, 239, 233,1)',
          'rgba(255, 159, 64,1)'
        ]
      }
    ],

    labels: ['Umum', 'Sosial', 'Produksi', 'Distribusi', 'Nerwilis', 'IPDS']
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Card sx={{ overflowY: 'scroll', padding: 4, height: 250 }}>
                <Typography variant={'h6'}>Tugas bulan ini</Typography>
                <Divider></Divider>
                <TableTaskDashboard data={task}></TableTaskDashboard>
              </Card>
            </Grid>
            <Grid item xs={6} md={6}>
              <Card sx={{ padding: 4, height: 200 }}>
                <Typography variant={'h6'}>Capaian Kegiatan</Typography>
                <Divider></Divider>
                <Grid container spacing={0}>
                  <Grid item md={12} height={60} display={'flex'} justifyContent={'start'} alignItems={'end'}>
                    <Typography variant='h3' color={'primary.dark'}>{`${linearProgress.toFixed(2)}%`}</Typography>
                  </Grid>
                  <Grid item md={12} height={60}>
                    <Grid container spacing={0}>
                      <Grid item md={7}>
                        <Typography mt={5} variant='body2'>
                          Target/Realisasi
                        </Typography>
                      </Grid>
                      <Grid item md={5} display={'flex'} justifyContent={'end'}>
                        <Typography mt={5} variant='body2' color={'primary.dark'}>
                          {totalRealisasi}/{totalTarget}
                        </Typography>
                      </Grid>
                    </Grid>
                    <LinearProgress
                      sx={{ height: 10 }}
                      color='success'
                      value={linearProgress}
                      variant='determinate'
                    ></LinearProgress>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={6} md={6}>
              <Card sx={{ padding: 4, height: 200 }}>
                <Typography variant={'h6'}>Jadwal</Typography>
                <Divider></Divider>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Card sx={{ padding: 2, height: 40 }}>
                <Grid container>
                  <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant={'body2'}>Nama User </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card sx={{ padding: 4, height: 410 }}>
                <Typography variant={'h6'}>Grafik</Typography>
                <Divider></Divider>
                <Doughnut
                  data={dataDoughnut}
                  width={200}
                  height={100}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      },
                      title: {
                        display: true,
                        text: `Total Sub Kegiatan per KF`
                      }
                    }
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid mt={1} container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ padding: 4, height: 350 }}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={8}>
                <Typography variant={'h6'}>Grafik</Typography>
              </Grid>
              <Grid item xs={3} md={2} display={'flex'} justifyContent={'end'} mb={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-helper-label'>Bulan</InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={bulan}
                    label='Bulan'
                    size={'small'}
                    onChange={handleChangeBulan}
                  >
                    <MenuItem value={1}>Januari</MenuItem>
                    <MenuItem value={2}>Februari</MenuItem>
                    <MenuItem value={3}>Maret</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>Mei</MenuItem>
                    <MenuItem value={6}>Juni</MenuItem>
                    <MenuItem value={7}>Juli</MenuItem>
                    <MenuItem value={8}>Agustus</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>Oktober</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>Desember</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} md={2} display={'flex'} justifyContent={'end'} mb={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={valueDropLine}
                    label='Fungsi'
                    size={'small'}
                    onChange={handleChangeLine}
                  >
                    <MenuItem value={2}>Bagian Umum</MenuItem>
                    <MenuItem value={3}>Statistik Sosial </MenuItem>
                    <MenuItem value={4}>Statistik Produksi</MenuItem>
                    <MenuItem value={5}>Statistik Distribusi</MenuItem>
                    <MenuItem value={6}>Neraca Wilayah dan Analisis Statistik</MenuItem>
                    <MenuItem value={7}>Integrasi Pengolahan dan Diseminasi Statistik</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Line datasetIdKey='id' data={dataLine} width={500} height={160} />
            <Divider></Divider>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ padding: 4, height: 450 }}>
            <Grid container spacing={1}>
              <Grid item xs={1} md={8}>
                <Typography variant={'h6'}>Grafik</Typography>
              </Grid>
              <Grid item xs={6} md={2} justifyContent={'end'} display={'flex'}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-helper-label'>Tahun</InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={tahunBar}
                    label='Tahun'
                    size={'small'}
                    onChange={handleChangeBarTahun}
                  >
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2} display={'flex'} justifyContent={'end'} mb={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={valueDropBar}
                    label='Fungsi'
                    onChange={handleChangeBar}
                    size={'small'}
                  >
                    <MenuItem value={2}>Bagian Umum</MenuItem>
                    <MenuItem value={3}>Statistik Sosial </MenuItem>
                    <MenuItem value={4}>Statistik Produksi</MenuItem>
                    <MenuItem value={5}>Statistik Distribusi</MenuItem>
                    <MenuItem value={6}>Neraca Wilayah dan Analisis Statistik</MenuItem>
                    <MenuItem value={7}>Integrasi Pengolahan dan Diseminasi Statistik</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Bar
              data={dataBar}
              width={500}
              height={160}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  title: {
                    display: true,
                    text: `Target dan Realisasi per Fungsi Tiap Bulan Tahun ${tahunBar}`
                  }
                }
              }}
            />
            <Divider></Divider>
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export async function getServerSideProps() {
  // let projects

  let tasks

  tasks = await prisma.task.findMany({
    include: {
      project: true
    }
  })
  return {
    props: {
      dataTask: JSON.stringify(tasks)
    }
  }
}

export default Dashboard
