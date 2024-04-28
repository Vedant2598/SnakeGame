import React from 'react'
import "./Snake.css"
import face from "./memeFace.jpg"

export default function Snake(props) {
  return (
    <div className='snake-body bg-lime-600' style={{top:`${props.top}cm`,left:`${props.left}cm`}}>
      <img src={face} style={{width:"100%",height:"100%"}}/>
    </div>
  )
}
