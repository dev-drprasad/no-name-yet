import React, { useState, useEffect } from "react";

import domtoimage from "dom-to-image";

import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";

import "./App.css";

const themes = [
  { name: "One Dark", value: "one-dark" },
  { name: "One Dark Vivid", value: "one-dark-vivid" },
  { name: "Monokai", value: "monokai" },
  { name: "Tomorrow", value: "tomorrow" },
  { name: "XCode", value: "xcode" },
  { name: "Solarized Light", value: "solarized_light" },
  { name: "Dracula", value: "dracula" }
];

const languages = [
  { name: "abap", value: "abap" },
  { name: "abc", value: "abc" },
  { name: "actionscript", value: "actionscript" },
  { name: "ada", value: "ada" },
  { name: "apache_conf", value: "apache_conf" },
  { name: "applescript", value: "applescript" },
  { name: "asciidoc", value: "asciidoc" },
  { name: "assembly_x86", value: "assembly_x86" },
  { name: "autohotkey", value: "autohotkey" },
  { name: "batchfile", value: "batchfile" },
  { name: "bro", value: "bro" },
  { name: "c9search", value: "c9search" },
  { name: "c_cpp", value: "c_cpp" },
  { name: "cirru", value: "cirru" },
  { name: "clojure", value: "clojure" },
  { name: "cobol", value: "cobol" },
  { name: "coffee", value: "coffee" },
  { name: "coldfusion", value: "coldfusion" },
  { name: "csharp", value: "csharp" },
  { name: "csound_document", value: "csound_document" },
  { name: "csound_orchestra", value: "csound_orchestra" },
  { name: "csound_score", value: "csound_score" },
  { name: "css", value: "css" },
  { name: "curly", value: "curly" },
  { name: "d", value: "d" },
  { name: "dart", value: "dart" },
  { name: "diff", value: "diff" },
  { name: "django", value: "django" },
  { name: "dockerfile", value: "dockerfile" },
  { name: "dot", value: "dot" },
  { name: "drools", value: "drools" },
  { name: "eiffel", value: "eiffel" },
  { name: "ejs", value: "ejs" },
  { name: "elixir", value: "elixir" },
  { name: "elm", value: "elm" },
  { name: "erlang", value: "erlang" },
  { name: "forth", value: "forth" },
  { name: "fortran", value: "fortran" },
  { name: "ftl", value: "ftl" },
  { name: "gcode", value: "gcode" },
  { name: "gherkin", value: "gherkin" },
  { name: "gitignore", value: "gitignore" },
  { name: "glsl", value: "glsl" },
  { name: "gobstones", value: "gobstones" },
  { name: "golang", value: "golang" },
  { name: "graphqlschema", value: "graphqlschema" },
  { name: "groovy", value: "groovy" },
  { name: "haml", value: "haml" },
  { name: "handlebars", value: "handlebars" },
  { name: "haskell", value: "haskell" },
  { name: "haskell_cabal", value: "haskell_cabal" },
  { name: "haxe", value: "haxe" },
  { name: "hjson", value: "hjson" },
  { name: "html", value: "html" },
  { name: "html_elixir", value: "html_elixir" },
  { name: "html_ruby", value: "html_ruby" },
  { name: "ini", value: "ini" },
  { name: "io", value: "io" },
  { name: "jack", value: "jack" },
  { name: "jade", value: "jade" },
  { name: "java", value: "java" },
  { name: "javascript", value: "javascript" },
  { name: "json", value: "json" },
  { name: "jsoniq", value: "jsoniq" },
  { name: "jsp", value: "jsp" },
  { name: "jssm", value: "jssm" },
  { name: "jsx", value: "jsx" },
  { name: "julia", value: "julia" },
  { name: "kotlin", value: "kotlin" },
  { name: "latex", value: "latex" },
  { name: "lean", value: "lean" },
  { name: "less", value: "less" },
  { name: "liquid", value: "liquid" },
  { name: "lisp", value: "lisp" },
  { name: "live_script", value: "live_script" },
  { name: "livescript", value: "livescript" },
  { name: "logiql", value: "logiql" },
  { name: "lsl", value: "lsl" },
  { name: "lua", value: "lua" },
  { name: "luapage", value: "luapage" },
  { name: "lucene", value: "lucene" },
  { name: "makefile", value: "makefile" },
  { name: "markdown", value: "markdown" },
  { name: "mask", value: "mask" },
  { name: "matlab", value: "matlab" },
  { name: "mavens_mate_log", value: "mavens_mate_log" },
  { name: "maze", value: "maze" },
  { name: "mel", value: "mel" },
  { name: "mips_assembler", value: "mips_assembler" },
  { name: "mipsassembler", value: "mipsassembler" },
  { name: "mushcode", value: "mushcode" },
  { name: "mysql", value: "mysql" },
  { name: "nix", value: "nix" },
  { name: "nsis", value: "nsis" },
  { name: "objectivec", value: "objectivec" },
  { name: "ocaml", value: "ocaml" },
  { name: "pascal", value: "pascal" },
  { name: "perl", value: "perl" },
  { name: "pgsql", value: "pgsql" },
  { name: "php", value: "php" },
  { name: "pig", value: "pig" },
  { name: "plain_text", value: "plain_text" },
  { name: "powershell", value: "powershell" },
  { name: "praat", value: "praat" },
  { name: "prolog", value: "prolog" },
  { name: "properties", value: "properties" },
  { name: "protobuf", value: "protobuf" },
  { name: "python", value: "python" },
  { name: "r", value: "r" },
  { name: "razor", value: "razor" },
  { name: "rdoc", value: "rdoc" },
  { name: "red", value: "red" },
  { name: "rhtml", value: "rhtml" },
  { name: "rst", value: "rst" },
  { name: "ruby", value: "ruby" },
  { name: "rust", value: "rust" },
  { name: "sass", value: "sass" },
  { name: "scad", value: "scad" },
  { name: "scala", value: "scala" },
  { name: "scheme", value: "scheme" },
  { name: "scss", value: "scss" },
  { name: "sh", value: "sh" },
  { name: "sjs", value: "sjs" },
  { name: "smarty", value: "smarty" },
  { name: "snippets", value: "snippets" },
  { name: "soy_template", value: "soy_template" },
  { name: "space", value: "space" },
  { name: "sparql", value: "sparql" },
  { name: "sql", value: "sql" },
  { name: "sqlserver", value: "sqlserver" },
  { name: "stylus", value: "stylus" },
  { name: "svg", value: "svg" },
  { name: "swift", value: "swift" },
  { name: "swig", value: "swig" },
  { name: "tcl", value: "tcl" },
  { name: "tex", value: "tex" },
  { name: "text", value: "text" },
  { name: "textile", value: "textile" },
  { name: "toml", value: "toml" },
  { name: "tsx", value: "tsx" },
  { name: "turtle", value: "turtle" },
  { name: "twig", value: "twig" },
  { name: "typescript", value: "typescript" },
  { name: "vala", value: "vala" },
  { name: "vbscript", value: "vbscript" },
  { name: "velocity", value: "velocity" },
  { name: "verilog", value: "verilog" },
  { name: "vhdl", value: "vhdl" },
  { name: "wollok", value: "wollok" },
  { name: "xml", value: "xml" },
  { name: "xquery", value: "xquery" },
  { name: "yaml", value: "yaml" }
];

