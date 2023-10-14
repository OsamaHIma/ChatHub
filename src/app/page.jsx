"use client";

import Contacts from "@/components/Contacts";
import Messages from "@/components/Messages";
import { useUser } from "@/context/UserContext";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Translate } from "translate-easy";
import { Search } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { io } from "socket.io-client";
import ChatSection from "@/components/ChatSection";

const Home = () => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [search, setSearch] = useState("");
  const socket = useRef();

  const getAllUsers = async () => {
    try {
      if (user) {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/users/${user._id}`,
        );
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const getAllMsgs = async () => {
    try {
      if (user) {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/getallmsgs/${user._id}`,
        );
        setAllMessages(data);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    if (user) {
      socket.current = io(process.env.NEXT_PUBLIC_BASE_URL);
      socket.current.emit("add-user", user._id);
    }
    getAllUsers();
    getAllMsgs();
  }, [user]);

  const handelChangeChat = (index, contact) => {
    setSelectedUser(index);
    setChat(contact);
  };

  return (
    <main className="paddings innerWidth flex flex-col items-center justify-center gap-4 py-16">
      <div className="flex h-screen w-full flex-col gap-5 rounded-lg bg-gray-100 px-3 shadow dark:bg-slate-800 md:p-4 lg:flex-row">
        {/* Contacts */}
        <div className="Contacts flex max-h-[95vh] flex-col gap-3 overflow-y-auto lg:max-h-full lg:flex-[0.5] ">
          {users.length > 0 ? (
            <section className="flex flex-col gap-3 pt-4 md:pt-0">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="text-indigo-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search by username"
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full rounded-full bg-gray-100 py-2 pl-10 pr-3 text-gray-900 focus:bg-white focus:outline-none focus:ring-0"
                />
              </div>
              {allMessages &&
                users.map((contact, index) => {
                  const messages = allMessages.filter((message) => {
                    if (message.users[0] === contact._id) {
                      return message.users[1] === user._id;
                    }
                  });
                  const lastMessage = messages[messages.length - 1];
                  return (
                    <Contacts
                      key={index}
                      contact={contact}
                      handelChangeChat={handelChangeChat}
                      selectedUser={selectedUser}
                      search={search}
                      lastMessage={lastMessage}
                      index={index}
                    />
                  );
                })}
            </section>
          ) : (
            <>
              <Skeleton height={40} borderRadius={99} className="mt-4" />
              <Skeleton height={155} />
              <Skeleton height={155} />
              <Skeleton height={155} />
            </>
          )}
        </div>

        {chat ? (
          <ChatSection chat={chat} socket={socket} />
        ) : (
          <section className="welcome-section mx-auto hidden flex-col items-center justify-center gap-5 lg:flex">
            <Image
              src="/robot.gif"
              width={300}
              height={300}
              priority
              alt="robot.gif"
              className="w-96"
            />
            <h1 className="text-3xl font-bold md:text-5xl">
              <Translate>Welcome</Translate>{" "}
              <span className="text-indigo-500">{user && user.username}</span>!
            </h1>
            <p className="text-xl font-semibold capitalize md:text-3xl">
              <Translate>Select a chat to start messaging</Translate>
            </p>
          </section>
        )}
      </div>
    </main>
  );
};
export default Home;
