import React, { useEffect, useState } from "react";
import './App.css';


const randomUrl = "https://api.quotable.io/random?tags=";
const tagsUrl = "https://api.quotable.io/tags?sortBy=quoteCount&order=desc";

function App() {

  const [tag, setSelectedTag] = useState('');

  const [quotes, setQuotes] = useState([]);

  const [tags, setTags] = useState([]);

  const getUrl = () => {
    return randomUrl + tag;
  }

  const getQuote = () => {
    fetch(getUrl())
    .then((response) => response.json())
    .then((data) => setQuotes(data));
  }

  const getTags = () => {
    fetch(tagsUrl)
    .then((response) => response.json())
    .then((data) => setTags(data));
  }

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
    getQuote();
  }

  useEffect(() => {
    getQuote();
    getTags();
    // eslint-disable-next-line
  }, []);

  const nextQuote = () => {
    getQuote();
  };

  const { content, author } = quotes;

  return (
    <div className="main">
      <header className="content">
        
        <select
          onChange={e => handleTagChange(e)}
        >
          <option key="---" value="">
              select tag
          </option>
          {tags.map(tag => (
            <option key={tag.name} value={tag.name}>
              {tag.name} ({tag.quoteCount} quotes)
            </option>
          ))}
        </select>

        <div className="blockquote">
          <p>{content}</p>
          <p className="author">{author}</p>
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
