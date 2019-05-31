import React, { forwardRef, useState } from "react";

import MonacoEditor from "./MonacoEditor";
import ContentEditor from "./ContentEditor";

import "./Card4.css";
import Options from "./Options";

const defaultText = `Output :

input : This sentence contains two words, one and two
output : [two]

`;

const defaultCode = `public class DuplicateWordsInString {

  public static void main(String[] args) {
      String test = "This sentence contains two words, one and two";
      System.out.println("input : " + test);
      System.out.println("output : " + duplicateWords(test));
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
  cardBGColor: "#00a8f0",
  width: 750,
};

const Card = forwardRef((_, ref) => {
  const [options, setOptions] = useState(() => DEFAULT_SETTINGS);

  const monacoRef = React.useRef(null);
  const monacoEditorRef = React.useRef(null);

  const { padding, cardBGColor, width } = options;

  return (
    <>
      <Options defaults={DEFAULT_SETTINGS} onChange={options => setOptions(options)} />
      <div className="CardWrapper-CropBug">
        <div
          className="Card-4"
          ref={ref.cardRef}
          style={{
            backgroundColor: cardBGColor,
            padding: `${padding.y}px ${padding.x}px`,
            width,
          }}
        >
          <div className="CardInner">
            <MonacoEditor
              ref={{ monacoRef, monacoEditorRef }}
              defaultValue={defaultCode}
              defaultMode="java"
              defaultTheme="one-dark"
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
