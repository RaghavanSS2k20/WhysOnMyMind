import { useState , useEffect} from "react";
const testCookies = ()=>{
  const [cookies, setCookies] = useState(null)
  useEffect(()=>{
    const petch = async ()=>{
    const res = await fetch('https://whyonm-api.onrender.com/api/cookies',{
      credentials:'include',
      // headers:{
      //   Cookie: req.headers.cookie,
      // }
    })
    const cokies = await res.json()
    console.log(cokies.cookies)
    setCookies(cokies.cookies)
  }
petch()
  },[])
  

  
  return(
    <h1>{cookies?cookies:'please wait'}</h1>
  )
}
// export async function getServerSideProps(context){
//   const {req} = context
//   const res = await fetch('https://whyonm-api.onrender.com/api/cookies',{
//     credentials:'include',
//     headers:{
//       Cookie: req.headers.cookie,
//     }
//   })
//   const cokies = await res.json()
//   return{
//     props:{
//       ckies:cokies.cookies
//     }
//   }
// }
export default testCookies