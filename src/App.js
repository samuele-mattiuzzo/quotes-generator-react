import React, { useEffect, useState } from "react";
import './App.css';


const randomUrl = "https://api.quotable.io/random";
const tagsUrl = "https://api.quotable.io/tags";

function App() {

  const [quotes, showQuote] = useState([]);

  const getQuote = () => {
    fetch(randomUrl)
    .then((response) => response.json())
    .then((data) => showQuote(data));
  }

  useEffect(() => {
    getQuote();
  }, []);

  const nextQuote = () => {
    getQuote();
  };

  const { content, author } = quotes;

  return (
    <div className="main">
      <header className="content">

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
