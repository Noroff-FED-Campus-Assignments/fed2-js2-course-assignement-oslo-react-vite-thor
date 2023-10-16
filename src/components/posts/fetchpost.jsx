import { useState, useCallback, useEffect } from 'react';
import { baseURL } from "../../lib/api";
import {
    fetchWithAuth,
    getNewestNonEmptyPosts,
    sortPostsDescending,
    limitPosts,
    fetchPostsByProfile,
    fetchProfiles
} from '../fetch-utils';

// Common function to handle post fetching, sorting, and limiting
const processPosts = async (url) => {
    const data = await fetchWithAuth(url);
    return limitPosts(getNewestNonEmptyPosts(data), 9);
};

export const useFetchPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const posts = await processPosts(`${baseURL}/social/posts`);
            setPosts(posts);
        } catch (err) {
            setError(err);
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
        setIsLoading(true);
        try {
            const posts = await processPosts(`${baseURL}/social/profiles/${username}/posts`);
            setPosts(posts);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    useEffect(() => {
        if (username && jwt) {
            fetchCurrentUserPosts();
        }
    }, [username, jwt, fetchCurrentUserPosts]);

    return { posts, isLoading, error, username };
};

const fetchAllPostsWithAuthors = async () => {
    const profiles = await fetchProfiles();
    const postsPromises = profiles.map(profile => {
        return fetchPostsByProfile(profile.name).then(posts => {
            return posts.map(post => ({ ...post, author: profile.name }));
        });
    });

    return (await Promise.all(postsPromises)).flat();
}

fetchAllPostsWithAuthors().then(posts => {
    console.log(posts);
}).catch(error => {
    console.error('Error fetching posts:', error);
});
