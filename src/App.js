import React, { useState } from "react";

import domtoimage from "dom-to-image";

import Card1 from "./Card1";
import Card2 from "./Card2";

import "./App.css";

function App() {
  const [cardBGColor, setCardBGColor] = useState("#00a8e8");
  const [selectedCard, setSelecctedCard] = useState(0);
  const ref = React.useRef(null);

  const download = () => {
    domtoimage.toBlob(ref.current).then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `card-${Date.now() + Math.floor(Math.random() * 5000)}`;
      a.click();
    });
  };
  return (
    <div className="App">
      <div className="Sidebar">
        <ul className="CardList">
          <li onClick={() => setSelecctedCard(0)}>
            <img src={process.env.PUBLIC_URL + "/images/card1.png"} />
          </li>
          <li onClick={() => setSelecctedCard(1)}>
            <img src={process.env.PUBLIC_URL + "/images/card2.png"} />
          </li>
        </ul>
      </div>
      <main>
        <div className="CardWrapper-CropBug">
          <div className="Options">
            <label>
              Background color:
              <input
                type="color"
                value={cardBGColor}
                onChange={e => setCardBGColor(e.target.value)}
              />
            </label>
          </div>
          {selectedCard === 0 && <Card1 ref={ref} cardBGColor={cardBGColor} />}
          {selectedCard === 1 && <Card2 ref={ref} cardBGColor={cardBGColor} />}
        </div>
        <div>
          <button type="button" onClick={download}>
            Download
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
