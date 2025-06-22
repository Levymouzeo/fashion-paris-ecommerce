import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/blogposts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => setPost(null));
  }, [id]);

  if (!post) return <p>Article non trouvé.</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      {post.image && <img src={`http://localhost:3000/uploads/${post.image}`} alt={post.title} style={{maxWidth:300}} />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <p>{post.published ? 'Publié' : 'Brouillon'}</p>
    </div>
  );
};

export default BlogDetail;
