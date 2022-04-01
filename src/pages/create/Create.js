import "./Create.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    console.log("adding post:", title, author, content);
  };

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
      <button>Submit</button>
    </form>
  );
}
