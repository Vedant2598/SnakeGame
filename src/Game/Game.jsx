import React, { useEffect, useState } from "react"
import "./Game.css"
import Snake from "../GameAssets/Snake/Snake"
import Food from "../GameAssets/Food/Food"
import Tail from "../GameAssets/Tail/Tail"


export default function Game() {

    // CONTROLS
    const [top, settop] = useState(7)
    const [left, setleft] = useState(7)
    const [key, setkey] = useState("None")
    const [movementSpeed, setmovementSpeed] = useState(0.5)
    
    //GAME SETTINGS
    const [pause, setpause] = useState(false)
    const [gameOver, setgameOver] = useState(false)
    const [gameTime, setgameTime] = useState(40)
    
    //FOOD SETTINGS
    const [foodQuantity, setfoodQuantity] = useState(0)
    const [MaxFood, setMaxFood] = useState(2)
    const [foodDimension, setfoodDimension] = useState([])

    //SCORE
    const [score, setscore] = useState(0)

    //SNAKE
    const [tail, settail] = useState([1])
    const [tailDisable, settailDisable] = useState(true)
    let previousTailLength=null


    const generate=()=>{
            
            if(foodQuantity<MaxFood){
                
                let top_=Math.floor(Math.random()*14)
                let left_=Math.floor(Math.random()*14)
                
                let valid=foodDimension.length<=MaxFood
                
                if(valid){
                    foodDimension.push([top_,left_])
                    setfoodQuantity(foodQuantity+1)
                }
            }

    }
    
 

    const ChangeFoodLocation=(index)=>{

        let top_=Math.floor(Math.random()*14)
        let left_=Math.floor(Math.random()*14)
        foodDimension[index]=[top_,left_]
    }

    const arrayErrorFixed=()=>{
        let difference=tail.length-score-1
        if(difference>-1){
            tail.splice(0,difference)
        }
    }

    const incrementScore=()=>{
        setscore(score+1)
        settailDisable(true)
        
        previousTailLength=tail.length
        settail((prev)=>[...prev,1])
        
        settailDisable(false)
        
    }

    

    const setTogameOver=()=>{
        setgameOver(true)
    }

    const retryGame=()=>{
        settop(7)
        setleft(7)
        setscore(0)
        settail([1])
        setgameOver(false)
    }


    useEffect(()=>{
        let intervals=setInterval(()=>{
            if(!gameOver && !pause){

                handleDirections()
                arrayErrorFixed()
                generate()
            }
        },gameTime)
        
    
        return()=>{
            clearInterval(intervals)
        }
    })

    const handleDirections=()=>{
        // console.log(key,top,left)
        switch(key){
            case "ArrowUp":
                
                if(top>0){
                    settop(top-movementSpeed)
                }else if(top<=1){
                    settop(15)
                }
                break
            
            case "ArrowDown":
                if(top<15){
                    settop(top+movementSpeed)
                }else if(top>14){
                    settop(0)
                }
                break
            
            case "ArrowLeft":
                if(left>0){
                    setleft(left-movementSpeed)
                }else if(left<=1){
                    setleft(15)
                }
                break

            case "ArrowRight":
                if(left<15){
                    setleft(left+movementSpeed)
                }else if(left>14){
                    setleft(0)
                }
                break

            default:
                break   
        }
    }


   const handleKeys=(e)=>{
    // console.log(e.key)
    switch(e.key){
        case "ArrowUp":
            if(key!=="ArrowDown")
            {
                setkey("ArrowUp")
            }
            break

        case "ArrowDown":
            if(key!=="ArrowUp")
            {
                setkey("ArrowDown")
            }
            break

        case "ArrowLeft":
            if(key!=="ArrowRight")
            {
                setkey("ArrowLeft")
            }
            break

        case "ArrowRight":
            if(key!=="ArrowLeft")
            {
            setkey("ArrowRight")
            }
            break   

        case "Enter":
            setgameOver(!gameOver)
            break
        
        

        default:
            break   
    }

   }

  return (
    <>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>

        <div style={{width:"16cm"}}><b className="text-gray-400 font-semibold" style={{fontSize:"0.65cm"}}>Score : {score}</b></div>
        <div className="map-level-0" onKeyDown={handleKeys} tabIndex={0}>
            

            <Snake left={left} top={top}/>

            {foodDimension.map((location,index)=>
            (
                
                <Food location={location} preyLocation={[top,left]} index={index}
                ChangeFoodLocation={ChangeFoodLocation} incrementScore={incrementScore}/>
            ))
            }
            
            {tail.map((item,index)=>(
                <>
                    {tail.length>0&&
                        <>
                        {!tailDisable&&
                            <Tail top={top} left={left} gameTime={gameTime} index={index} movementSpeed={movementSpeed} setTogameOver={setTogameOver}/>
                        }
                        </>
                    }
                </>
            ))
            }

            {gameOver&&
            <>
                <div className="game-over-screen" style={{fontSize:"0.65cm"}}>
                    GAME IS OVER
                    <button className="bg-slate-600 px-3 py-3 hover:bg-slate-500 rounded-lg" onClick={retryGame}>Retry</button>
                </div>
            </>

            }
        
        </div>
    </div>
    </>
  )
}
