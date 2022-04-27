import React, { useEffect, useState } from "react";
import './App.css';


const randomUrl = "https://api.quotable.io/random";
const tagsUrl = "https://api.quotable.io/tags?sortBy=quoteCount&order=desc";

function App() {

  const [quotes, setQuotes] = useState([]);

  const [tags, setTags] = useState([]);

  const getQuote = () => {
    fetch(randomUrl)
    .then((response) => response.json())
    .then((data) => setQuotes(data));
  }

  const getTags = () => {
    fetch(tagsUrl)
    .then((response) => response.json())
    .then((data) => setTags(data));
  }

  useEffect(() => {
    getQuote();
    getTags();
  }, []);

  const nextQuote = () => {
    getQuote();
  };

  const { content, author } = quotes;

  return (
    <div className="main">
      <header className="content">

        <select>
        <option
              key="all"
              value=""
            >
              all
            </option>
          {tags.map(tag => (
            <option
              key={tag.name}
              value={tag.name}
            >
              {tag.name} ({tag.quoteCount} quotes)
            </option>
          ))}
        </select>

        <div class="blockquote">
          <p>{content}</p>
          <p class="author">{author}</p>
        </div>
        <button className="link"
          onClick={nextQuote}
        >
          give me another quote
        </button>
      </header>
    </div>
  );
}

export default App;
