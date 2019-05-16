import React, { useEffect, forwardRef } from "react";
import AceEditor from "react-ace";

const CodeEditor = forwardRef(({ theme, mode }, ref) => {
  const handleBeforeLoad = ace => {
    ace.config.set("themePath", process.env.PUBLIC_URL + "/js/ace/themes/");
  };

  useEffect(() => {
    // some cards wont have editors
    if (ref.current) {
      const editor = ref.current.editor;

      import(`brace/theme/${theme}`)
        .then(() => {
          editor.setTheme(`ace/theme/${theme}`);
        })
        .catch(() => editor.setTheme(`ace/theme/${theme}`));
    }
  }, [ref, theme]);

  useEffect(() => {
    // some cards wont have editors
    if (ref.current) {
      const editor = ref.current.editor;

      editor.setOptions({
        fontFamily: "Fira Code",
      });

      editor.renderer.setScrollMargin(15, 15, 15, 15);
      editor.renderer.setPadding(15);
    }
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      const editor = ref.current.editor;
      import(`brace/mode/${mode}`)
        .then(() => {
          editor.getSession().setMode(`ace/mode/${mode}`);
        })
        .catch(() => editor.getSession().setMode(`ace/mode/${mode}`));
    }
  }, [ref, mode]);

  return (
    <AceEditor
      className="CodeEditor"
      name="code-editor"
      width="100%"
      theme={theme}
      mode={mode}
      ref={ref}
      maxLines={Infinity}
      minLines={15}
      fontSize={20}
      showGutter={false}
      wrapEnabled
      tabSize={2}
      highlightActiveLine={false}
      highlightGutterLine={false}
      onBeforeLoad={handleBeforeLoad}
    />
  );
});

export default CodeEditor;
