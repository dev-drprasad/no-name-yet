import React, { useEffect, forwardRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { loadWASM } from "onigasm"; // peer dependency of 'monaco-textmate'
import { Registry } from "monaco-textmate"; // peer dependency
import { wireTmGrammars } from "monaco-editor-textmate";

import "./MonacoEditor.css";

// function add(num1, num2) {
//   return num1 + num2;
// }

const languagesToRegister = [
  {
    id: "javascript",
    extensions: [".js"],
    aliases: [],
    mimetypes: ["text/javascript"],
  },
  {
    id: "python",
    extensions: [".py"],
    aliases: [],
    mimetypes: ["text/python"],
  },
];

async function liftOff(monaco) {
  const registry = new Registry({
    getGrammarDefinition: async scopeName => {
      console.log("scopeName :", scopeName);
      return {
        format: "json",
        content: await (await fetch(`/grammers/${scopeName}.tmLanguage.json`)).text(),
      };
    },
  });

  // registry.loadGrammar("source.js").then(grammar => {
  //   // at this point `grammar` is available...
  //   var lineTokens = grammar.tokenizeLine("function add(num1, num2) { return num1 + num2 };");
  //   for (var i = 0; i < lineTokens.tokens.length; i++) {
  //     var token = lineTokens.tokens[i];
  //     console.log(
  //       "Token from " + token.startIndex + " to " + token.endIndex + " with scopes " + token.scopes
  //     );
  //   }
  // });

  // map of monaco "language id's" to TextMate scopeNames
  const grammars = new Map();
  grammars.set("python", "source.python");
  grammars.set("javascript", "source.js");

  languagesToRegister.forEach(language => void monaco.languages.register(language));

  await wireTmGrammars(monaco, registry, grammars);
}

const Editor = forwardRef(({ mode, theme }, ref) => {
  const [value, setValue] = useState("function add(num1, num2) { return num1 + num2 };");
  const [editorPaddingColor, setEditorPaddingColor] = useState("#ffffff00");
  const editorRef = React.useRef(null);
  const monacoRef = React.useRef(null);

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    console.log("editor, monaco :", editor, monaco);
    ref.monacoRef.current = monaco;
    ref.monacoEditorRef.current = editor;

    const w = editor._domElement.clientWidth;
    // editor._domElement.style.width = `${w + 30}px`;

    editor.focus();
  };
  const editorWillMount = monaco => {
    liftOff(monaco);
  };
  const onChange = (newValue, e) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (monacoRef.current) {
      import(`./monaco-themes/${theme}`)
        .then(({ default: data }) => {
          console.log("theme, data :", theme, data);
          setEditorPaddingColor(data.colors["editor.background"]);
          monacoRef.current.editor.defineTheme(theme, data);
        })
        .then(() => monacoRef.current.editor.setTheme(theme))
        .catch(() => monacoRef.current.editor.setTheme(theme));
    }
  }, [theme]);

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), mode);
    }
  }, [mode]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const newNumLines = editor._modelData.viewModel.getLineCount();
      const [{ clientHeight: lineHeight }] = editor._domElement.getElementsByClassName("view-line");
      editor._domElement.style.height = `${lineHeight * newNumLines + 30}px`;
    }
  }, [value]);

  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
    lineNumbers: "off",
    links: false,
    matchBrackets: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: "on",
    selectionHighlight: false,
    lineDecorationsWidth: 0,
    folding: false,
    fontLigatures: true,
    contextmenu: false,
    // fontFamily: "Fira Code",
    fontSize: 15,
  };

  return (
    <div style={{ padding: 15, backgroundColor: editorPaddingColor }}>
      <MonacoEditor
        width="100%"
        height="100%"
        theme={theme}
        language={mode}
        value={value}
        options={options}
        onChange={onChange}
        editorWillMount={editorWillMount}
        editorDidMount={editorDidMount}
      />
    </div>
  );
});

export default Editor;

// https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable/
// https://stackoverflow.com/questions/53448735/is-there-a-way-to-completely-hide-the-gutter-of-monaco-editor
// https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable
