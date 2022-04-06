import "./Home.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";

export default function Home() {
  const [url, setUrl] = useState("http://localhost:3000/posts");

  const { data, isPending, error } = useFetch(url);

  return (
    <div className="blog-posts">
      {isPending && <Loading />}
      {error && <Error message={error} />}
      {data &&
        ((data.length &&
          data.map(post => (
            <div className="blog-preview" key={Math.random()}>
              <h3 className="preview-title">{post.title}</h3>
              <p className="preview-author">Written by {post.author}</p>
              <p className="preview-content">{`${post.content.substring(
                0,
                200
              )}...`}</p>
              <Link to={`posts/${[post.id]}`} className="btn">
                Read more
              </Link>
            </div>
          ))) ||
          (!data.length && (
            <div className="no-posts">No posts added yet.</div>
          )))}
    </div>
  );
}
