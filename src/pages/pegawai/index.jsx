import PeopleViews from 'src/views/people-views/PeopleViews'
import prisma from '../../services/db'
import { useState, useEffect, useRef } from 'react'

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

export async function getServerSideProps() {
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
