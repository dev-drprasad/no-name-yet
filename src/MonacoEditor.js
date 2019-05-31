import React, { useEffect, forwardRef, useState } from "react";
import MonacoReactComponent from "./MonacoReactComponent";
import { Registry } from "monaco-textmate";
// import { wireTmGrammars } from "monaco-editor-textmate";
import languagesToRegister from "./monaco-languages";
import tmthemeToMonaco from "./utils/tmtheme-to-monaco";
import { wireTmGrammars } from "./utils/set-grammers";

import "./MonacoEditor.css";

const plist = [
  "source.python",
  "source.regexp.python",
  "source.haskell",
  "source.java",
  "text.html.javadoc",
];

const themes = [
  { name: "One Dark", value: "one-dark" },
  { name: "SynthWave '84", value: "synthwave" },
  { name: "Dracula", value: "dracula" },
  { name: "Tomorrow Light", value: "tomorrow" },
];

const languages = [
  { name: "C++", value: "cpp" },
  { name: "C", value: "c" },
  { name: "Clojure", value: "clojure" },
  { name: "C#", value: "cs" },
  { name: "CSS", value: "css" },
  { name: "Dockerfile", value: "dockerfile" },
  { name: "Golang", value: "go" },
  { name: "Haskell", value: "haskell" },
  { name: "HTML", value: "html" },
  { name: "Java", value: "java" },
  { name: "JavaScript", value: "js" },
  { name: "React", value: "jsx" },
  { name: "JSON", value: "json" },
  { name: "Lua", value: "lua" },
  { name: "Objective-C", value: "objc" },
  { name: "Perl", value: "perl" },
  { name: "PHP", value: "php" },
  { name: "Python", value: "python" },
  { name: "R", value: "r" },
  { name: "Ruby", value: "ruby" },
  { name: "Rust", value: "rust" },
  { name: "SQL", value: "sql" },
  { name: "Swift", value: "swift" },
  { name: "XML", value: "xml" },
  { name: "YAML", value: "yaml" },
];

const registry = new Registry({
  getGrammarDefinition: async scopeName => {
    const [languageId] = languagesToRegister.find(([, scope]) => scope === scopeName);
    console.log("languageId :", languageId);

    const format = plist.includes(scopeName) ? "plist" : "json";
    const url =
      format === "plist"
        ? `/grammers/${languageId}.tmLanguage`
        : `/grammers/${languageId}.tmLanguage.json`;
    return {
      format,
      content: await (await fetch(url)).text(),
    };
  },
});

async function liftOff(monaco, languageId, editor) {
  // map of monaco "language id's" to TextMate scopeNames
  const [, scope] = languagesToRegister.find(([id]) => id === languageId);

  const grammers = new Map();
  grammers.set(languageId, scope);

  await wireTmGrammars(monaco, registry, grammers, editor);
}

const Editor = forwardRef(({ defaultValue, defaultMode, defaultTheme, minHeight }, ref) => {
  const [value, setValue] = useState("function add(num1, num2) { return num1 + num2 };");
  const [editorPaddingColor, setEditorPaddingColor] = useState("#ffffff00");
  const [theme, setTheme] = useState(defaultTheme || themes[0].value);
  const [mode, setMode] = useState(defaultMode || languages[0].value);
  const [fontSize, setFontSize] = useState(15);
  const editorRef = React.useRef(null);
  const monacoRef = React.useRef(null);

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    console.log("editor, monaco :", editor, monaco);
    editor.focus();
    fitContent(editor);
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

  const handleThemeChange = setTheme;
  const handleLanguageChange = setMode;

  const handleFontSizeChange = fontSize => setFontSize(Number(fontSize));

  useEffect(() => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (monaco && editor) {
      import(`./monaco-themes/${theme}-tmtheme`)
        .then(({ default: data }) => {
          const transformedTheme = tmthemeToMonaco(data);
          setEditorPaddingColor(transformedTheme.colors["editor.background"]);
          monaco.editor.defineTheme(theme, transformedTheme);
        })
        .then(() => liftOff(monaco, mode, editor))
        .then(() => void monaco.editor.setModelLanguage(editor.getModel(), mode))
        .then(() => monaco.editor.setTheme(theme))
        .catch(err => {
          console.error(err);
          monaco.editor.setTheme(theme);
        });
    }
  }, [theme, mode]);

  const fitContent = editor => {
    setTimeout(() => {
      const newNumLines = editor._modelData.viewModel.getLineCount();
      const viewlineEl = editor._domElement.getElementsByClassName("view-line")[0];
      // For some reason viewlineEl is `undefined` for sometimes
      if (viewlineEl) {
        editor._domElement.style.height = `${viewlineEl.clientHeight * newNumLines + 15}px`;
      }
    }, 50); // UI has not updated even after event
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const model = editor.getModel();

      model.onDidChangeContent(e => {
        fitContent(editor);
      });
      editor.onDidChangeConfiguration(e => {
        fitContent(editor);
      });
    }
  }, []);

  // useEffect(() => {
  //   let intervalId;
  //   intervalId = setInterval(() => {
  //     const monacoRootNode = document.querySelector(".react-monaco-editor-container");
  //     const viewLineNode = monacoRootNode.querySelector(".view-line");

  //     if (viewLineNode.clientWidth > monacoRootNode.clientWidth) {
  //       console.log("inside loop");
  //       monacoRootNode.style.width = `${viewLineNode.clientWidth}px`;
  //     } else {
  //       clearInterval(intervalId);
  //     }
  //   }, 500);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.updateOptions({ fontSize: Number(fontSize) });
    }
  }, [fontSize]);

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
    fontSize: fontSize,
    occurrencesHighlight: false,
    renderLineHighlight: "none",
    scrollBeyondLastColumn: -1,
    value: defaultValue,
  };

  return (
    <div className="MonacoEditor" style={{ padding: 15, backgroundColor: editorPaddingColor }}>
      <MonacoReactComponent
        value={value}
        options={options}
        onChange={setValue}
        editorWillMount={editorWillMount}
        editorDidMount={editorDidMount}
        minHeight={minHeight}
      />
      <input className="SettingsIcon" type="button" value="&#x2699;" /> {/* Dont change this el */}
      <div className="EditorSettingsBar">
        <select
          className="Select"
          onChange={e => handleThemeChange(e.target.value)}
          defaultValue={theme}
        >
          {themes.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
        <span className="Seperator" />
        <select
          className="Select"
          onChange={e => handleLanguageChange(e.target.value)}
          defaultValue={mode}
        >
          {languages.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
        <span className="Seperator" />
        <input
          className="FontSizeSelect"
          type="number"
          defaultValue={fontSize}
          min={12}
          max={24}
          onChange={e => handleFontSizeChange(e.target.value)}
        />
      </div>
    </div>
  );
});

export default Editor;

// https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable/
// https://stackoverflow.com/questions/53448735/is-there-a-way-to-completely-hide-the-gutter-of-monaco-editor
// https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable
// https://github.com/Microsoft/monaco-editor/issues/794
