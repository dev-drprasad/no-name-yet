import React, { useEffect, forwardRef, useState } from "react";
import MonacoReactComponent from "./MonacoReactComponent";
import { Registry } from "monaco-textmate";
import { wireTmGrammars } from "monaco-editor-textmate";
import languagesToRegister from "./monaco-languages";

import "./MonacoEditor.css";

const registry = new Registry({
  getGrammarDefinition: async scopeName => {
    console.log("scopeName :", scopeName);
    const [languageId] = languagesToRegister.find(([, scope]) => scope === scopeName);
    console.log("languageId :", languageId);
    return {
      format: "json",
      content: await (await fetch(`/grammers/${languageId}.tmLanguage.json`)).text(),
    };
  },
});

async function liftOff(monaco, languageId) {
  // map of monaco "language id's" to TextMate scopeNames
  const [, scope] = languagesToRegister.find(([id]) => id === languageId);

  const grammers = new Map();
  grammers.set(languageId, scope);

  // registry.loadGrammar("source.cpp").then(grammar => {
  //   // at this point `grammar` is available...
  //   var lineTokens = grammar.tokenizeLine('std::fstream out("file.txt", std::ios::out);');
  //   for (var i = 0; i < lineTokens.tokens.length; i++) {
  //     var token = lineTokens.tokens[i];
  //     console.log(
  //       "Token from " + token.startIndex + " to " + token.endIndex + " with scopes " + token.scopes
  //     );
  //   }
  // });

  await wireTmGrammars(monaco, registry, grammers);
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
    editor.focus();
  };
  const editorWillMount = monaco => {
    const builtinLanguages = monaco.languages.getLanguages();
    languagesToRegister.forEach(([languageId]) => {
      const builtin = builtinLanguages.find(({ id }) => id === languageId);
      if (builtin) {
        builtin.loader = () => ({ then: () => {} });
      } else {
        monaco.languages.register({ id: languageId });
      }
    });
  };

  const onChange = (newValue, e) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (monacoRef.current) {
      import(`./monaco-themes/${theme}`)
        .then(({ default: data }) => {
          setEditorPaddingColor(data.colors["editor.background"]);
          monacoRef.current.editor.defineTheme(theme, data);
        })
        .then(() => monacoRef.current.editor.setTheme(theme))
        .catch(err => {
          console.error(err);
          monacoRef.current.editor.setTheme(theme);
        });
    }
  }, [theme]);

  useEffect(() => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (monaco && editor) {
      liftOff(monaco, mode).then(
        () => void monaco.editor.setModelLanguage(editor.getModel(), mode)
      );
    }
  }, [mode]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const model = editor.getModel();
      model.onDidChangeContent(e => {
        const newNumLines = editor._modelData.viewModel.getLineCount();
        const [{ clientHeight: lineHeight }] = editor._domElement.getElementsByClassName(
          "view-line"
        );
        editor._domElement.style.height = `${lineHeight * newNumLines + 30}px`;
      });
    }
  }, []);

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
      <MonacoReactComponent
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
