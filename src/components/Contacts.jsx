import { UserCircle2 } from "lucide-react";
import moment from "moment";
import { Translate } from "translate-easy";

const Contacts = ({
  contact,
  handelChangeChat,
  selectedUser,
  search,
  lastMessage,
  index,
}) => {
  return (
    <article className="flex flex-col items-center gap-3">
      {!contact.username.includes(search) ? null : (
        <div
          className={`paddings flex w-full flex-col items-center gap-3 rounded-md transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 ${
            selectedUser === index
              ? "bg-indigo-500 !text-gray-200"
              : "bg-slate-300 dark:bg-slate-700"
          }`}
          onClick={() => handelChangeChat(index, contact)}
        >
          {contact.avatar ? (
            <img
              alt="User avatar"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/uploads/${contact.avatar}`}
              className="max-w-[3rem] rounded-full"
            />
          ) : (
            <UserCircle2 size={48} />
          )}

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
                <Translate>
                  {moment(lastMessage.updatedAt).format("hh:mm a")}
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
