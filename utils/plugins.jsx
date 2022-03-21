// Use a dynamic import with ssr: false for these
// optional scripts to avoid the following error:
// > ReferenceError: navigator is not defined #77
// https://github.com/JedWatson/react-codemirror/issues/77
import dynamic from "next/dynamic";
const CodeEditor = dynamic(
  dynamic(() => {
    // Load all the JS dependencies for the code editor
    import("codemirror/mode/htmlmixed/htmlmixed");
    import("codemirror/keymap/sublime.js");
    import("codemirror/addon/edit/matchbrackets.js");
    import("codemirror/addon/edit/closebrackets.js");
    // Return the CodeEditor component itself
    return import("./CodeEditor.tsx");
  }),
  { ssr: false }
);

export const CodeEditorPlugin = {
  __type: "field",
  name: "code-editor",
  type: "string",
  Component: CodeEditor,
};
