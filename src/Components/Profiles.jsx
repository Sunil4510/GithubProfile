import React from 'react'
import Avatar from './Avatar'
import {useSelector} from 'react-redux'
import {showProfile} from '../actions/actions'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Profiles = () => {
    const navigate= useNavigate();
    const data = useSelector(showProfile)
    const[item,setitem]=useState()
    console.log(item,"done")
    useEffect(() => {
     const res = async()=>{   
     const dat = await fetch(`${data.payload.giveThedata}`);
     console.log(dat)
     const temp = await dat.json();
     console.log(temp)
     setitem(temp)
     }
     res();
    }, [])
    
  
  return (
    <>
    {item &&(
        <div className="rounded-xl shadow-lg mt-6 shadow-black w-6/12 p-2 border-2 m-auto flex items-center justify-between">
          <Avatar login={item.login} avatar_url={item.avatar_url}/>
        <div className="font-normal  p-2 text-xl uppercase space-y-4">
          <h1>Name: <span className="font-bold">{item.name}</span></h1>
          <h1>Public_Repos: <span className="font-bold">{item.public_repos}</span></h1>
          <h1>Public_Gists: <span className="font-bold">{item.public_gists}</span></h1>
          <h1>created_at: <span className="font-bold">{item.created_at}</span></h1>
        </div>
      </div>
    )
    }
    <div className="flex items-center justify-center mt-10">
      <button className="border-2 shadow-lg shadow-black w-20 p-2 uppercase rounded-lg duration-150 hover:bg-black hover:text-white font-bold hover:scale-125" onClick={()=>navigate(-1)}>back</button>
    </div>
    </>
  )
}

export default Profiles