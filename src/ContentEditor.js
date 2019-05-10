import React, { useState } from "react";

import "./ContentEditor.css";

const ContentEditor = ({
  className,
  defaultValue = "",
  defaultTextColor,
  defaultBGColor
}) => {
  const [settings, setSettings] = useState(() => ({
    textColor: defaultTextColor || "white",
    backgroundColor: defaultBGColor || "#ffffff00"
  }));

  const handleTextColorChange = e => {
    setSettings({ ...settings, textColor: e.target.value });
  };
  const handleBackgroundColorChange = e => {
    setSettings({ ...settings, backgroundColor: e.target.value });
  };
  return (
    <div
      className={`ContentEditor ${className}`}
      style={{ backgroundColor: settings.backgroundColor }}
    >
      <div
        style={{ color: settings.textColor }}
        spellCheck="false"
        contentEditable
      >
        {defaultValue}
      </div>
      <div className="TextFormatBar">
        <span
          role="button"
          className="ColorSelect TextColorSelect"
          style={{ color: settings.textColor }}
        >
          A
          <input
            type="color"
            value={settings.textColor}
            title="text color"
            onChange={handleTextColorChange}
          />
        </span>
        <span className="Seperator" />
        <span
          role="button"
          className="ColorSelect BGColorSelect"
          style={{ backgroundColor: settings.backgroundColor }}
        >
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={handleBackgroundColorChange}
            title="background color"
          />
        </span>
      </div>
    </div>
  );
};

export default ContentEditor;
