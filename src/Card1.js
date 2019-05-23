import React, { forwardRef, useState } from "react";

// import "brace/mode/golang";

import ContentEditor from "./ContentEditor";
import MonacoEditor from "./MonacoEditor";
import "./Card1.css";

import Padding from "./Padding";

const DEFAULT_SETTINGS = {
  padding: { x: 60, y: 25 },
  theme: "one-dark",
  mode: "js",
  cardBGColor: "#39c98e",
};

const defaultCode = `const pluckDeep = key => obj => key.split('.').reduce((acc, key) => acc[key], obj);

const compose = (...fns) =>
  res => fns.reduce((accum, next) => next(accum), res);

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed);
    return res ? go(f, res[1], acc.concat([res[0]])) : acc;
  }
  return go(f, seed, []);
}`;
const defaultHeading = `Useful helper functions for JavaScript`;
const defaultFooter = `                      @dev_drprasad                      `;

const Card = forwardRef((_, ref) => {
  const [options, setOptions] = useState(DEFAULT_SETTINGS);

  const { padding, cardBGColor } = options;
  return (
    <>
      <label>
        Background:
        <input
          type="color"
          value={cardBGColor}
          onChange={e => setOptions({ ...options, cardBGColor: e.target.value })}
        />
      </label>
      <Padding defaults={padding} onChange={padding => setOptions({ ...options, padding })} />

      <div
        className="Card-1"
        ref={ref.cardRef}
        style={{
          backgroundColor: cardBGColor,
          padding: `${padding.y + 75}px ${padding.x}px ${padding.y + 60}px ${padding.x}px`, // footer.height = 55
        }}
      >
        <ContentEditor className="CardHeading" defaultFontSize={30} defaultValue={defaultHeading} />
        <div className="CardInner">
          <MonacoEditor
            defaultValue={defaultCode}
            defaultMode={DEFAULT_SETTINGS.mode}
            defaultTheme={DEFAULT_SETTINGS.theme}
          />
        </div>
        <ContentEditor
          className="CardFooter"
          defaultValue={defaultFooter}
          defaultBGColor="#5a83da"
        />
      </div>
    </>
  );
});

export default Card;
