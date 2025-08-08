import React from 'react'
import  bp from '../../../assets/html images/bp.jpeg'
import  ca from '../../../assets/html images/ca.jpeg'
import  hulk from '../../../assets/html images/hulk.jpeg'
import  im from '../../../assets/html images/im.jpeg'
import  sm from '../../../assets/html images/sm.jpeg'
import  thor from '../../../assets/html images/thor.jpeg'
import  './cardhover.css'

function cardhover() {
  return (
   <>
         <div class="card-container">
            <h1>marvel</h1>
        <div class="top">
       
                <img src={bp} alt="" />
                <img src={ca} alt="" />
                <img src={hulk} alt="" />
                <img src={im} alt="" />
                <img src={sm} alt="" />
                <img src={thor} alt="" />
       
        </div>
    </div>
   
   </>
  )
}

export default cardhover