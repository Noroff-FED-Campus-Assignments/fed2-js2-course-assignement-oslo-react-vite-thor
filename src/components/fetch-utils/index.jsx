export function getNewestNonEmptyPosts(posts) {
  // Sort posts by created date

  const sortedPosts = sortPostsDescending(posts);

  // Filter out empty posts or posts with null/undefined body

  const nonEmptyPosts = sortedPosts.filter(
    (post) => post.body && post.body.trim() !== ""
  );

  return nonEmptyPosts;
}

export function sortPostsDescending(posts) {
  // Make a shallow copy of the posts array to avoid mutating the original array

  return [...posts].sort((a, b) => {
    const dateA = new Date(a.created);

    const dateB = new Date(b.created);

    // Ensure the dates are valid before comparing

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      console.warn("Invalid date encountered in one of the posts!");

      return 0;
    }

    return dateB - dateA;
  });
}

export function limitPosts(posts, limit) {
  return posts.slice(0, limit);
}