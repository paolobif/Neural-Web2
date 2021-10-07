import { React, useEffect } from 'react'
import ProgressItem from './ProgressItem'

function QueueDone({ items, status }) {
  
  useEffect(() => {
    console.log("change")
  }, [items])

  return (
    <>
    {console.log(items)}
      {
        items.queue.map(item => {
          return <ProgressItem item={item} progress={0} status={status} />
        })
      }
    </>
  )
}

export default QueueDone
