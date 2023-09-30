"use client";

import ChatInput from "@/components/ChatInput";
import Contacts from "@/components/Contacts";
import Messages from "@/components/Messages";
import { useUser } from "@/context/UserContext";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Translate } from "translate-easy";
import { UserCircle2 } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "next-themes";


const Home = () => {
  const { theme } = useTheme()
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await axios.get(`/api/users/${user._id}`);
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, [user]);

  const handelChangeChat = (index, contact) => {
    setSelectedUser(index);
    setChat(contact);
  };

  return (
    <main className="paddings innerWidth my-32 flex flex-col items-center justify-center gap-4 py-16">
      <div className="paddings grid h-screen w-full grid-cols-12 rounded-lg bg-slate-100 shadow dark:bg-slate-800">
        {/* Contacts */}
        <div className="Contacts col-span-3 flex max-h-80 flex-col gap-5 overflow-y-auto lg:max-h-full ">
          {users.length > 0 ? (
            <Contacts
              users={users}
              handelChangeChat={handelChangeChat}
              selectedUser={selectedUser}
              // lastMessage={}
            />
          ) : (
            <>
              <Skeleton height={155} baseColor={theme === "dark" && "#4b5563"} />
              <Skeleton height={155} baseColor={theme === "dark" && "#4b5563"} />
              <Skeleton height={155} baseColor={theme === "dark" && "#4b5563"} />
            </>
          )}
        </div>
        <div className="col-span-9">
          {chat ? (
            <section className="innerWidth px-6">
              <div className="flex items-center gap-3">
                <UserCircle2 size={32} />
                <p className="text-gray-400">@{chat.username}</p>
              </div>
              <Messages />
              <ChatInput />
            </section>
          ) : (
            <section className="welcome-section flex flex-col items-center justify-center gap-5">
              <Image
                src="/robot.gif"
                width={300}
                height={300}
                priority
                className="w-96"
              />
              <h1 className="text-3xl font-bold md:text-5xl">
                <Translate>Welcome</Translate>{" "}
                <span className="text-indigo-500">{user && user.username}</span>
                !
              </h1>
              <p className="text-xl font-semibold capitalize md:text-3xl">
                <Translate>Select a chat to start messaging</Translate>
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};
export default Home;
