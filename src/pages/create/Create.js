import "./Create.css";

import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";

export default function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const { postData, data, isPending, error } = useFetch(
    "http://localhost:3000/posts",
    "POST"
  );

  const handleSubmit = e => {
    e.preventDefault();
    postData({ title, author, content });
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data]);

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h2>Create a blog post</h2>
      <label>
        <span>Title</span>
        <input
          type="text"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Author</span>
        <input
          type="text"
          onChange={e => setAuthor(e.target.value)}
          value={author}
        />
      </label>
      <textarea
        placeholder="Type blog content here..."
        onChange={e => setContent(e.target.value)}
        value={content}
      ></textarea>
      {!isPending && <button>Submit</button>}
      {isPending && (
        <button className="btn" disabled>
          <Loading type="bubbles" color="white" width={24} height={24} />
        </button>
      )}
      {error && <Error message={error} />}
    </form>
  );
}
