import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  $getSelection,
  $isRangeSelection,
  mergeRegister,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";




export default function TextStylingToolbar({ darkMode, setDarkMode }) {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),

      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),

      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateToolbar]);

  const handleHeading = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode("h1"));
      }
    });
  };

  return (
    <div className="mb-3 py-1 space-x-1 bg-gray-100 dark:bg-gray-900 rounded-full  text-center  inset-shadow-sm shadow-sm">
      <button
        className={
          isBold
            ? "px-2 font-bold bg-gray-200 rounded"
            : "px-2 font-bold"
        }
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }
      >
        B
      </button>

      <button
        className={
          isItalic
            ? "px-2 italic font-bold bg-gray-200 rounded ring"
            : "px-2 italic font-bold"
        }
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }
      >
        I
      </button>

      <button
        onClick={handleHeading}
        className="size-8 rounded-md"
      >
        H1
      </button>

      <button
        disabled={!canUndo}
        onClick={() =>
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }
        className="toolbar-item spaced disabled:text-gray-500"
        aria-label="Undo"
      >
        Undo
      </button>

      <button
        disabled={!canRedo}
        onClick={() =>
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }
        className="toolbar-item spaced disabled:text-gray-500"
        aria-label="Redo"
      >
        Redo
      </button>
    </div>
  );
}