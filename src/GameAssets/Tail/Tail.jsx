import React, { useEffect,useState } from 'react'
import "./Tail.css"
import { useRef } from 'react';

export default function Tail(props) {

    const tailRef=useRef()

    useEffect(()=>{
        


        setTimeout(() => {
            try{

                tailRef.current.style.top=`${props.top}cm`
                tailRef.current.style.left=`${props.left}cm`   
            }catch(e){

            }
            
        }, (props.gameTime)*props.index);
        
        
        setTimeout(() => {
        

                let top_=String(tailRef.current.style.top).replace("cm",'')
                let left_=String(tailRef.current.style.left).replace("cm",'')
                

                if(parseInt(top_)===props.top && parseInt(left_)===props.left && props.index>5){
                    props.setTogameOver()
                }
                // props.setTogameOver(top_,left_,props.index)
                
           
        }, 10);
        
    
    
    },[props.top,props.left])
    
    
  return (
    <div ref={tailRef} className='tail-body bg-slate-200 text-blue-950'></div>
  )
}
