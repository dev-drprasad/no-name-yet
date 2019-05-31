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

  const handleWidthChange = width => {
    options.current.width = width;
    onChange({ ...options.current });
  };

  const setPadding = padding => {
    options.current.padding = padding;
    onChange({ ...options.current });
  };

  const { cardBGColor, mode, theme, padding, width } = options.current;
  return (
    <div className="Options">
      <label>
        Background:
        <input type="color" value={cardBGColor} onChange={e => setCardBGColor(e.target.value)} />
      </label>
      {defaults.theme !== undefined && (
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
      )}
      {defaults.mode !== undefined && (
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
      )}
      {defaults.width !== undefined && (
        <label>
          Width:
          <input
            type="number"
            value={width}
            max={1200}
            min={300}
            onChange={e => handleWidthChange(Number(e.target.value))}
          />
        </label>
      )}

      <Padding defaults={padding} onChange={padding => setPadding(padding)} />
    </div>
  );
};

export default Options;
