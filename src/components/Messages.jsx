"use client";
import moment from "moment";
import { useState, useEffect } from "react";
import { Translate } from "translate-easy";
import ChatInput from "./ChatInput";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { CheckCheck } from "lucide-react";
import ScrollableFeed from "react-scrollable-feed";
import { Howl } from "howler";

const Messages = ({ currentChat, socket }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const notificationSound = new Howl({ src: ["/chat.mp3"], volume: 0.5 });
  const getAllMsgBetweenTowUsers = async () => {
    if (currentChat) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "/api/get_all_msgs_between_tow_users",
          {
            from: user._id,
            to: currentChat._id,
          },
        );
        setIsLoading(false);
        setMessages(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getAllMsgBetweenTowUsers();
    // setIsSeen(true);
  }, [currentChat]);

  const sendMessage = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      date: Date.now(),
      msg,
    });
    await axios.post("/api/addmsg", {
      to: currentChat._id,
      from: user._id,
      date: Date.now(),
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessages({ fromSelf: false, message: msg });
        notificationSound.play();
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    getAllMsgBetweenTowUsers();
  }, [currentChat]);

  const ComingMessage = ({ message }) => {
    const time = moment(message.date).format("hh:mm a");
    return (
      <div className="mb-8 flex">
        <div className="max-w-1/2 relative ml-4 rounded-lg bg-gray-700 px-6 py-4">
          <p className="whitespace-normal break-all text-white">
            <Translate>{message.message}</Translate>
          </p>
          <p className="absolute bottom-0 right-0 -mb-5 text-xs text-gray-200">
            {time}
          </p>
        </div>
      </div>
    );
  };

  const SendMessage = ({ message }) => {
    const time = moment(message.date).format("hh:mm a");
    return (
      <div className="mb-8 flex flex-row-reverse">
        <div className="max-w-1/2 relative mr-4 rounded-lg bg-green-400 bg-opacity-60 px-6 py-4">
          <p className="whitespace-normal break-all">{message.message}</p>
          <div className="absolute bottom-0 right-0 -mb-5 flex items-center gap-1">
            <p className="text-xs text-gray-200">{time}</p>
            {message.seen && <CheckCheck className="text-blue-500" size={17} />}
          </div>
        </div>
      </div>
    );
  };
  return (
    <section className="flex flex-col justify-between gap-7 overflow-y-auto">
      <div
        className="relative mt-4 flex flex-col justify-between"
        // style={{ height: "695px" }}
      >
        <div className="relative !h-[70vh] overflow-y-auto rounded-lg bg-slate-200/50 p-6 dark:bg-slate-900/50">
          {loading && (
            <Spinner scale={7} className="absolute left-[50%] top-[50%] " />
          )}
          <ScrollableFeed>
            {messages.length > 0 &&
              messages.map((message, index) =>
                message.fromSelf ? (
                  <SendMessage key={index} message={message} />
                ) : (
                  <ComingMessage key={index} message={message} />
                ),
              )}
          </ScrollableFeed>
        </div>
      </div>
      <ChatInput handleSendMsg={sendMessage} />
    </section>
  );
};

export default Messages;