const DEFAULT_THEME = themes[0].value;
const DEFAULT_MODE = "javascript";
const TWEETER_URL =
  process.env.REACT_APP_CUSTOM_ENV_TWEETER_URL || window.location.href;

const getTwitterEmbeddableImageUrl = blob => {
  const form = new FormData();
  form.append("file", blob);
  return fetch(new URL("/api/tweet", TWEETER_URL), {
    method: "POST",
    body: form
  })
    .then(res => res.json())
    .then(result => result.imageUrl);
};

const tweet = text => {
  const width = 575;
  const height = 400;
  const left = (window.outerWidth - width) / 2;
  const top = (window.outerHeight - height) / 2;
  const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;

  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    "twitter",
    opts
  );
};

function App() {
  const [cardBGColor, setCardBGColor] = useState("#00a8e8");
  const [selectedCard, setSelecctedCard] = useState(0);
  const cardRef = React.useRef(null);
  const editorRef = React.useRef(null);

  const handleBeforeLoad = ace => {
    ace.config.set("themePath", process.env.PUBLIC_URL + "/js/ace/themes/");
  };
  const download = () => {
    domtoimage.toBlob(cardRef.current).then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `card-${Date.now() + Math.floor(Math.random() * 5000)}`;
      a.click();
    });
  };

  const handleTweet = () => {
    domtoimage
      .toBlob(cardRef.current)
      .then(getTwitterEmbeddableImageUrl)
      .then(tweet);
  };

  const handleThemeChange = theme => {
    const editor = editorRef.current.editor;
    import(`brace/theme/${theme}`)
      .then(() => {
        editor.setTheme(`ace/theme/${theme}`);
      })
      .catch(() => editor.setTheme(`ace/theme/${theme}`));
  };

  const handleLanguageChange = language => {
    const editor = editorRef.current.editor;
    import(`brace/mode/${language}`)
      .then(() => {
        editor.getSession().setMode(`ace/mode/${language}`);
      })
      .catch(() => editor.getSession().setMode(`ace/mode/${language}`));
  };

  useEffect(() => {
    const handler = event => {
      event.preventDefault();
      const text = event.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    };

    document
      .querySelectorAll('div[contenteditable="true"]')
      .forEach(el => el.addEventListener("paste", handler));

    return () =>
      document
        .querySelectorAll('div[contenteditable="true"]')
        .forEach(el => el.removeEventListener("paste", handler));
  }, [selectedCard]);

  useEffect(() => {
    // some cards wont have editors
    if (editorRef.current) {
      const editor = editorRef.current.editor;

      editor.setOptions({
        fontFamily: "Fira Code"
      });

      editor.renderer.setScrollMargin(15, 15, 15, 15);
      editor.renderer.setPadding(15);
    }
  }, [selectedCard]);
  return (
    <div className="App">
      <div className="Sidebar">
        <ul className="CardList">
          <li onClick={() => setSelecctedCard(0)}>
            <img
              src={process.env.PUBLIC_URL + "/images/card1.png"}
              alt="template 1"
            />
          </li>
          <li onClick={() => setSelecctedCard(1)}>
            <img
              src={process.env.PUBLIC_URL + "/images/card2.png"}
              alt="template 2"
            />
          </li>
          <li onClick={() => setSelecctedCard(2)}>
            <img
              src={process.env.PUBLIC_URL + "/images/card3.png"}
              alt="template 3"
            />
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
            <label>
              Code theme:
              <select onChange={e => handleThemeChange(e.target.value)}>
                {themes.map(({ name, value }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Language:
              <select onChange={e => handleLanguageChange(e.target.value)}>
                {languages.map(({ name, value }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {selectedCard === 0 && (
            <Card1
              theme={DEFAULT_THEME}
              mode={DEFAULT_MODE}
              ref={{ cardRef, editorRef }}
              cardBGColor={cardBGColor}
            />
          )}
          {selectedCard === 1 && (
            <Card2
              theme={DEFAULT_THEME}
              mode={DEFAULT_MODE}
              ref={{ cardRef, editorRef }}
              cardBGColor={cardBGColor}
            />
          )}
          {selectedCard === 2 && (
            <Card3 ref={cardRef} cardBGColor={cardBGColor} />
          )}
        </div>
        <div>
          <button type="button" onClick={download}>
            Download
          </button>
          <button type="button" onClick={handleTweet}>
            Tweet
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
