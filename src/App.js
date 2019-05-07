import React, { useState, useEffect } from "react";

import domtoimage from "dom-to-image";

import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";

import "./App.css";

const themes = [
  { name: "One Dark", value: "one-dark" },
  { name: "Monokai", value: "monokai" },
  { name: "Tomorrow", value: "tomorrow" },
  { name: "XCode", value: "xcode" },
  { name: "Solarized Light", value: "solarized_light" },
  { name: "Dracula", value: "dracula" }
];

const DEFAULT_THEME = themes[0].value;
const TWEETER_URL =
  process.env.REACT_APP_CUSTOM_ENV_TWEETER_URL || window.location.href;

const getTwitterEmbeddableImageUrl = blob => {
  const form = new FormData();
  form.append("file", blob);
  return fetch(new URL("/api/tweet", TWEETER_URL), {
    method: "POST",
    body: form
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

  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    "twitter",
    opts
  );
};

function App() {
  const [cardBGColor, setCardBGColor] = useState("#00a8e8");
  const [selectedCard, setSelecctedCard] = useState(0);
  const cardRef = React.useRef(null);
  const editorRef = React.useRef(null);

  const handleBeforeLoad = ace => {
    ace.config.set("themePath", process.env.PUBLIC_URL + "/js/ace/themes/");
  };
  const handleEditorLoad = editor => {};
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

  const handleThemeChange = theme => {
    const editor = editorRef.current.editor;
    import(`brace/theme/${theme}`)
      .then(() => {
        editor.setTheme(`ace/theme/${theme}`);
      })
      .catch(() => editor.setTheme(`ace/theme/${theme}`));
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

  useEffect(() => {
    // some cards wont have editors
    if (editorRef.current) {
      const editor = editorRef.current.editor;

      editor.setOptions({
        fontFamily: "Fira Code"
      });

      editor.renderer.setScrollMargin(15, 15, 15, 15);
      editor.renderer.setPadding(15);
    }
  }, [selectedCard]);
  return (
    <div className="App">
      <div className="Sidebar">
        <ul className="CardList">
          <li onClick={() => setSelecctedCard(0)}>
            <img
              src={process.env.PUBLIC_URL + "/images/card1.png"}
              alt="template 1"
            />
          </li>
          <li onClick={() => setSelecctedCard(1)}>
            <img
              src={process.env.PUBLIC_URL + "/images/card2.png"}
              alt="template 2"
            />
          </li>
          <li onClick={() => setSelecctedCard(2)}>
            <img
              src={process.env.PUBLIC_URL + "/images/card3.png"}
              alt="template 3"
            />
          </li>
        </ul>
      </div>
      <main>
        <div className="CardWrapper-CropBug">
          <div className="Options">
            <label>
              Background color:
              <input
                type="color"
                value={cardBGColor}
                onChange={e => setCardBGColor(e.target.value)}
              />
            </label>
            <label>
              Code theme:
              <select onChange={e => handleThemeChange(e.target.value)}>
                {themes.map(({ name, value }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {selectedCard === 0 && (
            <Card1
              theme={DEFAULT_THEME}
              ref={{ cardRef, editorRef }}
              cardBGColor={cardBGColor}
              onEditorLoad={handleEditorLoad}
              onBeforeLoad={handleBeforeLoad}
            />
          )}
          {selectedCard === 1 && (
            <Card2
              theme={DEFAULT_THEME}
              ref={{ cardRef, editorRef }}
              cardBGColor={cardBGColor}
              onEditorLoad={handleEditorLoad}
              onBeforeLoad={handleBeforeLoad}
            />
          )}
          {selectedCard === 2 && (
            <Card3 ref={cardRef} cardBGColor={cardBGColor} />
          )}
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
