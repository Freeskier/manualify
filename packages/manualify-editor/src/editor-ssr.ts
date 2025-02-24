import { JSDOM } from "jsdom";
import { createEditor, RootNode } from "lexical";
import { registerRichText, QuoteNode, HeadingNode } from "@lexical/rich-text";
import { $generateHtmlFromNodes as generateHtmlFromNodes } from "@lexical/html";

export function editorssr() {
  const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  const e = createEditor({})
  return 'editor-ssr';
}