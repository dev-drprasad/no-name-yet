import React, { forwardRef, useState } from "react";

import Padding from "./Padding";

import MonacoEditor from "./MonacoEditor";
import ContentEditor from "./ContentEditor";

import "./Card4.css";

const languages = [
  { name: "C++", value: "cpp" },
  { name: "C", value: "c" },
  { name: "Clojure", value: "clojure" },
  { name: "C#", value: "cs" },
  { name: "CSS", value: "css" },
  { name: "Dockerfile", value: "dockerfile" },
  { name: "Golang", value: "go" },
  { name: "Haskell", value: "haskell" },
  { name: "HTML", value: "html" },
  { name: "Java", value: "java" },
  { name: "JavaScript", value: "js" },
  { name: "React", value: "jsx" },
  { name: "JSON", value: "json" },
  { name: "Lua", value: "lua" },
  { name: "Objective-C", value: "objc" },
  { name: "Perl", value: "perl" },
  { name: "PHP", value: "php" },
  { name: "Python", value: "python" },
  { name: "R", value: "r" },
  { name: "Ruby", value: "ruby" },
  { name: "Rust", value: "rust" },
  { name: "SQL", value: "sql" },
  { name: "Swift", value: "swift" },
  { name: "XML", value: "xml" },
  { name: "YAML", value: "yaml" },
];

const themes = [
  { name: "SynthWave '84", value: "synthwave" },
  { name: "One Dark", value: "one-dark" },
];

const Card = forwardRef((_, ref) => {
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
      <div
        className="Card4"
        ref={ref}
        style={{
          backgroundColor: "#00a8f0",
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
