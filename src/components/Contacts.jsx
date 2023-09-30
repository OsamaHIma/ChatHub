import { UserCircle2 } from "lucide-react";
import moment from "moment";
import { Translate } from "translate-easy";

const Contacts = ({ users, handelChangeChat, selectedUser, lastMessage }) => {
  return (
    <>
      {users.map((contact, index) => (
        <div
          className={`paddings hover:bg-slate-200 dark:hover:bg-slate-600 flex w-full flex-col items-center gap-3 rounded-md transition-all duration-500 ease-in-out hover:cursor-pointer ${
            selectedUser === index
              ? "bg-indigo-500 !text-slate-200"
              : "bg-slate-300 dark:bg-slate-700"
          }`}
          key={index}
          onClick={() => handelChangeChat(index, contact)}
        >
          <UserCircle2 size={32} />
          <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">
            <p>{contact.name}</p>
            <p
              className={`text-sm ${
                selectedUser === index
                  ? "text-slate-300"
                  : "text-gray-600 dark:text-gray-400"
              } `}
            >
              @{contact.username}
            </p>
          </div>
          <div className="flex items-center justify-between gap-5">
            <p
              className={`max-w-[5rem] ${
                selectedUser === index
                  ? "text-gray-300"
                  : "text-gray-600 dark:text-gray-300"
              } truncate md:max-w-[9rem] lg:max-w-[10rem]`}
            >
              {lastMessage ? (
                lastMessage.content
              ) : (
                <Translate>Start A Chat</Translate>
              )}
            </p>
            {lastMessage && (
              <p
                className={`text-sm ${
                  selectedUser === index
                    ? "text-slate-400"
                    : "text-gray-600 dark:text-gray-400"
                } `}
              >
                <Translate>{moment(lastMessage.date).format("hh:mm a")}</Translate>
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Contacts;
