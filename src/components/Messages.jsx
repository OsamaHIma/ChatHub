"use client";
import moment from "moment";
import { useState, useEffect } from "react";
import { Translate } from "translate-easy";
import ChatInput from "./ChatInput";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { Button, Spinner } from "@material-tailwind/react";
import { CheckCheck } from "lucide-react";
import ScrollableFeed from "react-scrollable-feed";
import { Howl } from "howler";
import { useInfiniteQuery } from "@tanstack/react-query";

const Messages = ({ currentChat, socket }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const notificationSound = new Howl({ src: ["/chat.mp3"], volume: 0.5 });


  const getAllMsgBetweenTowUsers = async (page) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/get_all_msgs_between_tow_users`,
        {
          from: user._id,
          to: currentChat._id,
          page: page,
        },
      );
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, fetchNextPage, isFetchingNextPage, refetch, hasNextPage } =
    useInfiniteQuery(
      ["query"],
      async ({ pageParam = 1 }) => {
        const response = await getAllMsgBetweenTowUsers(pageParam);
        return response;
      },
      {
        getNextPageParam: (_, page) => {
          return page.length + 1;
        },
        initialData: {
          pages: async () => {
            const response = await getAllMsgBetweenTowUsers(1);
            return response;
          },
          pageParams: [1],
        },
      },
    );

  const sendMessage = async (message) => {
    const time = Date.now();

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/addmsg`,
      {
        to: currentChat._id,
        from: user._id,
        date: time,
        message,
      },
    );

    socket.current.emit("send-msg", {
      _id: data.id,
      to: currentChat._id,
      from: user._id,
      date: time,
      message,
      ...data,
    });
    setMessages([
      { fromSelf: true, message, _id: data.id, date: data.date },
      ...messages,
    ]);
  };

  if (socket.current) {
    socket.current.on("msg-receive", (msg) => {
      setArrivalMessages({ fromSelf: false, message: msg.message });
      // Emit an event to notify the sender that the message has been seen
      socket.current.emit("update-msg-seen", msg._id);
      notificationSound.play();
    });
    socket.current.on("msg-seen", (msgId) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === msgId ? { ...msg, seen: true } : msg,
        ),
      );
    });
  }

  useEffect(() => {
    arrivalMessages && setMessages((prev) => [arrivalMessages, ...prev]);
  }, [arrivalMessages]);


  useEffect(() => {
    if (data.pages.length > 0) {
      setMessages(data?.pages.flatMap((page) => page));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentChat]);

  const ComingMessage = ({ message }) => {
    const time = moment(message.date).format("hh:mm a");
    return (
      <div className="mb-8 flex">
        <div className="max-w-1/2 relative ml-4 rounded-lg bg-gray-700 px-6 py-4">
          <p className="whitespace-normal break-all text-white">
            <Translate>{message.message}</Translate>
          </p>
          <p className="absolute bottom-0 right-0 -mb-5 text-xs text-gray-400">
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
            <p className="text-xs text-gray-400">{time}</p>
            <CheckCheck
              className={`${message.seen ? "text-blue-500" : "text-gray-400"} `}
              size={17}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <section className="mb-7 md:mb-0">
      <div className="flex flex-col justify-between gap-7 overflow-y-auto">
        <div className="relative mt-4 flex flex-col justify-between">
          <Button variant="text" color="indigo" onClick={() => fetchNextPage()} className="absolute dark:text-slate-100 left-[30%] z-50" disabled={isFetchingNextPage}>
            {isFetchingNextPage ? (
              <Spinner className="mx-auto" />
            ) : (
              <Translate>Load more old messages</Translate>
            )}
          </Button>
          <div className="hide-scroll-bar relative h-[78vh] overflow-y-auto rounded-lg bg-slate-200/50 p-6 dark:bg-slate-900/50 md:h-[70vh]">
            {loading && (
              <Spinner scale={7} className="absolute left-[50%] top-[50%] " />
            )}
            <ScrollableFeed>
              {messages.length > 0 &&
                messages
                  .slice()
                  .reverse()
                  .map((message, index) =>
                    message.fromSelf ? (
                      <SendMessage key={index} message={message} />
                    ) : (
                      <ComingMessage key={index} message={message} />
                    ),
                  )}
            </ScrollableFeed>
          </div>
        </div>
      </div>
      <ChatInput socket={socket} handleSendMsg={sendMessage} />
    </section>
  );
};

export default Messages;
