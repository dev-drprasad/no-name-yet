import React, { useRef } from "react";

import languages from "./ace-modes";
import themes from "./ace-themes";
import Padding from "./Padding";

import "./Options.css";

const Options = ({ defaults, onChange }) => {
  const options = useRef(defaults);

  const setCardBGColor = color => {
    options.current.cardBGColor = color;
    onChange({ ...options.current });
  };

  const handleThemeChange = theme => {
    options.current.theme = theme;
    onChange({ ...options.current });
  };

  const handleLanguageChange = language => {
    options.current.mode = language;
    onChange({ ...options.current });
  };

  const setPadding = padding => {
    options.current.padding = padding;
    onChange({ ...options.current });
  };

  const { cardBGColor, mode, theme, padding } = options.current;
  return (
    <div className="Options">
      <label>
        Background:
        <input type="color" value={cardBGColor} onChange={e => setCardBGColor(e.target.value)} />
      </label>
      <label>
        Code theme:
        <select onChange={e => handleThemeChange(e.target.value)} value={theme}>
          {themes.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Language:
        <select onChange={e => handleLanguageChange(e.target.value)} value={mode}>
          {languages.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <Padding defaults={padding} onChange={padding => setPadding(padding)} />
    </div>
  );
};

export default Options;
