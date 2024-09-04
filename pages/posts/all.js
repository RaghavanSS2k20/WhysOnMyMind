import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';

import '@blueprintjs/core/lib/css/blueprint.css';

export default function All({allPosts}){
    const posts = allPosts
    return(
       
        
            // <ul>
            //   {posts.map((post) => (
            //     <>
            //     <li>{post.title}</li>
            //     <li>{post.content}</li>
            //     <li>{post.createdAt}</li>
            //     </>
            //   ))}
            // </ul>
            <>
            {posts.map((post)=>
            (
            <Card interactive={true} key={post.id}>
              <h3>{post.title}</h3>
              <p>{post._id}</p>
              <p>{post.content}</p>
              <p>{post.createdAt}</p>

            </Card>))}
            </>
            
          
        
    )
}
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://whysonmymind-backend-production.up.railway.app/api/post/',{credentials:'include'})
    console.log("Rsult is here!!!")
    const posts = await res.json()
    console.log(posts)
    const allPosts = posts.posts
   
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        allPosts,
      },
    }
  }