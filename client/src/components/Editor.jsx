import * as Toggle from "@radix-ui/react-toggle";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic } from "lucide-react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../shared/fetch.js";
import { getTokenFromCookies } from "../shared/token.js";

export default function Editor({ editable = true, content = "", title = null, onSubmit }) {
  const params = useParams();
  const token = getTokenFromCookies();
  const navigate = useNavigate();
  const storyId = params.storyId;

  const [validation, setValidation] = useState(false);
  const [submit, setSubmitStatus] = useState(false);
  const inputRef = useRef(null);
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable,
  });
  if (!editor) return null;

  async function handleEditor() {
    const content = editor?.getJSON();
    const title = inputRef?.current?.value;

    const data = {
      title,
      content,
    };

    const post = await fetchData(`stories/${storyId}/chapters`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (post.message === "Internal server error") {
      return setSubmitStatus("Failed on creating new chapter");
    }
    return navigate(`/story/${storyId}/chapter/${post.chapter.id}`);
  }

  function trigger() {
    setValidation(false);
    const title = inputRef?.current?.value;
    if (title.length < 1) {
      return setValidation("Title cannot be empty");
    }
    const content = editor?.getJSON();
    const data = {
      title,
      content,
    };
    return onSubmit(data);
  }

  return (
    <main className="flex flex-col space-y-8">
      <section className="flex flex-col space-y-2">
        <label htmlFor="title">Title</label>
        <input
          ref={inputRef}
          className="w-full border-2 border-line px-3 py-2.5 focus:outline-none focus:ring-transparent lg:w-1/3"
          name="title"
          value={title ? title : ""}
        />
        {validation && <p className="text-red-500">{validation}</p>}
      </section>
      <section className="flex flex-col space-y-2 border-2 border-line">
        <div className="p-2">
          <section className="flex w-1/3 flex-row space-x-1 border-[1px] border-line/20 p-1">
            <Toggle.Root
              onPressedChange={() => editor?.chain().focus().toggleBold().run()}
              className={`p-2 ${editor?.isActive("bold") ? "bg-primary text-white" : ""}`}
            >
              <Bold className="h-4 w-4" />
            </Toggle.Root>
            <Toggle.Root
              onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
              className={`p-2 ${editor?.isActive("italic") ? "bg-primary text-white" : ""}`}
            >
              <Italic className="h-4 w-4" />
            </Toggle.Root>
          </section>
        </div>
        <EditorContent editor={editor} className="min-h-24 px-3 py-2.5 focus:outline-none focus:ring-transparent" />
      </section>
      <button className="btn-primary" onClick={trigger}>
        Publish
      </button>
      {submit && <p className="text-red-500">{submit}</p>}
    </main>
  );
}

Editor.propTypes = {
  editable: PropTypes.bool,
  content: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
};
