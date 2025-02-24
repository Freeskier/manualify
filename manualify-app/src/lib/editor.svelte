<script lang="ts">
  import { createEditor, RootNode } from "lexical";
  import { registerRichText, QuoteNode, HeadingNode } from "@lexical/rich-text";
  import { theme } from "./DefaultEditorTheme";
  import { onMount } from "svelte";
  import { $generateHtmlFromNodes as generateHtmlFromNodes } from "@lexical/html";

  //const wind = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

  const asd = {
    editorState: {
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
    },
    lastSaved: 1740429584448,
    source: "Playground",
    version: "0.25.0",
  };

  let editorRef;
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

  registerRichText(e);

  const editor = createEditor({
    nodes: [QuoteNode, HeadingNode],
    theme: theme,
    editorState: s,
  });

  // const html = generateHtmlFromNodes(editor, null);
  // console.log(html);

  onMount(() => {
    editor.setRootElement(editorRef);
  });
</script>

<div bind:this={editorRef} contenteditable></div>

<style>
  div {
    min-height: 200px;
  }
</style>
