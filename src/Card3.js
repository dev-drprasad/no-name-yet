import React, { forwardRef, useState } from "react";

import ContentEditor from "./ContentEditor";
import Padding from "./Padding";
import "./Card3.css";

const defaultHeading = "Banana Monkey Jungle problem";
const defaultTextArea = `I think the lack of reusability comes in object oriented languages, not in functional languages. Because the problem with object oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle

                                                                                                   -- Joe Armstrong`;

const Card = forwardRef(({ cardBGColor }, ref) => {
  const [padding, setPadding] = useState({ x: 40, y: 40 });
  return (
    <>
      <Padding defaults={padding} onChange={padding => setPadding(padding)} />
      <div
        className="Card3"
        ref={ref}
        style={{
          backgroundColor: cardBGColor,
          padding: `${padding.y}px ${padding.x}px`,
        }}
      >
        <div className="CardInner">
          <ContentEditor
            className="Heading"
            defaultTextColor="#586E75"
            defaultBGColor="#FDF6E3"
            defaultValue={defaultHeading}
          />
          <ContentEditor
            className="TextArea"
            defaultTextColor="#586E75"
            defaultBGColor="#FDF6E3"
            defaultValue={defaultTextArea}
          />
        </div>
      </div>
    </>
  );
});

export default Card;
