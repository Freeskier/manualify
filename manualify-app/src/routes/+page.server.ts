import { Window, Document } from 'happy-dom';
import undom from 'undom';

import { createDocument, createWindow } from 'domino'
import { createEditor, RootNode } from "lexical";
import { registerRichText, QuoteNode, HeadingNode } from "@lexical/rich-text";
import { $generateHtmlFromNodes as generateHtmlFromNodes } from "@lexical/html";


export async function load() {
  const win = new Window()
  const doc = win.document

  globalThis.window = win;
  globalThis.document = doc;

  const e = createEditor({ nodes: [QuoteNode, HeadingNode] });

  const s = e.parseEditorState({
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "asd asd asd",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: " asd asd  ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 2,
              mode: "normal",
              style: "",
              text: "asd asd",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
          textFormat: 0,
          textStyle: "",
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });

  const editor = createEditor({
    nodes: [QuoteNode, HeadingNode],
    editorState: s,

  });

  const asd = editor.read(() => {
    const html = generateHtmlFromNodes(editor, null);
    return html
  })

  return {
    hat: asd
  };
}