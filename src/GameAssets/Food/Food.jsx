import React, { useEffect,useState } from 'react'
import "./Food.css"
import foodImage from "./food.png"

export default function Food(props) {

  const [gotEaten, setgotEaten] = useState(false)

  useEffect(()=>{
      if(props.preyLocation[0]===props.location[0] && props.preyLocation[1]===props.location[1])
      {
        setTimeout(() => {
          props.incrementScore()
        }, 500);

        setgotEaten(true)
        if(gotEaten){
          setTimeout(()=>{
  
            props.ChangeFoodLocation(props.index)

            setTimeout(() => {
              setgotEaten(false)
            }, 500);

          },1000)

        }

      }

      
  },[props.preyLocation,gotEaten])


  return (
    <>
      {!gotEaten&&
        <div className='food-material bg-red-500' style={{top:`${props.location[0]}cm`,left:`${props.location[1]}cm`}}>
          <img src={foodImage} style={{width:"100%",height:"100%"}}/>
        </div>
      }
    </>
  )
}
