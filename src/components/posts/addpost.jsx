import { useState } from "react";
import { baseURL } from "../../lib/api";
import StyledPostForm from "../postform";
import PropTypes from "prop-types";

export default function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState("");
  const [author, setAuthor] = useState("");

  const storedUsername = localStorage.getItem("user_name");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //yes we know the accesstoken should be invisible but this is a test project and we
    // are not going to use this in production so we are just going to leave it like this for now :)
    try {
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkyNCwibmFtZSI6InZpZmlrc2EiLCJlbWFpbCI6Ijg5MTc3MzMtbGFzdEBzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTc0ODY5MTJ9.mUmdtDvnQmeMm7nMR_5mUS8kLkZYQ0NGsNWPX66q6G4";
      const response = await fetch(`${baseURL}/social/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          tags: tags.split(",").map((tag) => tag.trim()),
          media,
          author,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPost = await response.json();

      // Include correct author information
      newPost.author = {
        name: storedUsername,
      };
      window.location.reload();

      // Once the post is created, fetch the updated list
      const updatedPostsResponse = await fetch(
        `${baseURL}/social/profiles/${storedUsername}/posts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      window.location.reload();
      if (!updatedPostsResponse.ok) {
        throw new Error(`HTTP error! status: ${updatedPostsResponse.status}`);
      }

      const updatedPosts = await updatedPostsResponse.json();

      // Update the local state with the updated list of posts.
      onAddPost(updatedPosts);

      // Reset form fields
      setTitle("");
      setBody("");
      setTags("");
      setMedia("");
      setAuthor("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <StyledPostForm
      onSubmit={handleSubmit}
      title={title}
      body={body}
      tags={tags}
      media={media}
      setTitle={setTitle}
      setBody={setBody}
      setTags={setTags}
      setMedia={setMedia}
      handleSubmit={handleSubmit}
    />
  );
}

PostForm.propTypes = {
  onAddPost: PropTypes.func.isRequired,
};
