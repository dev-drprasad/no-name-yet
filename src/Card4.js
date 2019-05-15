import React, { forwardRef, useState } from "react";

import Padding from "./Padding";

import MonacoEditor from "./MonacoEditor";
import ContentEditor from "./ContentEditor";

import "./Card4.css";

const languages = [
  { name: "JavaScript", value: "javascript" },
  { name: "Python", value: "python" },
];

const themes = [
  { name: "SynthWave '84", value: "synthwave" },
  { name: "One Dark", value: "one-dark" },
];

const Card = forwardRef(({ cardBGColor }, ref) => {
  const [padding, setPadding] = useState({ x: 40, y: 40 });
  const [theme, setTheme] = useState(themes[0].value);
  const [mode, setMode] = useState(languages[0].value);

  const monacoRef = React.useRef(null);
  const monacoEditorRef = React.useRef(null);

  const handleThemeChange = theme => {
    setTheme(theme);
  };

  const handleLanguageChange = language => {
    setMode(language);
  };

  return (
    <>
      <Padding defaults={padding} onChange={padding => setPadding(padding)} />
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
      <label>
        Language:
        <select onChange={e => handleLanguageChange(e.target.value)}>
          {languages.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <div
        className="Card4"
        ref={ref}
        style={{
          backgroundColor: cardBGColor,
          padding: `${padding.y}px ${padding.x}px`,
        }}
      >
        <div className="CardInner">
          <ContentEditor defaultBGColor="white" defaultTextColor="#586e75" />
          <MonacoEditor theme={theme} mode={mode} ref={{ monacoRef, monacoEditorRef }} />
        </div>
      </div>
    </>
  );
});

export default Card;
