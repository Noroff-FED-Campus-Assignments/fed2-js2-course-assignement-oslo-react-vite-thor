import { useState } from 'react';
import { apiKey, baseURL } from '../../lib/api';
import StyledPostForm from '../postform';
import PropTypes from 'prop-types';

export function PostForm({ onAddPost }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const [media, setMedia] = useState('');

    const storedUsername = localStorage.getItem('username');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postPayload = {
            title,
            body,
            tags: tags.split(',').map((tag) => tag.trim()),
            media,
            author: { name: storedUsername },
        };

        try {
            const accessToken = apiKey;
            const response = await fetch(`${baseURL}/social/posts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postPayload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Once the post is created, fetch the updated list
            const updatedPostsResponse = await fetch(`${baseURL}/social/profiles/${storedUsername}/posts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!updatedPostsResponse.ok) {
                throw new Error(`HTTP error! status: ${updatedPostsResponse.status}`);
            }

            const updatedPosts = await updatedPostsResponse.json();

            // Update the local state with the updated list of posts.
            onAddPost(updatedPosts);

            // Reset form fields
            setTitle('');
            setBody('');
            setTags('');
            setMedia('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <StyledPostForm
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
