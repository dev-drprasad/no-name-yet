import React, { useRef } from "react";

import languages from "./ace-modes";
import Padding from "./Padding";

const themes = [
  // { name: "VS Dark", value: "vs-dark" },
  { name: "One Dark", value: "one-dark" },
  { name: "One Dark Vivid", value: "one-dark-vivid" },
  { name: "Monokai", value: "monokai" },
  { name: "Tomorrow", value: "tomorrow" },
  { name: "XCode", value: "xcode" },
  { name: "Solarized Light", value: "solarized_light" },
  { name: "Dracula", value: "dracula" },
];

const DEFAULT_THEME = themes[0].value;
const DEFAULT_MODE = "javascript";

const Options = ({ onChange }) => {
  const options = useRef({
    cardBGColor: "white",
    theme: DEFAULT_THEME,
    mode: DEFAULT_MODE,
    padding: { x: 40, y: 40 },
  });

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

  const { cardBGColor, padding } = options.current;
  return (
    <div className="Options">
      <label>
        Background color:
        <input type="color" value={cardBGColor} onChange={e => setCardBGColor(e.target.value)} />
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
      <Padding defaults={padding} onChange={padding => setPadding(padding)} />
    </div>
  );
};

export default Options;
