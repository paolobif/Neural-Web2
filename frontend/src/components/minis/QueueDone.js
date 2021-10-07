import { React, useEffect } from 'react'
import ProgressItem from './ProgressItem'

function QueueDone({ items, status }) {
  
  // useEffect(() => {
  //   console.log("change")
  // }, [items])
  let progress = 100
  if (status == "info") {
    progress = 0
  }

  return (
    <>
      {
        items.map(item => {
          return <ProgressItem item={item} progress={progress} status={status} />
        })
      }
    </>
  )
}

export default QueueDone
