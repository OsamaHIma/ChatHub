"use client";
import { Send } from "lucide-react";
// import moment from "moment";
import { useRef, useState, useEffect } from "react";
import { Translate } from "translate-easy";
import ChatInput from "./ChatInput";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";

const Messages = ({ currentChat, socket }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const scrollRef = useRef();

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
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getAllMsgBetweenTowUsers();
  }, [currentChat]);

  const sendMessage = async (msg) => {
    // const newMessage = { sender: "me", text: msg };
    // setMessages([...messages, newMessage]);
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      msg,
    });
    await axios.post("/api/addmsg", {
      to: currentChat._id,
      from: user._id,
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
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ComingMessage = ({ message }) => {
    // const time = moment(Date.now(), "hh:mm");
    return (
      <div className="mb-8 flex">
        <div className="max-w-1/2 relative ml-4 rounded-lg bg-gray-700 px-6 py-4">
          <p className="text-white">
            <Translate>{message}</Translate>{" "}
          </p>
          <p className="absolute bottom-0 right-0 -mb-5 text-xs text-gray-200">
            {/* {time} */}
          </p>
        </div>
      </div>
    );
  };

  const SendMessage = ({ message }) => {
    // const time = moment(Date.now(), "hh:mm");
    return (
      <div className="mb-8 flex flex-row-reverse">
        <div className="max-w-1/2 relative mr-4 rounded-lg bg-green-400 bg-opacity-60 px-6 py-4">
          <p>{message}</p>
          <p className="absolute bottom-0 right-0 -mb-5 text-xs text-gray-200">
            {/* {time} */}
          </p>
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
        <div ref={scrollRef} className="relative !h-[70vh] overflow-y-auto rounded-lg bg-slate-200/50 p-6 dark:bg-slate-900/50">
          {loading && (
            <Spinner scale={7} className="absolute left-[50%] top-[50%] " />
          )}
          {messages.length > 0 &&
            messages.map((message, index) =>
              message.fromSelf ? (
                <SendMessage key={index} message={message.message} />
              ) : (
                <ComingMessage key={index} message={message.message} />
              ),
            )}
        </div>
      </div>
      <ChatInput handleSendMsg={sendMessage} />
    </section>
  );
};

export default Messages;
