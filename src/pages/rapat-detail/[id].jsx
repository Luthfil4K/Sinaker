import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import RapatDetailViews from 'src/views/rapat-views/RapatDetailViews'

const RapatDetail = ({ data }) => {
  const [dataR, setDataR] = useState(JSON.parse(data))
  return (
    <>
      <RapatDetailViews dataPesertaRapat={dataR.userRapat} dataRapat={dataR.rapat} />
    </>
  )
}

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  if (!token) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }
  const rapat = await prisma.meet.findUnique({
    where: {
      id: parseInt(context.params.id)
    }
  })
  const userRapat = await prisma.user_meet.findMany({
    where: {
      meetId: parseInt(context.params.id)
    },
    select: {
      user: true
    }
  })

  const data = { rapat, userRapat }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default RapatDetail
