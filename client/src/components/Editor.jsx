import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  $isListNode,
  REMOVE_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { QuoteNode, HeadingNode, $isHeadingNode, $createQuoteNode, $createHeadingNode } from "@lexical/rich-text";
import { $isCodeNode, $createCodeNode, getCodeLanguages, getDefaultCodeLanguage } from "@lexical/code";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const LowPriority = 1;

const supportedBlockTypes = new Set(["paragraph", "quote", "code", "h1", "h2", "ul", "ol"]);

const blockTypeToBlockName = {
  code: "Code",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List",
};
