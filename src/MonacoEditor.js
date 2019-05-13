import React, { useEffect, forwardRef, memo, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { loadWASM } from "onigasm"; // peer dependency of 'monaco-textmate'
import { Registry } from "monaco-textmate"; // peer dependency
import { wireTmGrammars } from "monaco-editor-textmate";

import "./MonacoEditor.css";

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

  // map of monaco "language id's" to TextMate scopeNames
  const grammars = new Map();
  grammars.set("python", "source.python");
  grammars.set("javascript", "source.js");

  await wireTmGrammars(monaco, registry, grammars);
}

const Editor = forwardRef(({ mode, theme }, ref) => {
  const [value, setValue] = useState("// Type your code");
  const editorRef = React.useRef(null);
  const monacoRef = React.useRef(null);
  const numLines = React.useRef(null);
  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    ref.monacoRef.current = monaco;
    ref.monacoEditorRef.current = editor;

    const w = editor._domElement.clientWidth;
    // editor._domElement.style.width = `${w + 30}px`;

    editor.focus();
  };
  const editorWillMount = async monaco => {
    loadWASM("/onigasm.wasm").then(() => liftOff(monaco));
  };
  const onChange = (newValue, e) => {
    setValue(newValue);
  };

  useEffect(() => {
    import(`./monaco-themes/${theme}`)
      .then(({ default: data }) => {
        monacoRef.current.editor.defineTheme(theme, data);
      })
      .then(() => monacoRef.current.editor.setTheme(theme))
      .catch(() => monacoRef.current.editor.setTheme(theme));
  }, [theme]);

  useEffect(() => {
    monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), mode);
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
    fontFamily: "Fira Code",
    fontSize: 15,
  };

  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language={mode}
      theme={theme}
      value={value}
      options={options}
      onChange={onChange}
      editorWillMount={editorWillMount}
      editorDidMount={editorDidMount}
    />
  );
});

export default Editor;

// https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable/
// https://stackoverflow.com/questions/53448735/is-there-a-way-to-completely-hide-the-gutter-of-monaco-editor
// https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable
