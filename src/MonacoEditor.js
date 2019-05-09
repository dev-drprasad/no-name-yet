import React, { useEffect, forwardRef } from "react";
import MonacoEditor from "react-monaco-editor";

import "./MonacoEditor.css";

const Editor = forwardRef(({ mode, theme }, ref) => {
  const editorRef = React.useRef(null);
  const monacoRef = React.useRef(null);
  const numLines = React.useRef(null);
  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    ref.monacoRef.current = monaco;
    ref.monacoEditorRef.current = editor;

    const w = editor._domElement.clientWidth;
    editor._domElement.style.width = `${w + 15}px`;

    editor.focus();
  };
  const editorWillMount = async monaco => {
    // loadWASM(`/onigasm.wasm`).then(() => liftOff(monacoRef.current));
  };
  const onChange = (newValue, e) => {
    if (editorRef.current) {
      // const newNumLines = editorRef.current._domElement.getElementsByClassName(
      //   "view-line"
      // ).length;
      const newNumLines = editorRef.current._modelData.viewModel.getLineCount();
      // console.log("editorRef.current.viewModel :", editorRef.current.viewModel);
      if (numLines.current !== newNumLines) {
        // numLines.current = newNumLines;
        console.log("editorRef.current :", editorRef.current);
        // editorRef.current._domElement
        //   .getElementsByClassName("monaco-editor")[0]
        //   .removeAttribute("style");
        setTimeout(() => {
          // const newNumLines = editorRef.current._domElement.getElementsByClassName(
          //   "view-line"
          // ).length;
          const lineHeight = editorRef.current._domElement.getElementsByClassName(
            "view-line"
          )[0].clientHeight;
          console.log("lineHeight :", lineHeight);
          editorRef.current._domElement.style.height = `${lineHeight *
            newNumLines +
            30}px`;
        }, 0);
      }
    }
  };

  // useEffect(() => {
  //   if (editorRef.current) {
  //     console.log("editorRef.current :", editorRef.current);
  //     monacoRef.current.editor.setTheme(theme);
  //     // editorRef.current.setTheme(theme);
  //   }
  // }, [editorRef, theme]);
  // useEffect(() => {
  //   // See https://www.npmjs.com/package/onigasm#light-it-up
  //   liftOff(monacoRef.current, mode);
  // }, [mode]);
  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false
    },
    lineNumbers: "off",
    links: false,
    matchBrackets: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: "on",
    selectionHighlight: false,
    lineDecorationsWidth: 0,
    folding: false
  };

  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language="python"
      theme="vs-dark"
      value="// Type your code"
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
