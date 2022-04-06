import "./Post.css";

import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import Loading from "../loading/Loading";
import Error from "../error/Error";

export default function Post() {
  const params = useParams();
  const postId = params.id;

  const navigate = useNavigate();

  const url = `http://localhost:3000/posts/${postId}`;

  const [method, setMethod] = useState("GET");
  const [deleted, setDeleted] = useState(false);
  const { data: post, error, isPending, deleteData } = useFetch(url, method);

  const handleDelete = e => {
    e.preventDefault();
    setMethod("DELETE");
    deleteData();
    setDeleted(true);
  };

  return (
    <div className="blog-content">
      {error && !deleted && <Error message={error} />}
      {isPending && <Loading />}
      {post && !deleted && (
        <div className="blog-post">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-author">Written by {post.author}</p>
          <p className="post-content">{post.content}</p>
          <button className="btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
      {deleted && (
        <div className="deleted">
          <p>Post deleted succesfully.</p>
          <button className="btn" onClick={() => navigate("/")}>
            Back to homepage
          </button>
        </div>
      )}
    </div>
  );
}
