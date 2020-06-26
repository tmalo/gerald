import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "./editor.css";

const tb_options = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "image",
    "remove",
    "history",
  ],
  inline: {
    options: ["bold", "italic", "underline", "strikethrough"],
  },
};
const RichEditor = (props) => (
  <Editor
    {...props}
    toolbar={tb_options}
    hashtag={{
      separator: " ",
      trigger: "#",
    }}
  />
);

export default RichEditor;
