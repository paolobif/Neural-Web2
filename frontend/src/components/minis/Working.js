import React from 'react'
import ProgressItem from './ProgressItem'

function Working({ working, progress }) {

  
  return (
    <>
      {
        working[0] ?
        <ProgressItem item={working[0]} progress={progress} status='primary' />:
        null
      }
    </>
  )
}

export default Working
