import AuthOverlay from "@/components/auth/Auth";
import editStyles from "../styles/Edit.module.css"
import { useRouter } from "next/router";
import { useEffect } from "react";
const Auth = (props)=>{
   
    const router = useRouter();

  useEffect(() => {
    // This effect will run on the client side after the initial render
    if (props.isLoggedIn) {
      console.log("hukum NextJS ka hukum");
      router.back();
    }
  }, [props.isLoggedIn]);

  if (!props.isLoggedIn) {
    return (
      <div className={editStyles.container}>
        <AuthOverlay isOpen={true} />
      </div>
    );
  }

  return null; // If logged in, return null or some other content
    
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