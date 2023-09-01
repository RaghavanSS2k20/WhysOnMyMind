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
            <MarkdownWithOverlay markdownContent={post.content} />
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

export const getServerSideProps = async ({ context }) => {
    const id = context.params
    const post = await getPostById(id); // Correct the function name

    if (post.status === 401) {
        console.log("please login");
        return {
            redirect: {
                destination: '/',
                permanent: false // Set to true if you want a permanent redirect (301)
            }
        };
    }
    
    return {
        props: {
            post
        }
    };
}
