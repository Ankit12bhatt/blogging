import React from 'react'
import "./contact.css";
function Contact() {
  return (
      <div className='write'>
    <div className="writeFormGroup">
    <textarea
      placeholder="Please enter anything you want to mail..."
      type="text"
      className="writeInput writeText"
    //   onChange={e=>setDesc(e.target.value)}
    ></textarea>
    <button  type="submit" >
          Send Mail
        </button>
  </div>
  </div>
  )
}

export default Contact