// Use a dynamic import with ssr: false for these
// optional scripts to avoid the following error:
// > ReferenceError: navigator is not defined #77
// https://github.com/JedWatson/react-codemirror/issues/77
import dynamic from "next/dynamic";
const CodeEditor = dynamic(import("./CodeEditor.tsx"), { ssr: false });

export const CodeEditorPlugin = {
  __type: "field",
  name: "code-editor",
  type: "string",
  Component: CodeEditor,
};
