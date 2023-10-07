import AuthOverlay from "@/components/auth/Auth";
import editStyles from "../styles/Edit.module.css"
import { useRouter } from "next/router";
const Auth = (props)=>{
    const router = useRouter()
    if(props.isLoggedIn){
            console.log("hukum NextJS ka hukum")
            router.back()
    }
    else{
        return(
            <div className={editStyles.container}>
            <AuthOverlay isOpen={true}/>
            </div>

        )
    }
    
}
export default Auth
export const getServerSideProps = async (context)=>{
    const {req} = context
    let response = null
    try{
        const uri = process.env.backendUrl+"api/user/get/current"
         response = await fetch(uri,{
            credentials:'include',
            headers:{
                Cookie:req.headers.cookie,
            },
        })
        
    }catch(e){
        console.log(e)

    }
    if(response.ok){
        const user = await response.json()
        if(user){
            return{
                props:{
                    isLoggedIn : true,
                }
            }
        }else{
            return{
                props:{
                    isLoggedIn : false,
                }
            }

        }
    }else if(response.status == 401){
        console.log("hii")
        return{
            props:{
                isLoggedIn : false,
            }
        }

    }
    else{
        console.log(response)
        return{
            redirect: {
                permanent: false,
                destination: "/test",
              },
              
        }
    }
}