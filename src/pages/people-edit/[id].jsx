import { useState } from 'react'
import prisma from '../../services/db'

import PeopleEditViews from 'src/views/people-views/PeopleEditViews'

const peopleEdit = ({ data }) => {
  const [pegawai, setPegawai] = useState(JSON.parse(data))
  return (
    <>
      <PeopleEditViews data={pegawai}></PeopleEditViews>
    </>
  )
}

export async function getServerSideProps(context) {
  const users = await prisma.user.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      UserProject: true,
      taskToDo: true
    }
  })

  return {
    props: {
      data: JSON.stringify(users)
    }
  }
}

export default peopleEdit