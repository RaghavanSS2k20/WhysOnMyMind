import { useState } from "react";
const testCookies = ({ckies})=>{
  const [cookies, setCookies] = useState(ckies.cookies)
 
  
  return(
    <h1>{cookies?cookies:'please wait'}</h1>
  )
}
export async function getServerSideProps(context){
  const {req} = context
  const res = await fetch('https://whyonm-api.onrender.com/api/cookies',{
    credentials:'include',
    headers:{
      Cookie: req.headers.cookie,
    }
  })
  const cokies = await res.json()
  return{
    props:{
      ckies:cokies.cookies
    }
  }
}
export default testCookies