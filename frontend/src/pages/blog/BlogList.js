import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/blogposts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Blog</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <a href={`/blog/${post.id}`}>{post.title}</a>
            {post.published ? '' : <span style={{color:'red'}}> (Brouillon)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
