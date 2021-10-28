import { useEffect, useMemo, useRef } from "react";

const ChatMessage = ({ message }) => {
  const messageRef = useRef(null);

  const usernameTrimmed = useMemo(
    () => message.username.split(" ").join(""),
    [message.username]
  );

  const formattedDate = useMemo(() => {
    // firebase timestamp
    if (message.created.seconds)
      return new Date(message.created.seconds * 1000).toLocaleString("en-US", {
        weekday: "short",
        day: "numeric",
        year: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

    return message.created;
  }, [message.created]);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={messageRef}
      className="flex bg-white rounded-lg p-2 w-full items-start mt-2 h-auto"
    >
      <img
        src={`https://avatars.dicebear.com/api/bottts/${usernameTrimmed}.svg`}
        className="w-10 mt-3"
        alt="avatar"
      />
      <div className="flex flex-col mt-3 ml-2">
        <p className="font-bold">{message.username}</p>
        <p className="text-sm text-gray-400">{formattedDate}</p>
        <p className="">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
