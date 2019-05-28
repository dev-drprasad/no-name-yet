import React, { forwardRef, useState } from "react";

import ContentEditor from "./ContentEditor";
import Options from "./Options";
import "./Card3.css";

const defaultHeading = "Banana Monkey Jungle problem";
const defaultTextArea = `I think the lack of reusability comes in object oriented languages, not in functional languages. Because the problem with object oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.


                                                                                                   -- Joe Armstrong`;
const DEFAULT_SETTINGS = {
  padding: { x: 50, y: 60 },
  cardBGColor: "#7ff5c9",
};

const Card = forwardRef((_, ref) => {
  const [options, setOptions] = useState(() => DEFAULT_SETTINGS);

  const { padding, cardBGColor } = options;
  return (
    <>
      <Options defaults={DEFAULT_SETTINGS} onChange={options => setOptions(options)} />
      <div
        className="Card3"
        ref={ref.cardRef}
        style={{
          backgroundColor: cardBGColor,
          padding: `${padding.y}px ${padding.x}px`,
        }}
      >
        <div className="CardInner">
          <ContentEditor
            className="Heading"
            defaultTextColor="#586E75"
            defaultBGColor="#fed462"
            defaultValue={defaultHeading}
            defaultFontSize={30}
          />
          <ContentEditor
            className="TextArea"
            defaultTextColor="#586E75"
            defaultBGColor="#fcf8ec"
            defaultValue={defaultTextArea}
            defaultFontSize={20}
          />
        </div>
      </div>
    </>
  );
});

export default Card;
