import { useRouter } from "next/router"
import Post from "@/components/Post"
import AllPostStyles from "../styles/allpost.module.css"
import PinboardStyles from "../styles/pinboard.module.css"
import NavBar from "@/components/Navbar"
const pinBoard = ({posts})=>{
    const pageStyle = {
        background: 'repeating-linear-gradient(233deg, rgba(89, 88, 88, 0.25), rgba(89, 88, 88, 0.25) 1px, transparent -19px, transparent 2px)'
      };
    return(
        <>
        <NavBar/>
       
            
        <div style={pageStyle}>
            <div className={PinboardStyles.container}>
                <div className={PinboardStyles.herotext}>"Soft Board Diaries: Your Pinned Posts Unfold"</div>
            </div>
        
        <div className={PinboardStyles.posts}>
           
           
       {posts.map((post)=>(
        <Post
            key={post._id}
            post={post}
            isPostPinned={post.isPinned}
            isPostLikedByUser={post.isLikedByUser}

        />
        
        
       ))

       }
       </div>
       </div>
       </>
    )
}
export const getServerSideProps = async(context)=>{
    const {req} = context
    const uri = process.env.backendUrl+'api/user/get/pinnedposts?asObject=true'
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
    const user = data.user;
    if(pinnedPosts){
    pinnedPosts.forEach(post => {
        post.isPinned = true        
    });
    let userLiked = user.likedPost;
    userLiked = [...new Set(userLiked)]
    if(userLiked){
       pinnedPosts.forEach((post)=>{
        post.isLikedByUser = userLiked.includes(post._id.trim())
       })
    }

}
    return{
        props:{posts:pinnedPosts}
    }

    

}
export default pinBoard
