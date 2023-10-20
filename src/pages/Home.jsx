import { useEffect, useState } from "react";
import { useFetchPosts } from "../components/posts/fetchpost";
import Navigation from "../components/navbar";
import PostForm from "../components/posts/addpost";

export default function PostsPage() {
  const { posts, isLoading, error, fetchData } = useFetchPosts();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [likedPosts, setLikedPosts] = useState({});
  const [pulse, setPulse] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterUser, setFilterUser] = useState("");

  const handleLike = (postId) => {
    setLikedPosts({
      ...likedPosts,
      [postId]: !likedPosts[postId],
    });
    setPulse({
      ...pulse,
      [postId]: true,
    });
    setTimeout(() => {
      setPulse({
        ...pulse,
        [postId]: false,
      });
    }, 700);
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (error)
    return (
      <div className="bg-error">
        <h1>Something went wrong! {error?.message}</h1>
      </div>
    );

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.body

      .toLowerCase()

      .includes(searchQuery.toLowerCase());

    const matchesUser = post.author?.name

      .toLowerCase()

      .includes(filterUser.toLowerCase());

    return matchesSearch && (filterUser === "" || matchesUser);
  });
  return (
    <>
      <header>
        <Navigation />
      </header>
      <section id="hero-home"></section>
      <section id="feed " className="w-full bg-base-100">
        <PostForm />
        <div className="min-h-screen md:container md:mx-auto flex sm:flex-col flex-wrap content-center justify-center overflow-x-hidden">
          <input
            type="text"
            placeholder="Search by body content"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-6/12 p-2 mb-4 mt-5 border border-gray-300 rounded-md mx-auto"
          />

          <input
            type="text"
            placeholder="Filter by user"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="w-6/12 p-2 mb-4 border border-gray-300 rounded-md mx-auto"
          />

          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="w-full min-h- p-2 mb-2.5 sm:w-10/12 flex content-center justify-center"
            >
              <div className="card w-full max-w-[80%] h-[400px] md:h-auto md:w-4/5 glass">
                <div className="flex flex-row py-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full mx-5">
                      <img
                        className="object-cover w-full h-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                      />
                    </div>
                  </div>
                  <p className="flex-end text-sm capitalize pr-2 py-4">
                    {post.author?.name || "Anonymous"}
                  </p>
                </div>
                <figure className="max-h-[200px] overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src="https://source.unsplash.com/random"
                    alt="!"
                  />
                </figure>
                <div className="card-body prose ">
                  <h2 className="card-title truncate max-w-full h-[40px]">
                    <a href={`/post/?id=${post.id}`}>{post?.title}</a>
                  </h2>
                  <p className="text-start h-[60px] overflow-hidden">
                    {post?.body.length > 50
                      ? post.body.substr(0, 50) + "..."
                      : post.body}
                  </p>
                  <div className="card-actions justify-between">
                    <a
                      className="link link-hover link-accent"
                      href={`/post/?id=${post.id}`}
                    >
                      Read more
                    </a>
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`focus:outline-none ${
                        pulse[post.id] ? "animate-pulse" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill={likedPosts[post.id] ? "red" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
