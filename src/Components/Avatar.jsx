import React from 'react'

const Avatar = ({login,avatar_url}) => {
  return (
    <div className='flex items-center space-x-2 w-80 h-80 cursor-pointer hover:text-blue-400 uppercase'>
        <img src={avatar_url} alt="profile" className='w-40 h-40 rounded-full'/>
        <h1 className='text-xl mb-24'>{login}</h1>
    </div>
  )
}

export default Avatar