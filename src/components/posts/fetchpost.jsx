import { useNavigate } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { baseURL } from "../../lib/api";
import {
  getNewestNonEmptyPosts,
  sortPostsDescending,
  limitPosts,
} from "../fetch-utils";

export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate({ to: "/login" });
      }
      const response = await fetch(`${baseURL}/social/posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data, "data");

      // Sort posts by created date
      const sortedPosts = sortPostsDescending(data);

      // Filter out empty posts
      const nonEmptyPosts = getNewestNonEmptyPosts(sortedPosts);

      // Limit to 9
      const limitedPosts = limitPosts(nonEmptyPosts, 9);

      setPosts(limitedPosts);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { posts, isLoading, error, fetchData };
};

export const useFetchCurrentUserPosts = (username, jwt) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrentUserPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseURL}/social/profiles/${username}/posts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Sort posts by created
      const sortedPosts = sortPostsDescending(data);

      // Filter out empty posts
      const nonEmptyPosts = getNewestNonEmptyPosts(sortedPosts);

      // Limit to 9
      const limitedPosts = limitPosts(nonEmptyPosts, 9);

      setPosts(limitedPosts);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [username, jwt]);

  console.log(username);

  useEffect(() => {
    if (username && jwt) {
      fetchCurrentUserPosts();
    }
  }, [username, jwt, fetchCurrentUserPosts]);

  return { posts, isLoading, error, username };
};
