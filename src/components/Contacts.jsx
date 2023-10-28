"use client";
import { useUser } from "@/context/UserContext";
import { Badge } from "@material-tailwind/react";
import axios from "axios";
import { CheckCheck, CheckIcon, UserCircle2, Verified } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Translate } from "translate-easy";

const Contacts = ({
  contact,
  handelChangeChat,
  selectedUser,
  search,
  index,
}) => {
  const { user } = useUser();
  const [lastMessage, setLastMessage] = useState({});

  const getAllMsgBetweenTowUsers = async () => {
    try {
      // setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/get_all_msgs_between_tow_users`,
        {
          from: user._id,
          to: contact._id,
          page: 1,
        },
      );
      // setIsLoading(false);
      // console.log(data[0])
      setLastMessage(data[0]);
      if (data[0] && !data[0].fromSelf && !data[0].seen) {
        new Notification("New Message", {
          body: `New message from ${contact.username}\n ${moment(data[0].date).format("hh:mm a")}`,
          icon: "/logoTab.svg",
          vibrate: [200, 100, 200],
          sound: "/notification_sound.mp3",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllMsgBetweenTowUsers();
  }, []);

  return (
    <article className="flex flex-col items-center gap-3 min-w-[13rem] ">
      {!contact.username.toLowerCase().includes(search.toLowerCase()) ? null : (
        <div
          className={`paddings flex w-full flex-col items-center gap-3 rounded-md transition-all duration-500 ease-in-out hover:cursor-pointer ${selectedUser === index ? "hover:bg-indigo-600 shadow-lg" : "hover:bg-slate-300 shadow-inner"}  dark:hover:bg-slate-600 ${selectedUser === index
            ? "bg-indigo-500 !text-gray-200"
            : "bg-slate-200 dark:bg-slate-700"
            }`}
          onClick={() => handelChangeChat(index, contact)}
        >
          <div className="flex items-center gap-3">
            {contact.avatar ? (
              <Badge
                content={<CheckIcon className="h-4 w-4 text-white" strokeWidth={2.5} />}
                className={`${contact.isAdmin ? "absolute" : "hidden"} bg-gradient-to-tr from-blue-400 to-blue-600 border-2 border-white shadow-lg shadow-black/20`}
              >
                <div className="max-h-[4.3rem] max-w-[4.3rem] overflow-hidden rounded-full">
                  <img
                    alt="User avatar"
                    src={`${contact.avatar}`}
                    className="w-full object-contain "
                  />
                </div>
              </Badge>
            ) : (
              <UserCircle2 size={48} />
            )}

          </div>
          {contact.username === "osama" && (<div className="flex items-center gap-3">
            <p className="text-xs"><Translate>This the official account</Translate></p>
            <Verified size={21} className="text-blue-500" /></div>)}
          <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">
            <p>{contact.name}</p>
            <p
              className={`text-sm ${selectedUser === index
                ? "text-slate-300"
                : "text-gray-600 dark:text-gray-400"
                } `}
            >
              @{contact.username}
            </p>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-2">
              {lastMessage ? (
                <div className={`max-w-[5rem] ${selectedUser === index
                  ? "text-gray-300"
                  : "text-gray-600 dark:text-gray-300"
                  } truncate md:max-w-[9rem] lg:max-w-[10rem] last-message`} dangerouslySetInnerHTML={{ __html: lastMessage.message }} />
              ) : (
                <p
                  className={`max-w-[5rem] ${selectedUser === index
                    ? "text-gray-300"
                    : "text-gray-600 dark:text-gray-300"
                    } truncate md:max-w-[9rem] lg:max-w-[10rem]`}
                >
                  <Translate>Start A Chat</Translate>
                </p>
              )}

              {lastMessage && lastMessage.fromSelf && (
                <CheckCheck
                  className={`${lastMessage.seen ? "text-blue-500" : "text-gray-400"
                    } `}
                  size={17}
                />
              )}
            </div>
            {lastMessage && (
              <p
                className={`text-sm ${selectedUser === index
                  ? "text-slate-400"
                  : "text-gray-600 dark:text-gray-400"
                  } `}
              >
                <Translate>
                  {moment(lastMessage.date).format("hh:mm a")}
                </Translate>
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default Contacts;
