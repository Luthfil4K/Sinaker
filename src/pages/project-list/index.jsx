// view

import ProjectListViews from 'src/views/project-views/ProjectListViews'
import prisma from '../../services/db'
import { useState, useEffect, useRef } from 'react'

const ProjectList = ({ data }) => {
  const [projects, setProjects] = useState(JSON.parse(data))
  console.log(projects)
  console.log('asd')
  // useEffect(() => {
  //   setProjects(JSON.parse(data))
  //   setTimeout(() => {
  //     console.log(projects)
  //     console.log('asd')
  //   }, [1000])
  // }, [data])
  return (
    <>
      <ProjectListViews data={JSON.parse(data)} />
    </>
  )
}

export async function getServerSideProps() {
  let projects

  projects = await prisma.userProject.findMany({
    select: {
      project: {
        select: {
          id: true,
          title: true,
          rentangWaktu: true,
          startdate: true,
          enddate: true,
          description: true,
          isArchived: true,
          projectLeader: true,
          UserProject: true,
          Task: true
        }
      }
    }
  })

  // projects = await prisma.project.findMany({
  //   select: {
  //     id: true,
  //     title: true,
  //     rentangWaktu: true,
  //     startdate: true,
  //     enddate: true,
  //     description: true,
  //     isArchived: true,
  //     createdById: true,
  //     projectLeaderId: true
  //   }
  // })

  return {
    props: {
      data: JSON.stringify(projects)
    }
  }
}

export default ProjectList
