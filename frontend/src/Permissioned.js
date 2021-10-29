import React from 'react'
import { useHistory } from 'react-router'

function Permissioned({ loggedIn, header, component}) {
  const history = useHistory()

  return (
    <>
      <header />
      <component />
    </>
  )
}

export default Permissioned
