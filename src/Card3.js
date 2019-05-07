import React, { forwardRef } from "react";

import ContentEditor from "./ContentEditor";
import "./Card3.css";

const Card = forwardRef(({ cardBGColor }, ref) => {
  return (
    <div className="Card3" ref={ref} style={{ backgroundColor: cardBGColor }}>
      <div className="CardInner">
        <ContentEditor
          className="Heading"
          defaultTextColor="#586E75"
          defaultBGColor="#FDF6E3"
        />
        <ContentEditor
          className="TextArea"
          defaultTextColor="#586E75"
          defaultBGColor="#FDF6E3"
        />
      </div>
    </div>
  );
});

export default Card;
