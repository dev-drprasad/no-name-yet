import React, { useState, useEffect } from "react";

import domtoimage from "dom-to-image";

import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card4 from "./Card4";

import "brace/mode/javascript"; // mandatory. else can't input in editor

import "./App.css";

const TWEETER_URL = process.env.REACT_APP_CUSTOM_ENV_TWEETER_URL || window.location.href;

const getTwitterEmbeddableImageUrl = blob => {
  const form = new FormData();
  form.append("file", blob);
  return fetch(new URL("/api/tweet", TWEETER_URL), {
    method: "POST",
    body: form,
  })
    .then(res => res.json())
    .then(result => result.imageUrl);
};

const tweet = text => {
  const width = 575;
  const height = 400;
  const left = (window.outerWidth - width) / 2;
  const top = (window.outerHeight - height) / 2;
  const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;

  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "twitter", opts);
};

function App() {
  const [selectedCard, setSelecctedCard] = useState(0);

  const cardRef = React.useRef(null);
  const editorRef = React.useRef(null);

  // const handleBeforeLoad = ace => {
  //   ace.config.set("themePath", process.env.PUBLIC_URL + "/js/ace/themes/");
  // };
  const download = () => {
    domtoimage.toBlob(cardRef.current).then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `card-${Date.now() + Math.floor(Math.random() * 5000)}`;
      a.click();
    });
  };

  const handleTweet = () => {
    domtoimage
      .toBlob(cardRef.current)
      .then(getTwitterEmbeddableImageUrl)
      .then(tweet);
  };

  useEffect(() => {
    const handler = event => {
      event.preventDefault();
      const text = event.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    };

    document
      .querySelectorAll('div[contenteditable="true"]')
      .forEach(el => el.addEventListener("paste", handler));

    return () =>
      document
        .querySelectorAll('div[contenteditable="true"]')
        .forEach(el => el.removeEventListener("paste", handler));
  }, [selectedCard]);

  // useEffect(() => {
  //   // some cards wont have editors
  //   if (editorRef.current) {
  //     const editor = editorRef.current.editor;

  //     editor.setOptions({
  //       fontFamily: "Fira Code",
  //     });

  //     editor.renderer.setScrollMargin(15, 15, 15, 15);
  //     editor.renderer.setPadding(15);
  //   }
  // }, [selectedCard]);

  const templates = [0, 1, 2];

  return (
    <div className="App">
      <div className="Sidebar">
        <ul className="CardList">
          {templates.map(id => (
            <li
              className={selectedCard === id ? "Active" : ""}
              onClick={() => setSelecctedCard(id)}
            >
              <img
                src={process.env.PUBLIC_URL + `/images/card${id + 1}.png`}
                alt={`template ${id + 1}`}
              />
            </li>
          ))}
          <li onClick={() => setSelecctedCard(3)}>Monaco editor (experimental)</li>
        </ul>
      </div>
      <main>
        <div className="CardWrapper-CropBug">
          {selectedCard === 0 && <Card1 ref={{ cardRef, editorRef }} />}
          {selectedCard === 1 && <Card2 ref={{ cardRef, editorRef }} />}
          {selectedCard === 2 && <Card3 ref={cardRef} />}
          {selectedCard === 3 && <Card4 ref={cardRef} />}
        </div>
        <div>
          <button type="button" onClick={download}>
            Download
          </button>
          <button type="button" onClick={handleTweet}>
            Tweet
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
