import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MdToHTML from "@/utils/MdtoHTML";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getAllPostsData } from "@/post/lib/GetAllPost";
import contentpagestyles from '../../styles/postpage.module.css'
import OverlayButton from "@/utils/OverLayButton";
import MarkdownWithOverlay from "@/utils/MdWithOverlay";
import ContentSkeletonCard from "@/components/skeletons/ContenteSkeleton";
import NavBar from "@/components/Navbar";
import MultiSelectExample from "@/components/MultiSelectCategory";
const Markdown = dynamic(
    () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
    { ssr: false }
  );




    



  

const test2Content = ()=>{
    

    const [content,setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{

        const fetchContent = async ()=>{
            const cntt = await getAllPostsData()
            setContent(cntt)
            setIsLoading(false);
            console.log(cntt)
        }
        fetchContent()
        

    },[])


  

return(
    <>
    <NavBar/>
    <div className={contentpagestyles.pagecontainer}>
        <div className={contentpagestyles.contentcontainer}>
        
      {isLoading ? (
        <ContentSkeletonCard/>

      ):
      (
        <MarkdownWithOverlay markdownContent={content} />)}
      </div>
    </div>
    </>
)
    
};
export default test2Content