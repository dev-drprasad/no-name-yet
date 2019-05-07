ace.define(
  "ace/theme/one-dark-vivid",
  ["require", "exports", "module", "ace/lib/dom"],
  function(require, exports, module) {
    exports.isDark = true;
    exports.cssClass = "ace-one-dark-vivid";
    exports.cssText = `
    .ace-one-dark-vivid .ace_gutter {
      background: #282C34;
      color: #5C6370;
    }
  
    .ace-one-dark-vivid .ace_print-margin {
      width: 1px;
      background: #424451;
    }
    
    .ace-one-dark-vivid {
    background-color: #282C34;
    color: #ABB2BF;
    }
    
    .ace-one-dark-vivid .ace_cursor {
      color: #528BFF;
    }
    .ace-one-dark-vivid .ace_marker-layer .ace_selection {
      background: #3D4350;
    }
    
    .ace-one-dark-vivid.ace_multiselect .ace_selection.ace_start {
      box-shadow: 0 0 3px 0 #268BD2;
    }
  
    .ace-one-dark-vivid .ace_marker-layer .ace_step {
      background: #3A6DA0;
    }
  
    .ace-one-dark-vivid .ace_marker-layer .ace_bracket {
      background-color: #2B313A;
      border: 1px solid #3A6DA0;
    }
    
    .ace-one-dark-vivid .ace_marker-layer .ace_active-line {
      background-color: #2B313A;
    }
  
    .ace-one-dark-vivid .ace_gutter-active-line {
      background-color: #2B313A;
    }
  
    .ace-one-dark-vivid .ace_marker-layer .ace_selected-word {
      background-color: #2B313A;
      border: 1px solid #3D4350;
    }
  
  .ace-one-dark-vivid .ace_invisible {
    color: #5C6370;
  };
  .ace-one-dark-vivid .ace_entity.ace_name.ace_tag,
  .ace-one-dark-vivid .ace_meta.ace_tag,
  .ace-one-dark-vivid .ace_storage {
    color: #d55fde;
  }
  .ace-one-dark-vivid .ace_keyword {
    color: #d55fde;
  }
  .ace-one-dark-vivid .ace_operator {
    color: #2bbac5;
  }
  .ace-one-dark-vivid .ace_tag-name {
    color: #e5c07b;
  }
  .ace-one-dark-vivid .ace_punctuation,
  .ace-one-dark-vivid .ace_punctuation.ace_tag {
    color: #abb2bf;
  }
  .ace-one-dark-vivid .ace_entity.ace_other.ace_attribute-name,\
  .ace-one-dark-vivid .ace_constant.ace_character,\
  .ace-one-dark-vivid .ace_constant.ace_language,\
  .ace-one-dark-vivid .ace_constant.ace_numeric,\
  .ace-one-dark-vivid .ace_constant.ace_other {\
  color: #d19a66\
  }\
  .ace-one-dark-vivid .ace_invalid {\
  color: #fff;\
  background-color: #900\
  }\
  .ace-one-dark-vivid .ace_invalid.ace_deprecated {\
  color: #fff;\
  background-color: #900\
  }\
  .ace-one-dark-vivid .ace_support.ace_constant {\
  color: #FFC66D\
  }\
  .ace-one-dark-vivid .ace_support.ace_function {\
  color: #61AFEF\
  }\
  .ace-one-dark-vivid .ace_fold {\
  background-color: #5C6370;\
  border-color: #93A1A1\
  }\
  .ace-one-dark-vivid .ace_storage.ace_type,\
  .ace-one-dark-vivid .ace_support.ace_class,\
  .ace-one-dark-vivid .ace_support.ace_type {\
  color: #d55fde\
  }\
  .ace-one-dark-vivid .ace_entity.ace_other,\
  .ace-one-dark-vivid .ace_entity.ace_name.ace_function {\
  color: #61AFEF\
  }\
  
  .ace-one-dark-vivid .ace_variable {
    color: #ef596f;
  }
  .ace-one-dark-vivid .ace_identifier {
    color: #ef596f;
  }
  .ace-one-dark-vivid .ace_variable.ace_parameter {
    color: #d19a66;
  }
  .ace-one-dark-vivid .ace_string {
    color: #89ca78;
  }
  .ace-one-dark-vivid .ace_comment {
    font-style: italic;
    color: #5C6370;
  }
  
  .ace-one-dark-vivid .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNQ1NbwZfALD/4PAAlTArlEC4r/AAAAAElFTkSuQmCC) right repeat-y
  }`;

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
  }
);
