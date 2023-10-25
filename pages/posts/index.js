import Post from "@/components/Post";
import NavBar from "@/components/Navbar";
import { NextSeo } from "next-seo";

// import testCookie from "@/components/auth/CookieTest";
// import {cookies} from 'next/headers'
import AllPostStyles from '../../styles/allpost.module.css'
const AllPosts = ({allPosts, isAuthenticated})=>{
  return (
    <>
     <NextSeo
            title="Read @WhyOnM"
            description="Explore the 'WhysOnMyMind' blog on WhyOnM.com to discover a world of intriguing thoughts and ideas. Engaging posts on a wide range of topics that answer the question, 'Why should it be on my mind while it can be here?' await your curiosity. Join our community and let inspiration take center stage."
        />
    <NavBar/>
    <div className={AllPostStyles.posts}>
      {allPosts.map((post) => (
  isAuthenticated ? (
    <Post
      key={post._id}
      post={post}
      isPostPinned={post.isPinned}
      isPostLikedByUser={post.isLikedByUser}
    />
  ) : (
    <Post key={post._id} post={post} />
  )
))}
    </div>
    </>
  );
}
export async function getServerSideProps(context) {
  
  const {req} = context
  console.log("cookies are this da ",cookies.get('connect.sid')) 
  
  // Fetch your posts data
  const res = await fetch('https://whyonm-api.onrender.com/api/post/',{
    credentials:'include'})
 
  const posts = await res.json()
 
  const allPosts = posts.posts
  if(req){
  const pinnedPostRes = await fetch(`https://whyonm-api.onrender.com/api/user/get/pinnedposts`,
  {credentials:'include',
  headers: {
    Cookie: req.headers.cookie,
  }
    }
  )
  if(pinnedPostRes.status === 401){
    return {
      props:{
        allPosts:allPosts,
        isAuthenticated:true
      }
    }
  }
  const likedPostRes = await fetch("https://whyonm-api.onrender.com/api/user/get/liked",{credentials:'include',
  headers: {
    Cookie: req.headers.cookie,
  }
    })
  
  const userPinnedP = await pinnedPostRes.json();
  let userLiked = await likedPostRes.json() 
  
  const userPinnedPosts = [...new Set(userPinnedP.pinned)];
  userLiked = [...new Set(userLiked.post)]

 
  if(pinnedPostRes.ok && userPinnedPosts){
  
  
    allPosts.forEach((post) => {
      
      post.isPinned = userPinnedPosts.includes(post._id.trim());
    });
  
}
if(likedPostRes.ok && userLiked){
  allPosts.forEach((post)=>{
    post.isLikedByUser = userLiked.includes(post._id.trim());
    
  })
}
  }

 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      allPosts:allPosts,
      isAuthenticated:true
    },
  }
}
export default AllPosts