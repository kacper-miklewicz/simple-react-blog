import "./Post.css";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function Post() {
  const params = useParams();
  const postId = params.id;

  const url = `http://localhost:3000/posts/${postId}`;

  const { data: post, error, isPending } = useFetch(url);

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div className="blog-content">
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {post && (
        <div className="blog-post">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-author">Written by {post.author}</p>
          <p className="post-content">{post.content}</p>
          <button className="btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
