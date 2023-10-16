import { baseURL, apiKey } from "../../lib/api";

// Fetch utility function with authorization header
export const fetchWithAuth = async (url) => {
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const fetchProfiles = async () => {
    return fetchWithAuth(`${baseURL}/social/profiles`);
}

export const fetchPostsByProfile = async (profileName) => {
    return fetchWithAuth(`${baseURL}/social/profiles/${profileName}/posts`);
}

// Sort posts in descending order based on created date
export const sortPostsDescending = (posts) => {
    return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
}

// Filter out posts with empty content
export const getNewestNonEmptyPosts = (posts) => {
    return sortPostsDescending(posts).filter(post => post.body.trim() !== "");
}

// Limit the number of returned posts
export const limitPosts = (posts, limit) => {
    return posts.slice(0, limit);
}
