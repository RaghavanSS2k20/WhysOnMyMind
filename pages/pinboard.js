import { useEffect, useState } from "react";
import Post from "@/components/Post";
import AllPostStyles from "../styles/allpost.module.css";
import PinboardStyles from "../styles/pinboard.module.css";
import NavBar from "@/components/Navbar";
import { useRouter } from "next/router";
import WhysOnMyMindLoader from "@/components/WhysOnMyMindLoader";
const PinBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPinnedPosts = async () => {
      try {
        const uri = `${process.env.backendUrl}api/user/get/pinnedposts?asObject=true`;
        const response = await fetch(uri, {
          credentials: 'include',
          headers: {
            Cookie: document.cookie,
          },
        });

        if (response.status === 401) {
          router.push('/');
          return;
        }

        const data = await response.json();
        const pinnedPosts = data.pinnedposts;
        const user = data.user;

        if (pinnedPosts) {
          pinnedPosts.forEach(post => {
            post.isPinned = true;
          });

          let userLiked = user.likedPost;
          userLiked = [...new Set(userLiked)];

          if (userLiked) {
            pinnedPosts.forEach(post => {
              post.isLikedByUser = userLiked.includes(post._id.trim());
            });
          }
        }

        setPosts(pinnedPosts);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch pinned posts", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPinnedPosts();
  }, [router]);

  if (isLoading) {
    return <WhysOnMyMindLoader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const pageStyle = {
    background: 'repeating-linear-gradient(233deg, rgba(89, 88, 88, 0.25), rgba(89, 88, 88, 0.25) 1px, transparent -19px, transparent 2px)',
  };

  return (
    <>
      <NavBar />
      <div style={pageStyle}>
        <div className={PinboardStyles.container}>
          <div className={PinboardStyles.herotext}>"Soft Board Diaries: Your Pinned Posts Unfold"</div>
        </div>
        <div className={PinboardStyles.posts}>
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              isPostPinned={post.isPinned}
              isPostLikedByUser={post.isLikedByUser}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PinBoard;
