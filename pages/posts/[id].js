import MarkdownWithOverlay from "@/utils/MdWithOverlay";
import contentpagestyles from '../../styles/postpage.module.css';
import NavBar from "@/components/Navbar";
import { getAllPostsData } from "@/post/lib/GetAllPost";
 // Correct the import
 import { getPostById } from "@/post/lib/GetPost";
import { useRouter } from "next/router";

export default function Posts({ post }) {
    return (
        <>
            <NavBar />
            <div className={contentpagestyles.pagecontainer}>
                <div className={contentpagestyles.contentcontainer}>
                    <MarkdownWithOverlay markdownContent={post.content} />
                </div>
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
    
    return {
        props: {
            post
        }
    };
}
