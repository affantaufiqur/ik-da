import { generateHTML } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import PropTypes from "prop-types";

export default function EditorRender({ content }) {
  const generateHtml = useMemo(() => {
    return generateHTML(content, [StarterKit]);
  }, [content]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: generateHtml,
    editable: false,
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
}

EditorRender.propTypes = {
  content: PropTypes.object.isRequired,
};
