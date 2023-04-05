import React from 'react'

const EditPopup = (props) => {
  return (
    <div className='popup'>EditPopup
        <div className='popup-inner'>
        <button className='close-btn
        '>Change</button>

        </div>
        {props.children}
    </div>
  )
}

export default EditPopup