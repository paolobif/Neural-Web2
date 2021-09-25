import React, {useState, useEffect} from 'react'

function SidebarItem({ filename, selected, setSelected, key}) {
  const [clicked, setClicked] = useState(false)

  const handleClick = (e) => {
    if (selected.includes(filename)) {
      const removed_ar = selected.filter(item => item !== filename)
      setSelected(removed_ar)
    } else {
      setSelected([...selected, filename])
    }
  }

  useEffect(() => {
    setClicked(selected.includes(filename))
  }, [selected])

  return (
    <div className="mt-2 ms-3 fs-12">
      <div className='d-flex justify-content-between align-items-center'>
        <a 
          style={clicked ? { ...style, color: "#5bc0de"} : style }
          href="#" 
          onClick={handleClick}>{filename}
        </a>
        {clicked ? <div className="" style={checked}></div> : null}
      </div>
    </div>
  )
}

export default SidebarItem


const style = {
  textDecoration: "none",
  borderRadius: "2px",
  color: "white",
  padding: "2px",
  paddingLeft: "5px",
  paddingRight: "15px"
}

const checked = {
  width: "12px",
  height: "12px",
  borderRadius: "100%",
  backgroundColor: "white",
  marginRight: "30px",
 
}

// #20c997 teal
