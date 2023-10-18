"use client";

import { useEffect, useRef, useState } from "react";
import { Send, SmileIcon, PaperclipIcon, Reply, X } from "lucide-react";
import {
  IconButton,
  Textarea,
  Menu,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import Picker from "emoji-picker-react";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";
import { Translate } from "translate-easy";

const ChatInput = ({ handleSendMsg, socket, isRelyingToMessage, currentChat, setIsRelyingToMessage, handleSendFile }) => {
  const [msg, setMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useUser();
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  const handelEmojiPickerClick = (emoji, event) => {
    const emojiCount = event.detail || 1;
    const emojiString = emoji.emoji.repeat(emojiCount);
    setMsg((prevMsg) => prevMsg + emojiString);
  };
  const handelFileInputClick = () => {
    if (selectedFile) {
      setSelectedFile(null)
    } else {
      fileInputRef.current.click()
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (msg.length > 0 || selectedFile) {
      socket.current.emit("stop-typing", user._id);
      handleSendMsg(msg);
      if (selectedFile) {
        const maxSize = 17 * 1024 * 1024;

        if (selectedFile.size > maxSize) {
          toast.error(<Translate>File size exceeds the maximum limit of 17MB.</Translate>);
          setSelectedFile(null)
        } else {
          handleSendFile(selectedFile);
        }
      }
      setMsg("");
      setSelectedFile(null)
    }
  };

  useEffect(() => {

    if (isRelyingToMessage) {
      textAreaRef.current.getElementsByTagName("textarea")[0].focus();
    }
  }, [isRelyingToMessage]);
  return (
    <>
      {
        isRelyingToMessage && (
          <div className="flex relative items-center justify-between max-w-full mt-1">
            <div className="flex items-center gap-7 max-w-xs">
              <div className="flex items-center gap-3 flex-nowrap">
                <Reply className="text-indigo-600 min-w-[2rem]" />
                <p>
                  {currentChat && currentChat.username}
                </p>
                <span className="text-indigo-500">|</span>
              </div>
              <p className="px-3 py-1 bg-gray-100 truncate dark:bg-gray-700 rounded-md dark:text-gray-100">
                {isRelyingToMessage.message}
              </p>
            </div>
            <IconButton className="rounded-full self-end !outline-none" variant="text" onClick={() => setIsRelyingToMessage(null)}>
              <X className="dark:text-slate-50" />
            </IconButton>
          </div>
        )
      }
      <form
        onSubmit={handleSubmit}
        className={`${isRelyingToMessage ? "mt-1" : " mt-5"} relative flex min-w-[15.5rem] items-center gap-5`}
        noValidate
      >

        <div className="flex w-full flex-row items-center gap-2 rounded-full border border-gray-900/10 bg-gray-900/5 p-2 dark:border-gray-100/10 dark:bg-gray-800">
          <div className="flex">
            <input
              type="file"
              // accept="image/*"
              maxlength="17000000"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <IconButton
              variant="text"
              title={selectedFile ? "Cancel sending the file" : "Send a file max size 17 mbs"}
              className="relative rounded-full"
              onClick={handelFileInputClick}
            >
              {
                selectedFile ? <X className="dark:text-stone-300" /> : <PaperclipIcon className="dark:text-stone-300" />
              }
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
                title="Emoji picker"
              //   onClick={handelEmojiPickerToggle}
              >
                <SmileIcon className="inline-block dark:text-slate-50" />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <Picker onEmojiClick={handelEmojiPickerClick} />
            </MenuList>
          </Menu>
          <Textarea
            ref={textAreaRef}
            rows={1}
            resize={true}
            value={msg}
            onChange={(e) => {
              socket.current.emit("typing", user._id);
              setMsg(e.target.value);
            }}

            placeholder="Your Message"
            className="bg min-h-full !border-0 focus:border-transparent dark:text-gray-300 dark:placeholder:text-gray-400"
            containerProps={{
              className: "grid h-full",
            }}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <IconButton variant="text" className="rounded-full" type="submit" title="Send message">
            <Send size={23} className=" inline-block dark:text-slate-50" />
          </IconButton>
        </div>
      </form>
    </>
  );
};

export default ChatInput;
