import React, { forwardRef, useState } from "react";

import Padding from "./Padding";

import MonacoEditor from "./MonacoEditor";
import ContentEditor from "./ContentEditor";

import "./Card4.css";

const defaultText = `Binary Search Tree:

an element points to two elements, one on its left and one on its right. The element to the left is smaller, the element to the right is bigger. 

Each of those elements can also point to two elements (or one, or none). In effect, each element has up to two sub-trees.`;

const defaultCode = `data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Show, Read, Eq)  

singleton :: a -> Tree a  
singleton x = Node x EmptyTree EmptyTree  
  
treeInsert :: (Ord a) => a -> Tree a -> Tree a  
treeInsert x EmptyTree = singleton x  
treeInsert x (Node a left right)   
    | x == a = Node x left right  
    | x < a  = Node a (treeInsert x left) right  
    | x > a  = Node a left (treeInsert x right)

treeElem :: (Ord a) => a -> Tree a -> Bool  
treeElem x EmptyTree = False  
treeElem x (Node a left right)  
    | x == a = True  
    | x < a  = treeElem x left  
    | x > a  = treeElem x right`;

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
        className="Card4"
        ref={ref.cardRef}
        style={{
          backgroundColor: cardBGColor,
          padding: `${padding.y}px ${padding.x}px`,
        }}
      >
        <div className="CardInner">
          <ContentEditor
            defaultBGColor="white"
            defaultTextColor="#586e75"
            defaultValue={defaultText}
          />
          <MonacoEditor
            ref={{ monacoRef, monacoEditorRef }}
            defaultValue={defaultCode}
            defaultMode={DEFAULT_SETTINGS.mode}
            defaultTheme={DEFAULT_SETTINGS.theme}
          />
        </div>
      </div>
    </>
  );
});

export default Card;
