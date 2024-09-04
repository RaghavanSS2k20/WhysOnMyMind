export const BindLikedAndPinnedPosts = async (allPosts)=>{
    const pinnedPostRes = await fetch(`https://whysonmymind-backend-production.up.railway.app/api/user/get/pinnedposts`, {
    credentials: 'include',
  });

  const likedPostRes = await fetch("https://whysonmymind-backend-production.up.railway.app/api/user/get/liked", {
    credentials: 'include',
  });

  if (pinnedPostRes.status === 401) {
    return {
        allPosts:allPosts,
        isAuthenticated:false
    }
  }

  const userPinnedP = await pinnedPostRes.json();
  let userLiked = await likedPostRes.json();

  const userPinnedPosts = [...new Set(userPinnedP.pinned)];
  userLiked = [...new Set(userLiked.post)];
  console.log("user pinned posts , ",userPinnedPosts)

  allPosts.forEach((post) => {
    post.isPinned = userPinnedPosts.includes(post._id.trim());
    post.isLikedByUser = userLiked.includes(post._id.trim());
  });
  allPosts.forEach((post)=>{
    console.log("is post inned?? ", post.isPinned)
  })
  return {
    allPosts:allPosts,
    isAuthenticated:true
};
}