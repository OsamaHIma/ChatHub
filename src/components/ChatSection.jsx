import { Badge } from "@material-tailwind/react";
import { UserCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Translate } from "translate-easy";
import Messages from "./Messages";
import UserProfile from "./UserProfile";

const ChatSection = ({ chat, socket }) => {
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const handleOpenUserProfileOpen = () => setOpenUserProfile(!openUserProfile);
  // useEffect(() => {
    if (chat) {
      socket.current.emit("update-user-status", chat._id);
      socket.current.on("user-status", (userStatus) => {
        setUserStatus(userStatus);
      });
      socket.current.on("user-disconnected", (userId) => {
        if (userId === chat._id) {
          setUserStatus(false);
        }
      });
      socket.current.on("user-typing", (userId) => {
        if (userId === chat._id) setIsTyping(true);
      });

      socket.current.on("user-stop-typing", (userId) => {
        if (userId === chat._id) setIsTyping(false);
      });
    }
  // }, []);
  return (
    <section className="innerWidth lg:flex-1">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Badge
            color="green"
            className={`${userStatus ? "absolute" : "hidden"}`}
          >
            {chat.avatar ? (
              <div
                className="max-h-[3rem] max-w-[3rem] cursor-pointer overflow-hidden rounded-full"
                onClick={handleOpenUserProfileOpen}
              >
                <img
                  alt="User avatar"
                  src={`${chat.avatar}`}
                  className="w-full object-contain"
                />
              </div>
            ) : (
              <UserCircle2 size={48} />
            )}
          </Badge>
          <div className="flex flex-col items-center">
            <p className="text-gray-400">@{chat.username}</p>
            <p className="text-xs text-gray-400">
              {userStatus && (
                <span className={`${isTyping ? "hidden" : "block"}`}>
                  <Translate>Online</Translate>
                </span>
              )}
              {isTyping && <span className="animate-pulse"><Translate>Typing...</Translate></span>}
            </p>
          </div>
        </div>
      </div>
      <Messages currentChat={chat} socket={socket} />
      <UserProfile
        open={openUserProfile}
        handleOpen={handleOpenUserProfileOpen}
        user={chat}
      />
    </section>
  );
};

export default ChatSection;
