import React, { useEffect, forwardRef, useState } from "react";
import MonacoReactComponent from "./MonacoReactComponent";
import { Registry } from "monaco-textmate";
// import { wireTmGrammars } from "monaco-editor-textmate";
import languagesToRegister from "./monaco-languages";
import tmthemeToMonaco from "./utils/tmtheme-to-monaco";
import { wireTmGrammars } from "./utils/set-grammers";

import "./MonacoEditor.css";

const registry = new Registry({
  getGrammarDefinition: async scopeName => {
    console.log("scopeName :", scopeName);
    const [languageId] = languagesToRegister.find(([, scope]) => scope === scopeName);
    console.log("languageId :", languageId);

    const url = scopeName.includes(".python")
      ? `/grammers/python.tmLanguage`
      : `/grammers/${languageId}.tmLanguage.json`;
    const format = scopeName.includes(".python") ? "plist" : "json";
    return {
      format,
      content: await (await fetch(url)).text(),
    };
  },
});

async function liftOff(monaco, languageId, scopeMap) {
  console.log("scopeMap :", scopeMap);
  // map of monaco "language id's" to TextMate scopeNames
  const [, scope] = languagesToRegister.find(([id]) => id === languageId);

  const grammers = new Map();
  grammers.set(languageId, scope);

  await wireTmGrammars(monaco, registry, grammers, scopeMap);
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
      // no languageId means there dependencies
      if (languageId) {
        const builtin = builtinLanguages.find(({ id }) => id === languageId);
        if (builtin) {
          builtin.loader = () => ({ then: () => {} });
        } else {
          monaco.languages.register({ id: languageId });
        }
      }
    });
  };

  const onChange = (newValue, e) => {
    setValue(newValue);
  };

  useEffect(() => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (monaco && editor) {
      import(`./monaco-themes/${theme}-tmtheme`)
        .then(({ default: data }) => {
          const transformedTheme = tmthemeToMonaco(data);
          setEditorPaddingColor(transformedTheme.colors["editor.background"]);
          monaco.editor.defineTheme(theme, transformedTheme);
          return transformedTheme.rules.reduce((acc, rule) => {
            acc[rule.token] = true;
            return acc;
          }, {});
        })
        .then(themeScopes => liftOff(monaco, mode, themeScopes))
        .then(() => void monaco.editor.setModelLanguage(editor.getModel(), mode))
        .then(() => monaco.editor.setTheme(theme))
        .catch(err => {
          console.error(err);
          monaco.editor.setTheme(theme);
        });
    }
  }, [theme, mode]);

  // useEffect(() => {
  //   const monaco = monacoRef.current;
  //   const editor = editorRef.current;

  //   if (monaco && editor) {
  //     liftOff(monaco, mode, themeScopes.current).then(
  //       () => void monaco.editor.setModelLanguage(editor.getModel(), mode)
  //     );
  //   }
  // }, [mode]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const model = editor.getModel();
      model.onDidChangeContent(e => {
        console.log("editor._modelData :", editor._modelData);
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
    fontFamily: "Fira Code",
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
