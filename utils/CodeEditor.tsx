import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/keymap/sublime.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/closebrackets.js";

const CodeEditor = (props) => {
  return (
    <div className="relative mb-5">
      <label htmlFor={props.field.name}>
        <strong>{props.field.label}</strong>
      </label>
      <CodeMirror
        {...props}
        value={props.input.value}
        options={{
          theme: "material",
          mode: "htmlmixed",
          lineNumbers: true,
          keyMap: "sublime",
          lineWrapping: true,
          styleActiveLine: true,
          showCursorWhenSelecting: true,
          // viewportMargin: Infinity (and height: auto) to enable auto-resize
          viewportMargin: Infinity,
          matchBrackets: true,
          autoCloseBrackets: true,
          gutters: ["CodeMirror-lint-markers"],
          lint: true,
        }}
        onBeforeChange={(editor, data, value) => {
          // Call the native form input onChange event
          props.input.onChange(value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
