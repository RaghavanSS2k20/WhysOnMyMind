import { useRouter } from "next/router"
const pinBoard = ()=>{
    return(
        <>Hii</>
    )
}
export const getServerSideProps = async(context)=>{
    const {req} = context
    const uri = process.env.backendUrl+'/api/user/get/pinnedposts?asObject=true'
    const response = await fetch(uri,{
        credentials:'include',
        headers: {
            Cookie: req.headers.cookie,
          },    
    })
    if(response.status ===401){
        return{
            redirect: {
                destination: '/',
                permanent: false, // Set to true if it's a permanent redirection
            },
        }
    }
    const data = await response.json()
    const pinnedPosts = data.pinnedposts
    

}
