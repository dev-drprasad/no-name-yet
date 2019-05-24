import React from "react";
import "monaco-editor";

const noop = () => {};

class MonacoEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerElement = undefined;
  }

  componentDidMount() {
    this.afterViewInit();
  }

  componentWillUnmount() {
    this.destroyMonaco();
  }

  editorWillMount = monaco => {
    const { editorWillMount } = this.props;
    editorWillMount(monaco);
  };

  editorDidMount = (editor, monaco) => {
    this.props.editorDidMount(editor, monaco);
  };

  afterViewInit = () => {
    const context = this.props.context || window;

    if (context.monaco !== undefined) {
      this.initMonaco();
      return;
    }

    this.initMonaco();
  };

  initMonaco = () => {
    const context = this.props.context || window;
    const { theme, options } = this.props;
    if (this.containerElement && typeof context.monaco !== "undefined") {
      // Before initializing monaco editor
      this.editorWillMount(context.monaco);

      const appliedOptions = { ...options };

      this.editor = context.monaco.editor.create(this.containerElement, appliedOptions);
      if (theme) {
        context.monaco.editor.setTheme(theme);
      }

      // After initializing monaco editor
      this.editorDidMount(this.editor, context.monaco);
    }
  };

  destroyMonaco = () => {
    if (typeof this.editor !== "undefined") {
      this.editor.dispose();
    }
  };

  assignRef = component => {
    this.containerElement = component;
  };

  render() {
    const { width, height, minHeight } = this.props;
    const fixedWidth = width.toString().indexOf("%") !== -1 ? width : `${width}px`;
    const fixedHeight = height.toString().indexOf("%") !== -1 ? height : `${height}px`;
    const style = {
      width: fixedWidth,
      height: fixedHeight,
      overflow: "hidden",
      minHeight,
      // position: "absolute",
    };

    return <div ref={this.assignRef} style={style} className="react-monaco-editor-container" />;
  }
}

MonacoEditor.defaultProps = {
  width: "100%",
  height: "100%",
  minHeight: 300,
  theme: null,
  options: {},
  editorDidMount: noop,
  editorWillMount: noop,
  onChange: noop,
};

export default React.memo(MonacoEditor, () => true);
