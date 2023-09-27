import prisma from '../../services/db'

import TimelineViews from 'src/views/timeline-views/TimelineViews'
const Timeline = ({ data }) => {
  return (
    <>
      <TimelineViews data={JSON.parse(data)}></TimelineViews>
    </>
  )
}

export async function getServerSideProps() {
  let tasks

  tasks = await prisma.task.findMany({
    include: {
      project: true
    }
  })
  return {
    props: {
      data: JSON.stringify(tasks)
    }
  }
}

export default Timeline
