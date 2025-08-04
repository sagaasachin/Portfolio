import React from 'react'
import './Nav.css'

function Nav(props) {
    
  return (
        <>
           <div className="nav">
                <ul>
                    {/* <h1><a href="#home">Home</a></h1> */}
                    <h1><a href="#about">About Me</a></h1>
                    <h1><a href="#skill">Skills</a></h1>
                    <h1><a href="#cer">Projects</a></h1>
                    {/* <h1><a href="#home">Contact</a></h1> */}
                </ul>
            </div> 

          {/* <div className="content">
              <input type ="text"/>
              <input type ="emails"/>
              <input type="password"/>
              <input type="mobile no"/>
              
          </div> */}
          
          
        </>
  )
}

export default Nav