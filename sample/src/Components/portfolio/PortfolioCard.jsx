import react from "react"
// import Skill from "../Skill"
import  "./PortfolioCard.css"
import a from '../../assets/html.png'
import b from '../../assets/css.png'
import c from '../../assets/js.webp'
import d from '../../assets/react.webp'
// import  from '../../assets/node1.png'
import e from '../../assets/node1.png'
import f from '../../assets/mongo.png'
import g from '../../assets/ex.png'
import h from '../../assets/python.png'
import i from '../../assets/flutter.png'
import j from '../../assets/kotlin.png'


//card for skills to be shown


// import { useState } from "react"

function card(){
   const value = [
  { id: "1", title: "HTML", image: a, completion: 100 },
  { id: "2", title: "CSS", image: b, completion: 99 },
  { id: "3", title: "JAVASCRIPT", image: c, completion: 85 },
  { id: "4", title: "REACT", image: d, completion: 90  },
  { id: "5", title: "NODEJS", image: e, completion: 70 },
  { id: "6", title: "MONGODB", image: f, completion: 65 },
  { id: "7", title: "EXPRESS JS", image: g, completion: 60 },
  { id: "8", title: "PYTHON", image: h, completion: 90 },
  { id: "9", title: "FLUTTER", image: i, completion: 10 },
  { id: "10", title: "KOTLIN", image: j, completion: 20 },
];

    const final = value.map((x) => (
  <div key={x.id} className="skillcard" style={{ '--progress': `${x.completion}%` }}>
    <div className="progress-bar">
      <span>{x.completion}%</span>
    </div>
    <h1>{x.title}</h1>
    <div className="skillimage">
      <img src={x.image} alt={x.title} />
    </div>
  </div>
));
 
    return(
        <>
        <div className="skill" id="skill">
         <h1 style={{color:"rgb(230, 230, 49)",}} id="head-skill">Skills</h1><br></br>
        <div className="skillshow"> {/*to display the card in flex*/}
           
            {final}  
         </div>
         </div>
        </>
    )
}

export default card