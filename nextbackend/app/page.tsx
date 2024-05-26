'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";


interface User {
  name:string,
  emaile:string
}

export default function Home() {
  const [name, setName ] = useState<string>()
  const [password, setpassword ] = useState<string>()
  const [data, setData] = useState <User>()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    axios.get('/api/user')
    .then((res)=>{setData(res.data)
      setLoading(false)
    })
  },[])

  async function handle(){
   const res =  await axios.post('/api/user',{
      name,
      password
    }) 
    console.log(res.data)
  }

  if(loading){
  return <div className="text-3xl text-center font-bold">Loading...</div>
  }
  return (
    <div className="text-center font-bold">
  Name :{data?.name}

  <hr className="border-b " />

  <div>
    <input type="text"  onChange={(e)=>setName(e.target.value)}/>
    <input type="password" placeholder="passsword" onChange={(e)=>setpassword(e.target.value)}/>
    <button onClick={handle}>submit</button>
  </div>
    </div>
  );
}
