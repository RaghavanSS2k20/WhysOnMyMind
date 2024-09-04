import Post from "@/components/Post";
import NavBar from "@/components/Navbar";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { BindLikedAndPinnedPosts } from "@/lib/post/postUtilFunction";
// import testCookie from "@/components/auth/CookieTest";
// import {cookies} from 'next/headers'
import AllPostStyles from '../../styles/allpost.module.css'
const AllPosts = ({posts})=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allPosts, setAllPosts] = useState(posts)
  useEffect(()=>{
    const setUp = async ()=>{
      const all = await BindLikedAndPinnedPosts(posts);
      console.log("isAuthenticated ? ", all.isAuthenticated)
      setAllPosts(all.allPosts)
      
      setIsAuthenticated(all.isAuthenticated)
    }

    setUp()

  },[])
  
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
  // console.log("cookies are this da ",cookies.get('connect.sid')) 
  
  // Fetch your posts data
  const res = await fetch('https://whysonmymind-backend-production.up.railway.app/api/post/',{
    credentials:'include'})
  console.log(res.status)
  const posts = await res.json()

  const allPosts = posts.posts
  console.log("POSTSS",allPosts[0])
  if(req){
  const pinnedPostRes = await fetch(`https://whysonmymind-backend-production.up.railway.app/api/user/get/pinnedposts`,
  {credentials:'include',
  headers: {
    Cookie: req.headers.cookie,
  }
    }
  )
  if(pinnedPostRes.status === 401){
    return {
      props:{
        posts:allPosts,
        isAuthenticated:false
      }
    }
  }
}

 
  

  

 
  // By returning { props: { posts } }, the Blog component
  
}
export default AllPosts
