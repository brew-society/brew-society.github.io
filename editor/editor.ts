import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { lineNumbers } from "@codemirror/gutter";
// import { specialChars } from "@codemirror/special-chars";
import {
  history,
  redo,
  redoSelection,
  undo, 
  undoSelection
} from "@codemirror/history";
import { foldCode, unfoldCode, foldGutter } from "@codemirror/fold";
import { javascript } from "@codemirror/lang-javascript";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { defaultKeymap, defaultTabBinding, standardKeymap } from "@codemirror/commands";
import { bracketMatching } from "@codemirror/matchbrackets";
import { closeBrackets } from "@codemirror/closebrackets";
// import { keymap } from "@codemirror/keymap";
import { esLint } from "@codemirror/lang-javascript";

// @ts-ignore
import Linter from "eslint4b-prebuilt";
import { linter, openLintPanel } from "@codemirror/lint";

let isMac = /Mac/.test(navigator.platform);
let myView = new EditorView({
  state: EditorState.create({
    doc: ``,
    extensions: [
      lineNumbers(),
      // specialChars(),
      history(),
      foldGutter(),
      javascript(),
      linter(esLint(new Linter())),
      defaultHighlightStyle,
      bracketMatching(),
      closeBrackets(),
      keymap.of([...standardKeymap, defaultTabBinding])
    ]
  })
});

document.getElementById('input').appendChild(myView.dom);

document.getElementById('run').onclick = async function () {
 
  var documentText = ((myView.state.doc as any).text as Array<string>).join('\n');
  var bodyData = {
    language: 'js',
    source: documentText 
  };
  
  try {
    const fetchResponse = await fetch(`https://emkc.org/api/v1/piston/execute`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(bodyData)
    });
    const data = await fetchResponse.json();
    console.log(data);

    if (!data.error) {

      document.getElementById('output').innerHTML = data.output.replace(/\n/g, '<br>');

    }

  } catch (e) {
      return e;
  }

};