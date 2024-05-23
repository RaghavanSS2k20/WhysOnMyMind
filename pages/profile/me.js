import { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import NavBar from "@/components/Navbar";
import { NextSeo } from "next-seo";
export default function Me() {
  const [postedPosts, setPostedPosts] = useState([]);
  const [draftedPosts, setDraftedPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.backendUrl+`api/user/get/current`, {
          credentials: 'include',
         
        });

        if (!response.ok) {
          // throw new Error('Failed to fetch user data');
          console.error("Error while fetch : ", response.status)
          setError("Backend isnt active Yet")
        }

        const data = await response.json();
        const user = data.user;
        console.log("The User is : ", user)
        const userPosts = user.posts || [];
        const postedPosts = userPosts.filter(post => post.status === "POSTED");
        const draftedPosts = userPosts.filter(post => post.status === "DRAFT");

        const userPinnedPosts = [...new Set(user.pinnedPost)];
        const userLiked = [...new Set(user.likedPost)];

        postedPosts.forEach(post => {
          post.isPinned = userPinnedPosts.includes(post._id.trim());
          post.isLikedByUser = userLiked.includes(post._id.trim());
        });

        setPostedPosts(postedPosts);
        setDraftedPosts(draftedPosts);
        setUserData(user);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const title = userData.profileName ? `@${userData.profileName}` : `@${userData.email}`;
  return (
    <>
    <NextSeo 
    title={title}
    description = {userData.bio}
    ></NextSeo>
      <NavBar />
      <Profile
        draftedPosts={draftedPosts}
        postedPosts={postedPosts}
        userData={userData}
        isMe={true}
      />
    </>
  );
}
