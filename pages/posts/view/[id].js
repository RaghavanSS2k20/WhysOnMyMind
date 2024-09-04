import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getPostById } from "@/post/lib/GetPost"
import NavBar from "@/components/Navbar"
import MarkdownWithOverlay from "@/utils/MdWithOverlay"
import contentpagestyles from "../../../styles/postpage.module.css"
import { Icon, Button, Divider , Tooltip, Classes} from "@blueprintjs/core";
import { NextSeo } from "next-seo";
export default function Posts({ post,id,  userData}){
    const router = useRouter()
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [highlights, setHighlights] = useState('')
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
    useEffect(()=>{
        const buckleUp = async ()=>{
           console.log("The requested post id is : ", process.env.backendUrl)
            const uri = process.env.backendUrl+`api/post/get/highlight/${id.trim()}`;
            console.log(uri)
            const highlightedDataResponse = await fetch(uri,{credentials:'include'});
            console.log("Response for Highlights Here : ",highlightedDataResponse.status)
            
            const isPinnedresponse = await fetch(process.env.backendUrl+`api/post/ispinned/${id}`,{
                credentials:'include'
            })
            if(highlightedDataResponse.status === 401){
                setIsAuthenticated(false)

            }else{
            console.log("response status for highlighted fetch : ", highlightedDataResponse.status)
            const highlightedData = await highlightedDataResponse.json()
            console.log(highlightedData.highlights[0].highlightedText)
            setHighlights(highlightedData.highlights[0])
            const pinnedIs = await isPinnedresponse.json()
            console.log("IIIIIIISSSSSSSSSSSSSSSSSSSSSSSS PPPPPPPPPPPPPPPPPPIIIIIIISSSSSSSSSSSSMNNn",pinnedIs.isPinned)
            setIspinned(pinnedIs.isPinned)
            setIsAuthenticated(true)
            }




        }
        buckleUp();
        console.log("podfool its running from useEffect")
    


    },[id])
    
    return(
        <>
        <NextSeo
            title={post.title || "Read Post"}
            description={post.description}
        />
         <NavBar />
         <div className={contentpagestyles.pagecontainer}>
         {
            isAuthenticated ? (
                    <>
                        
                        <div className={contentpagestyles.contentcontainer}>
                            <div style={{ padding: '2%', display:'flex', justifyContent:'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={()=>{router.push(`/profile/${userData.email}`)}}>
                                    <Icon icon="user" />
                                    {userData.profileName? (
                                        <span style={{ fontWeight: 700 }}>{userData.profileName}</span>
                                        ) : (
                                            <span style={{ fontWeight: 700 }}>{userData.email}</span>
                                        )
                                    }
                                   
                                </div>
                                <div>

                                <Button style={{zIndex:100, background:'none',boxShadow:'none'}} onClick={togglePin} icon={<svg width="50px" height="50px" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xmlSpace="preserve">
	                    <path fill={isPinned ? 'black' : 'white'} fill-opacity="1" stroke="black" stroke-width="2" stroke-linejoin="round" d="M 56.1355,32.5475L 43.4466,19.8526C 42.7886,20.4988 42.298,21.2123 41.9749,21.9932C 41.6519,22.7741 41.4903,23.5729 41.4903,24.3895C 41.4903,25.1942 41.6529,25.987 41.9779,26.7679L 34.0577,34.6821C 33.3918,34.3372 32.6991,34.0776 31.9796,33.9032C 31.2601,33.7288 
                      30.5298,33.6415 29.7885,33.6415C 28.623,33.6415 27.4953,33.8526 26.4052,34.2748C 25.315,34.697 24.3419,35.3342 23.4856,36.1865L 30.2344,42.9174L 25.9027,47.9032L 22.6532,51.8425L 20.5988,54.5836C 20.1212,55.2892 19.8823,55.753 19.8823,55.975L 19.8645,56.0701L 19.9002,56.088L 19.9002,56.1474L 19.9358,56.1058L 20.0131,56.1236C 20.2351,56.1236 20.6989,55.8888 21.4045,55.419L 24.1457,53.3765L 28.0849,50.1151L 33.0945,45.7775L 39.8016,52.5025C 40.6579,51.6462 41.2961,50.6731 41.7163,49.5829C 42.1365,48.4928 42.3466,47.367 42.3466,46.2056C 42.3466,45.4603 42.2603,44.729 42.0879,44.0115C 41.9155,43.294 41.6548,42.6003 41.3069,41.9304L 49.2202,34.0161C 50.0011,34.3372 50.7939,34.4978 51.5986,34.4978C 52.4192,34.4978 53.2189,34.3362 53.9979,34.0132C 54.7768,33.6901 55.4894,33.2015 56.1355,32.5475 Z "/>
                  </svg>}/>
                                </div>

                            </div>
                            <Divider/>
                            <MarkdownWithOverlay markdownContent={post.content} postId={post._id} highlights={highlights} />
                        </div>
                    </>
                ) : (
                    <div className={contentpagestyles.contentcontainer}
                    >
                         <div style={{ padding: '2%', display:'flex', justifyContent:'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={()=>{router.push(`/profile/${userData.email}`)}}>
                                    <Icon icon="user" />
                                    {userData.profileName? (
                                        <span style={{ fontWeight: 700 }}>{userData.profileName}</span>
                                        ) : (
                                            <span style={{ fontWeight: 700 }}>{userData.email}</span>
                                        )
                                    }
                                   
                                </div>
                                <div>
                                <Tooltip
               interactionKind="hover"
               position='auto'
               
               popoverClassName={Classes.POPOVER_CONTENT_SIZING}
               content={
                <div>
                    login to pin this post
                </div>
                
                }
                >

                                <Button style={{zIndex:100, background:'none',boxShadow:'none'}}  icon={<svg width="50px" height="50px" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xmlSpace="preserve">
	                    <path fill={isPinned ? 'black' : 'white'} fill-opacity="1" stroke="black" stroke-width="2" stroke-linejoin="round" d="M 56.1355,32.5475L 43.4466,19.8526C 42.7886,20.4988 42.298,21.2123 41.9749,21.9932C 41.6519,22.7741 41.4903,23.5729 41.4903,24.3895C 41.4903,25.1942 41.6529,25.987 41.9779,26.7679L 34.0577,34.6821C 33.3918,34.3372 32.6991,34.0776 31.9796,33.9032C 31.2601,33.7288 
                      30.5298,33.6415 29.7885,33.6415C 28.623,33.6415 27.4953,33.8526 26.4052,34.2748C 25.315,34.697 24.3419,35.3342 23.4856,36.1865L 30.2344,42.9174L 25.9027,47.9032L 22.6532,51.8425L 20.5988,54.5836C 20.1212,55.2892 19.8823,55.753 19.8823,55.975L 19.8645,56.0701L 19.9002,56.088L 19.9002,56.1474L 19.9358,56.1058L 20.0131,56.1236C 20.2351,56.1236 20.6989,55.8888 21.4045,55.419L 24.1457,53.3765L 28.0849,50.1151L 33.0945,45.7775L 39.8016,52.5025C 40.6579,51.6462 41.2961,50.6731 41.7163,49.5829C 42.1365,48.4928 42.3466,47.367 42.3466,46.2056C 42.3466,45.4603 42.2603,44.729 42.0879,44.0115C 41.9155,43.294 41.6548,42.6003 41.3069,41.9304L 49.2202,34.0161C 50.0011,34.3372 50.7939,34.4978 51.5986,34.4978C 52.4192,34.4978 53.2189,34.3362 53.9979,34.0132C 54.7768,33.6901 55.4894,33.2015 56.1355,32.5475 Z "/>
                  </svg>}/>
                  </Tooltip>
                                </div>

                            </div>
                        <Divider/>

                            <MarkdownWithOverlay markdownContent={post.content} postId = {post._id}/>
                    </div>
                )
                }
        </div>


        </>
    )


    

    // const [allPosts, setAllPosts] = useState(pos)
    // const [isPinned, setIspinned] = useState()
}
export const getServerSideProps = async(context)=>{
    const {id}  =  context.params;
    const {req} = context
    const postResponse = await getPostById(req,id);
    
    const post = postResponse.post;
    console.log("POST FROM SERVERSIDEPROPS : ", postResponse)
    
    return{
        props:{
            post:post,
            id:id,
            
            userData : postResponse.userData

        }
    }
    

}