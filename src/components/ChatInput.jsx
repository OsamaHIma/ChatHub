"use client";

import { useRef, useState } from "react";
import { Send, SmileIcon, PaperclipIcon } from "lucide-react";
import {
  IconButton,
  Textarea,
  Menu,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import Picker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");

  const handelEmojiPickerClick = (emoji, event) => {
    const emojiCount = event.detail || 1;
    const emojiString = emoji.emoji.repeat(emojiCount);
    setMsg((prevMsg) => prevMsg + emojiString);
  };

  const fileInputRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const formatCodeBlocks = (message) => {
    const codeRegex = /```([\s\S]+?)```/g;
    const formattedMessage = message.replace(codeRegex, "<code>$1</code>");
    return formattedMessage;
  };

  const handleMessageChange = (event) => {
    const formattedMessage = formatCodeBlocks(event.target.value);
    setMsg(formattedMessage);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 flex min-w-[15.5rem] items-center gap-5"
      noValidate
    >
      <div className="flex w-full flex-row items-center gap-2 rounded-full border border-gray-900/10 bg-gray-900/5 p-2 dark:border-gray-100/10 dark:bg-gray-800">
        <div className="flex">
          <input type="file" ref={fileInputRef} style={{ display: "none" }} />

          <IconButton
            variant="text"
            className="relative rounded-full"
            onClick={() => fileInputRef.current.click()}
          >
            {/* {selectedImage && (
                          <div className="absolute inset-0 -top-1 h-3 w-3 rounded-full bg-green-600"></div>
                        )} */}
            <PaperclipIcon className="dark:text-stone-300" />
          </IconButton>
        </div>
        <Menu
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <MenuHandler>
            <IconButton
              variant="text"
              className="relative rounded-full"
              type="button"
            >
              <SmileIcon className="inline-block dark:text-slate-50" />
            </IconButton>
          </MenuHandler>
          <MenuList>
            <Picker onEmojiClick={handelEmojiPickerClick} />
          </MenuList>
        </Menu>
        <Textarea
          rows={1}
          resize={true}
          value={msg}
          onChange={handleMessageChange}
          placeholder="Your Message"
          className="bg min-h-full !border-0 focus:border-transparent dark:text-gray-300 dark:placeholder:text-gray-400"
          containerProps={{
            className: "grid h-full",
          }}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <IconButton variant="text" className="rounded-full" type="submit">
          <Send size={23} className=" inline-block dark:text-slate-50" />
        </IconButton>
      </div>
    </form>
  );
};

export default ChatInput;
