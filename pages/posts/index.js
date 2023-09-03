import { Card } from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css';
import PostStyles from '../../styles/allpost.module.css'
import Pin from '../../assets/icons/Vector.svg'
import ReactMarkdown from 'react-markdown';
import ContentImage from '../../assets/Images/contentImage.png'
 import Image from "next/image";
function formatMonthAndYear(createdAt) {
  const date = new Date(createdAt);
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
function truncateText(text, maxLines) {
  if(text)
  {const lines = text.split('.');
  if (lines.length > maxLines) {
    return lines.slice(0, maxLines).join('\n') + '...';
  }
  return text;}
  return text
}
export default function AllPosts({allPosts}){
 
    return(
        <div className={PostStyles.posts}>

           {
            allPosts.map((post)=>
           ( <div  >
            <Card className={PostStyles.post} interactive={true} key={post.id} >
              <div className={PostStyles.postContent}>
                <div className={PostStyles.postHeader}>
                  
                  <h1 style={{flex:2}}>ReactJS vs NextJS Whats the diffrence</h1>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.1758 6.47908L17.5383 0.805534C16.478 -0.261432 14.6294 -0.272722 13.5479 0.797066C13.2715 1.07369 13.0543 1.41241 12.9585 1.68479C12.0377 3.60702 11.0492 4.81089 9.78018 5.53349L9.4742 5.68168C8.10926 6.36617 6.25221 7.06337 2.82012 7.06337C2.44505 7.06337 2.08548 7.13676 1.74002 7.27789C1.0507 7.56789 0.502786 8.1173 0.214329 8.80778C-0.0663306 9.4977 -0.0663306 10.2701 0.214329 10.9601C0.360975 11.3115 0.566844 11.6248 0.827705 11.8788L5.38925 16.4445L0 23.9993L7.54664 18.6052L12.0969 23.1596C12.3592 23.4263 12.6694 23.638 13.0219 23.782C13.3636 23.9259 13.7306 24 14.1013 24C14.472 24 14.839 23.9259 15.1807 23.782C15.5232 23.643 15.8343 23.4368 16.0959 23.1755C16.3574 22.9142 16.5641 22.6031 16.7036 22.2606C16.8488 21.919 16.9221 21.545 16.9221 21.1767C16.9221 17.7387 17.6187 15.8814 18.3012 14.5138C19.0006 13.1137 20.2316 12.0468 22.1845 11.1068C22.5666 10.9601 22.9036 10.7455 23.187 10.4619C23.7099 9.93049 24.0021 9.21398 24 8.46815C23.9979 7.72231 23.7017 7.00747 23.1758 6.47908ZM15.7758 13.2549C14.6209 15.5737 14.1006 18.0111 14.0907 21.164L2.82012 9.88603C5.83624 9.88603 8.19809 9.41324 10.4288 8.35615L10.7602 8.20796C12.7328 7.22144 14.2402 5.53631 15.5375 2.79692L21.0705 8.51422C18.4436 9.77454 16.7614 11.2804 15.7758 13.2549Z" fill="black"/>
                  </svg>

                </div>
                <p>{formatMonthAndYear(post.createdAt)}</p>
               
              <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}><Image src={ContentImage}
               width='307'
               height='157'/>
                </div>
               
               
                
                <div style={{ fontWeight: '500', letterSpacing: '1px', margin: '2%' }}>
                  {truncateText(post.description, 2)}
                </div>
              
                
              </div>
              </Card>
            </div>))
            }
        </div>
    
    )
    

}
export async function getStaticProps() {
  // Fetch your posts data
  const res = await fetch('http://localhost:8088/api/post/',{credentials:'include'})
  console.log(res)
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