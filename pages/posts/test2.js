import { useState , useEffect} from "react";
const testCookies = ()=>{
  const [cookies, setCookies] = useState(null)
  useEffect(()=>{
    const petch = async ()=>{
    const res = await fetch('https://whysonmymind-backend-production.up.railway.app/api/cookies',{
      credentials:'include',
      // headers:{
      //   Cookie: req.headers.cookie,
      // }
    })
    const cokies = await res.json()
    console.log(cokies)
    setCookies(cokies.cookies)
  }
petch()
  },[])

  

  
  return(
    <h1>{cookies?"sunni":'please wait'}</h1>
  )
}
// export async function getServerSideProps(context){
//   const {req} = context
//   const res = await fetch('https://whysonmymind-backend-production.up.railway.app/api/cookies',{
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