import React, { useState } from "react";

import "./ContentEditor.css";

const ContentEditor = ({
  className,
  defaultValue = "",
  defaultTextColor,
  defaultBGColor,
  defaultFontSize,
}) => {
  const [settings, setSettings] = useState(() => ({
    textColor: defaultTextColor || "white",
    backgroundColor: defaultBGColor || "#ffffff00",
    fontSize: defaultFontSize || 16,
  }));

  const handleTextColorChange = e => {
    setSettings({ ...settings, textColor: e.target.value });
  };
  const handleBackgroundColorChange = e => {
    setSettings({ ...settings, backgroundColor: e.target.value });
  };
  const handleFontSizeChange = fontSize => {
    setSettings({ ...settings, fontSize: Number(fontSize) });
  };
  return (
    <div
      className={`ContentEditor ${className}`}
      style={{ backgroundColor: settings.backgroundColor, fontSize: settings.fontSize }}
    >
      <div
        style={{ color: settings.textColor }}
        spellCheck="false"
        contentEditable
        dangerouslySetInnerHTML={{ __html: defaultValue }}
      />
      <input className="SettingsIcon" type="button" value="&#x2699;" />
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
        <span className="Seperator" />
        <input
          className="FontSizeSelect"
          type="number"
          defaultValue={settings.fontSize}
          min={12}
          max={30}
          onChange={e => handleFontSizeChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ContentEditor;
