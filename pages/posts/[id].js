import MarkdownWithOverlay from "@/utils/MdWithOverlay";
import contentpagestyles from '../../styles/postpage.module.css';
import NavBar from "@/components/Navbar";
import { useState } from "react";
import {user} from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";
import { getAllPostsData } from "@/post/lib/GetAllPost";
 // Correct the import
 import { getPostById } from "@/post/lib/GetPost";
import { useRouter } from "next/router";


export default function Posts({ post,userData, isAuthenticated }) {
    const router = useRouter()
    const [isPinned, setIspinned] = useState(false)
    const togglePin = ()=>{
        if(!isPinned){
            console.log("post pinned")
            setIspinned(true)
        }else{
            console.log("post unpinned")
            setIspinned(false)
        }
    }
    const getFillColor = () => {
    return isPinned ? 'black' : 'none';
  };
    return (
        <>
            <NavBar />
            <div className={contentpagestyles.pagecontainer}>
            {isAuthenticated ? (
                    <>
                        
                        <div className={contentpagestyles.contentcontainer}>
                            <div style={{ padding: '2%', display:'flex', justifyContent:'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Icon icon="user" />
                                    <span style={{ fontWeight: 700 }}>{userData}</span>
                                </div>
                                <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path 
                                    fill={getFillColor()}
                                    d="M23.1758 6.47908L17.5383 0.805534C16.478 -0.261432 14.6294 -0.272722 13.5479 0.797066C13.2715 1.07369 13.0543 1.41241 12.9585 1.68479C12.0377 3.60702 11.0492 4.81089 9.78018 5.53349L9.4742 5.68168C8.10926 6.36617 6.25221 7.06337 2.82012 7.06337C2.44505 7.06337 2.08548 7.13676 1.74002 7.27789C1.0507 7.56789 0.502786 8.1173 0.214329 8.80778C-0.0663306 9.4977 -0.0663306 10.2701 0.214329 10.9601C0.360975 11.3115 0.566844 11.6248 0.827705 11.8788L5.38925 16.4445L0 23.9993L7.54664 18.6052L12.0969 23.1596C12.3592 23.4263 12.6694 23.638 13.0219 23.782C13.3636 23.9259 13.7306 24 14.1013 24C14.472 24 14.839 23.9259 15.1807 23.782C15.5232 23.643 15.8343 23.4368 16.0959 23.1755C16.3574 22.9142 16.5641 22.6031 16.7036 22.2606C16.8488 21.919 16.9221 21.545 16.9221 21.1767C16.9221 17.7387 17.6187 15.8814 18.3012 14.5138C19.0006 13.1137 20.2316 12.0468 22.1845 11.1068C22.5666 10.9601 22.9036 10.7455 23.187 10.4619C23.7099 9.93049 24.0021 9.21398 24 8.46815C23.9979 7.72231 23.7017 7.00747 23.1758 6.47908ZM15.7758 13.2549C14.6209 15.5737 14.1006 18.0111 14.0907 21.164L2.82012 9.88603C5.83624 9.88603 8.19809 9.41324 10.4288 8.35615L10.7602 8.20796C12.7328 7.22144 14.2402 5.53631 15.5375 2.79692L21.0705 8.51422C18.4436 9.77454 16.7614 11.2804 15.7758 13.2549Z" fill="black"/>
                                </svg>
                                </div>

                            </div>
                            <MarkdownWithOverlay markdownContent={post.content} />
                        </div>
                    </>
                ) : (
                    <>You are not authenticated</>
                )}
            </div>
        </>
    );
}

// export const getStaticPaths = async () => {
//     const paths = await getAllPostsData();

//     return {
//         paths,
//         fallback: false
//     };
// }

export const getServerSideProps = async (context ) => {
    const {id} = context.params
    const {req} = context
    
    const post = await getPostById(req,id); // Correct the function name
    
    if (post.status === 401) {
        console.log("please login");
        
    }
    const postUserId = post.user;
    console.log(postUserId)
    const response = await fetch(`http://localhost:8088/api/user/${postUserId}`,{credentials:'include', headers: {
        Cookie: req.headers.cookie,
      }})
    const data = await response.json()
    
    console.log('response status',response.status)
    if(response.status == 200){
    return {
        props: {
            post,
            userData: data.user.email,
            isAuthenticated:true
        }
    };}
    else if(response.status == 401){
        return{
            redirect: {
                destination: '/',
                permanent: false, // Set to true if it's a permanent redirection
            },
        }
    }

}

