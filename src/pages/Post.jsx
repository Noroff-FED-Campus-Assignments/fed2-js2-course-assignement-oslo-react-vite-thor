import { useNavigate } from "@tanstack/react-router";

import { useState, useEffect } from "react";

import Navigation from "../components/navbar";

 

const initialPostState = {

  title: "No post found",

  body: "Nothing to see here",

  userId: null,

  id: null,

};

 

export default function PostPage() {

  const [post, setPost] = useState(initialPostState);

  const [isLoading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [editedPost, setEditedPost] = useState({});

  const navigate = useNavigate();

 

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);

 

        const searchQuery = window.location.search;

        const url = new URLSearchParams(searchQuery);

        const id = url.get("id");

 

        const res = await fetch(

          `https://api.noroff.dev/api/v1/social/posts/${id}?_author=true`,

          {

            method: "GET",

            headers: {

              Authorization: `Bearer ${localStorage.getItem("access_token")}`,

            },

          }

        );

 

        const json = await res.json();

        setPost(json);

      } catch (error) {

        setError("Failed to fetch post");

      } finally {

        setLoading(false);

      }

    };

 

    fetchData();

  }, []);

 

  const handleEdit = () => {

    setIsEditing(true);

    // Initialize editedPost with the current post data

    setEditedPost({

      title: post.title,

      body: post.body,

    });

  };

 

  const handleUpdate = async () => {

    const payload = {

      title: editedPost.title,

      body: editedPost.body,

    };

 

    const res = await fetch(

      `https://api.noroff.dev/api/v1/social/posts/${post.id}`,

      {

        method: "PUT",

        body: JSON.stringify(payload),

        headers: {

          Authorization: `Bearer ${localStorage.getItem("access_token")}`,

          "Content-type": "application/json; charset=UTF-8",

        },

      }

    );

 

    const updatedPost = await res.json();

    setPost(updatedPost);

    setIsEditing(false);

  };

 

  const handleDelete = async () => {

    const res = await fetch(

      `https://api.noroff.dev/api/v1/social/posts/${post.id}`,

      {

        method: "DELETE",

        headers: {

          Authorization: `Bearer ${localStorage.getItem("access_token")}`,

        },

      }

    );

 

    if (res.status === 200) {

      // Post successfully deleted, redirect or show a message

      navigate({ to: "/" });

    } else {

      setError("Failed to delete post");

    }

  };

 

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

 

  return (

    <>

      <Navigation />

      <section id="feed " className="w-full bg-base-100">

        <div className="min-h-screen md:container md:mx-auto  flex sm:flex-col flex-wrap content-center justify-center overflow-x-hidden ">

          <div

            key={post.id}

            className="w-full md:w-2/3 p-2 mb-2.5 sm:w-10/12 flex content-center justify-center"

          >

            <div className="card w-full max-w-[80%] h-[300px] md:h-auto md:w-4/5 glass">

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

              <div className="card-body prose">

                {isEditing ? (

                  <>

                    <input

                      type="text"

                      value={editedPost.title}

                      onChange={(e) =>

                        setEditedPost({ ...editedPost, title: e.target.value })

                      }

                    />

                    <textarea

                      value={editedPost.body}

                      onChange={(e) =>

                        setEditedPost({ ...editedPost, body: e.target.value })

                      }

                    ></textarea>

                    <button onClick={handleUpdate}>Update</button>

                  </>

                ) : (

                  <>

                    <h2 className="card-title truncate max-w-full h-[40px]">

                      <a href={`/post/?id=${post.id}`}>{post?.title}</a>

                    </h2>

                    <p className="text-start h-[60px] overflow-hidden">

                      {post?.body}

                    </p>

                  </>

                )}

              </div>

              <div className="card-actions justify-between">

                {isEditing ? (

                  <button onClick={() => setIsEditing(false)}>Cancel</button>

                ) : (

                  <>

                    <button onClick={handleDelete}>Delete</button>

                    <button onClick={handleEdit}>Edit</button>

                  </>

                )}

              </div>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}