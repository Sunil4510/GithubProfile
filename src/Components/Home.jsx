import React, { useState } from 'react'
import Avatar from './Avatar';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux"
import {showProfile} from "../actions/actions"
const Home = (data) => {
  const dispatch = useDispatch()
  //console.log(data)
  return (
    <div className='m-10'>  
      <div className="flex items-center flex-wrap space-x-10 justify-evenly">
      {data.data && data.data.map((item) =>{
          return (
            <>
            <Link to="/Profile">
            <div onClick={()=>dispatch(showProfile(item.url))}>
              <Avatar key={item.id} login={item.login} avatar_url={item.avatar_url}/>
            </div>
            </Link>
            </>
          )
      })}
      </div>
    </div>
    )
}
export default Home