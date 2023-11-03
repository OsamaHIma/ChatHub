"use client";

import { useMemo, useRef, useState } from "react";
import { Send, SmileIcon, Reply, X, Folder } from "lucide-react";
import {
  IconButton,
  Menu,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import Picker from "emoji-picker-react";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";
import { Translate } from "translate-easy";

import dynamic from "next/dynamic";


import "react-quill/dist/quill.bubble.css";
import PreviewUploadedFile from "./PreviewUploadedFile";


const ChatInput = ({ handleSendMsg, socket, isRelyingToMessage, currentChat, setIsRelyingToMessage }) => {
  const [msg, setMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { user } = useUser();
  const fileInputRef = useRef();

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const [openFullFile, setOpenFullFile] = useState(false);
  const handleOpenFile = () => setOpenFullFile(!openFullFile);

  const handelEmojiPickerClick = (emoji, event) => {
    const emojiCount = event.detail || 1;
    const emojiString = emoji.emoji.repeat(emojiCount);
    setMsg((prevMsg) => prevMsg + emojiString);
  };

  const handelFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);

    // Generate the preview URL
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      handleOpenFile();
    }
  }

  const handelFileInputClick = () => {
    if (selectedFile || previewUrl) {
      setSelectedFile(null);
      setPreviewUrl(null);
      fileInputRef.current.value = "";
      // handleOpenFile()
    } else {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (msg.length > 0 || selectedFile) {
      // handleOpenFile()

      socket.current.emit("stop-typing", user._id);
      if (selectedFile) {
        const maxSize = 17 * 1024 * 1024;
        if (selectedFile.size > maxSize) {
          toast.error(<Translate>File size exceeds the maximum limit of 17MB.</Translate>);
          setSelectedFile(null);

        }
      }
      handleSendMsg(msg, selectedFile);
      setMsg("");
      setSelectedFile(null);
      setOpenFullFile(false)
    }
  };


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
              
              <div className="px-3 py-1 bg-gray-100 truncate dark:bg-gray-700 rounded-md dark:text-gray-100" dangerouslySetInnerHTML={{ __html: isRelyingToMessage.message }} />
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
        <PreviewUploadedFile openFile={openFullFile} url={previewUrl} handleOpenFile={handleOpenFile} file={selectedFile} handelSendFile={handleSubmit} />
        <div className="flex w-full flex-row items-center gap-2 rounded-full border border-gray-900/10 bg-gray-900/5 p-2 dark:border-gray-100/10 dark:bg-gray-800">
          <div className="flex">
            <input
              type="file"
              // accept="image/*"
              maxLength="17000000"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handelFileUpload}
            />

            <IconButton
              variant="text"
              title={selectedFile ? "Cancel sending the file" : "Send a file max size 17 mbs"}
              className="relative rounded-full"
              onClick={handelFileInputClick}
            >
              {
                selectedFile ? <X className="dark:text-stone-300" /> : <Folder className="dark:text-stone-300" />
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
          <ReactQuill

            theme="bubble"
            value={msg}
            onChange={(msg) => {
              socket.current.emit("typing", user._id);
              setMsg(msg)
            }}

            modules={{
              // syntax: true,
              toolbar: [
                ['bold', 'italic', 'underline', 'strike', 'color', 'size', 'align', 'list', "link"], // toggled buttons
                ['code-block', 'image', "video"], // code and image formats
                // other options
              ],
            }}
            className="!flex-1 max-h-16 z-[100] dark:text-gray-50"
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
