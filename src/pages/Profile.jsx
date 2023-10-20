import Navigation from "../components/navbar";
import { useState, useEffect } from "react";

async function fetchUserPosts(user_name, token) {
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/social/profiles/${user_name}/posts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const defaultString = "the API does not provide the data";
  const user_name = localStorage.getItem("user_name");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("Token not available");
      setLoading(false);
      return;
    }

    if (!user_name) {
      console.error("User name not available.");
      setLoading(false);
      return;
    }

    fetch(`https://api.noroff.dev/api/v1/social/profiles/${user_name}/posts?`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          console.error("Token is invalid or expired.");
          setLoading(false);
          return null;
        }
        console.log(res);

        return res.json();
      })
      .then((responseData) => {
        console.log("Response Data:", responseData); // <-- This line will log the data

        if (responseData) {
          setProfile(responseData);
          console.log("Count Data:", responseData._count);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, [token, user_name]);

  useEffect(() => {
    if (token && user_name) {
      setPosts([]); // Clear old posts
      fetchUserPosts(user_name, token).then((fetchedPosts) => {
        setPosts(fetchedPosts);
        console.log(fetchedPosts);
      });
    }
  }, [token, user_name]);
  useEffect(() => {
    console.log("Current posts:", posts);
  }, [posts]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen md:container md:mx-auto flex sm:flex-col flex-wrap content-center gap-10 overflow-x-hidden">
        <h1>My Profile</h1>

        {loading ? (
          <p>Loading...</p>
        ) : profile ? (
          <div className="card w-full h-screen md:h-auto md:w-4/6 glass">
            <div className="flex flex-row py-4">
              <div className="avatar">
                <div className="w-16 rounded-full mx-5">
                  <img
                    className="object-cover w-full h-full"
                    src="https://source.unsplash.com/random"
                    alt="Default unsplash photo"
                  />
                </div>
              </div>
              <p className="flex-end text-sm capitalize pr-2 py-4">
                {profile.name}
              </p>
            </div>
            <div className="card-body prose">
              <h2 className="card-title truncate max-w-full h-[40px]">
                {profile.name}
              </h2>
              <p className="text-start h-[60px] overflow-hidden">
                <span className="font-semibold">Lets link up: </span>
                <span className="text-blue-700 duration-100 transform cursor-pointer hover:font-semibold">
                  {profile.email}
                </span>
              </p>
              <p className="text-start h-[60px] overflow-hidden">
                <span className="font-semibold">Studies:</span> {defaultString}
              </p>
            </div>
          </div>
        ) : (
          <p>You need to log in to view this profile</p>
        )}

        <div>
          <h2>User Posts</h2>
          {posts.map((post) => (
            <div key={post._author}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              {/* ... other post properties */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
