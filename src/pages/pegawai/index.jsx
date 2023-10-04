import { useState, useEffect } from 'react'
import prisma from '../services/db'
import { getToken } from 'next-auth/jwt'
import PeopleViews from 'src/views/people-views/PeopleViews'

const People = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(data))
  // console.log(user)
  // console.log('asd')
  return (
    <>
      <PeopleViews data={user}></PeopleViews>
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
  let user

  user = await prisma.user.findMany({
    where: {
      id: {
        not: 0
      }
    },
    include: {
      UserProject: true,
      taskToDo: true
    }
  })
  return {
    props: {
      data: JSON.stringify(user)
    }
  }
}

export default People
