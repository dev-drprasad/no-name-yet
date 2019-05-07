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

      editor.setOptions({
        fontFamily: "Fira Code",
        theme: `ace/theme/${theme}`,
        mode: `ace/mode/${mode}`
      });

      editor.renderer.setScrollMargin(15, 15, 15, 15);
      editor.renderer.setPadding(15);
    }
  }, [ref, theme, mode]);

  console.log("mode :", mode);

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
