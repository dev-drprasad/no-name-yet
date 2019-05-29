import React, { forwardRef, useState } from "react";

import Padding from "./Padding";

import MonacoEditor from "./MonacoEditor";
import ContentEditor from "./ContentEditor";

import "./Card4.css";

const defaultText = `Output :

input : This sentence contains two words, one and two
output : [two]
`;

const defaultCode = `public class DuplicateWordsInString {

  public static void main(String[] args) {
      String test = "This sentence contains two words, one and two";
      System.out.println("input : " + test);
      System.out.println("output : " + duplicateWords(test);
  }

  public static Set<String> duplicateWords(String input){
      Set<String> duplicates = new HashSet<>();
      
      String[] words = input.split("\\s+");
      Set<String> set = new HashSet<>();
      
      for(String word : words){
          if(!set.add(word)){ duplicates.add(word); }
      }
      return duplicates;
  }    
}`;

const DEFAULT_SETTINGS = {
  padding: { x: 50, y: 60 },
  theme: "one-dark",
  mode: "haskell",
  cardBGColor: "#00a8f0",
};

const Card = forwardRef((_, ref) => {
  const [options, setOptions] = useState(() => DEFAULT_SETTINGS);

  const monacoRef = React.useRef(null);
  const monacoEditorRef = React.useRef(null);

  const { padding, cardBGColor } = options;

  return (
    <>
      <div>
        <label>
          Background:
          <input
            type="color"
            value={cardBGColor}
            onChange={e => setOptions({ ...options, cardBGColor: e.target.value })}
          />
        </label>
        <Padding defaults={padding} onChange={padding => setOptions({ ...options, padding })} />
      </div>
      <div class="CardWrapper-CropBug">
        <div
          className="Card-4"
          ref={ref.cardRef}
          style={{
            backgroundColor: cardBGColor,
            padding: `${padding.y}px ${padding.x}px`,
          }}
        >
          <div className="CardInner">
            <MonacoEditor
              ref={{ monacoRef, monacoEditorRef }}
              defaultValue={defaultCode}
              defaultMode={DEFAULT_SETTINGS.mode}
              defaultTheme={DEFAULT_SETTINGS.theme}
              minHeight={100}
            />
            <ContentEditor
              defaultBGColor="white"
              defaultTextColor="#586e75"
              defaultValue={defaultText}
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default Card;
