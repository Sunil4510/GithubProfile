// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import Avatar from './Components/Avatar';
// import {Link,Routes,Route} from "react-router-dom";
// import Profiles from './Components/Profiles';
// import {useDispatch} from "react-redux"
// import {showProfile} from "./actions/actions"
// const App = () => {
//   const dispatch = useDispatch()
//   const[input,setinput]=useState();
//   const[pageNumber,setpageNumber]=useState(1);
//   const[data,setdata] = useState([]);
//   const[total,settotal] = useState(0)
//   const[search,setsearch] = useState();
//   const[profile,setprofile] = useState()
//   let flag=false;
//   const handlechange = (e)=>{
//     setinput(e.target.value)
//   }
//   useEffect(() => {
//     flag=false;
//     setdata([])
//     if(input)
//     res1();
//   }, [pageNumber])
 
//   const res1 = async()=>{
//     const dat = await fetch(`https://api.github.com/search/users?per_page=42&page=${pageNumber}&q=${flag?input:search}`);
//     const temp = await dat.json();
//     settotal(temp.total_count)
//     //console.log(temp.items)
//     setdata([])
//     temp.items.map((item)=>{
//       setdata(prev=>[...prev,item])
//     });
//    //console.log(data) 
//   }

//   const res = ()=>{
//     setsearch(input)
//     flag=true;
//     setpageNumber(1);
//     res1();
//   }
//   console.log(profile)
//   return (
//     <div className='m-10'>
//       <input type='text' className='border-2' value={input} onChange={handlechange} />
//       <button onClick={res}>submit</button>

//       <h1>{total}</h1>
//       <div className="flex items-center flex-wrap space-x-10 justify-evenly">
//       {data.map((item) =>{
//           return (
//             <>
//             <div onClick={()=>dispatch(showProfile(item))}>
//             <Link to="/Profile">
//               <Avatar key={item.id} login={item.login} avatar_url={item.avatar_url}/>
//             </Link>
//             </div>
//             </>
//           )
//       })}
//       </div>
//       <div className="flex items-center justify-between">
//          <div>{pageNumber>1&&<button onClick={()=>setpageNumber(pageNumber-1)}>Previous</button>}</div>
//          <div>{search&&<button onClick={()=>setpageNumber(pageNumber+1)}>Next</button>}</div>
//       </div>
//     </div>
   
//   )
// }

// export default App

import React,{ useEffect }from 'react'
import {Routes,Route,useNavigate } from "react-router-dom"
import { useState } from 'react'
import Home from "./Components/Home"
import Profiles from './Components/Profiles'
//import { FcSearch } from "react-icons/fc";
import {ImSearch} from "react-icons/im"

const App = () => {
  let history = useNavigate()
  //console.log(window.location.href);
  const[input,setinput]=useState();
  const[pageNumber,setpageNumber]=useState(1);
  const[data,setdata] = useState([]);
  const[total,settotal] = useState(0)
  const[search,setsearch] = useState();
  const[flag,setflag] = useState(true);
  const btn = "border-2 rounded-xl shadow-xl bg-black text-white uppercase font-bold w-24 text-center p-2 duration-150 hover:bg-white hover:text-black hover:scale-125"
  const handlechange = (e)=>{
    setinput(e.target.value)
  }
  useEffect(() => {
    setflag(false)
    setdata([])
    if(search)
    res1();
  }, [pageNumber])
 
  const res1 = async()=>{
    const dat = await fetch(`https://api.github.com/search/users?per_page=42&page=${pageNumber}&q=${flag?input:search!==undefined?search:input}`);
    const temp = await dat.json();
    settotal(temp.total_count)
   console.log(temp.items)
    setdata([])
    temp.items.map((item)=>{
      setdata(prev=>[...prev,item])
    });
  }
  console.log(data) 

  const res = ()=>{
    setsearch(input)
    setflag(true)
    setpageNumber(1);
    if(input)
    res1();
    history("/")
  }
  const handleKeypress = e => {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    res();
  }
};
  console.log(search,input,flag)
  return (
    <>
    <div className="flex bg-black item-center justify-center w-full border-b-2 border-black h-20">
      <div className="border-2 w-96 my-auto rounded-xl flex item-center justify-between">
        <input type='text' placeholder="Search for user, e.g. Sunilkurapati" className='h-10 flex-1 outline-none font-semibold text-black rounded-md my-auto' value={input} onChange={handlechange} onKeyDown={handleKeypress} />
        <button onClick={res} className='my-auto text-cyan-400 uppercase cursor-pointer p-2 text-2xl rounded-xl'><ImSearch/></button>
      </div>
    </div>

    <div>
      {total!==0 && <h1 className="mx-auto text-center mt-10 bg-yellow-200 rounded-md p-2 w-60 font-bold">{`found: ${total} results`}</h1>}
      <Routes>
        <Route path="/Profile" element={<Profiles/>}/>
        <Route path="/" element={<Home data={data}/>}/>
      </Routes>
      {window.location.href!=="http://sunil4510.github.io/Profile" || window.location.href!=="https://sunil4510.github.io/Profile" && (
        <div className="flex items-center justify-center space-x-10 m-10">
        {pageNumber>1&&(<div className={btn}><button onClick={()=>setpageNumber(pageNumber-1)}>Previous</button></div>)}
        {search&&(<div className={btn}><button onClick={()=>setpageNumber(pageNumber+1)}>Next</button></div>)}
  </div>)}
  </div>
      </>
  )
}

export default App