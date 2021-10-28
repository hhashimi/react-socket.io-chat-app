import { useEffect, useMemo, useState } from "react";
import ChannelsMenu from "./ChannelsMenu";
import ChannelsMenuToggle from "./ChannelsMenuToggle";
import ChatMessage from "./ChatMessage";

import { db } from "../index";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import ChatInput from "./ChatInput";

import { uniqueNamesGenerator, starWars } from "unique-names-generator";

import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_IO_SERVER);

const Chat = () => {
  const [showChannelsMenu, setShowChannelsMenu] = useState(false);
  const [channel, setChannel] = useState("TypeScript");
  const [onlineUsers, setOnlineUsers] = useState(0);

  const [chatMessages, setChatMessages] = useState([]);

  const channelChatMessages = useMemo(
    () => chatMessages.filter((message) => channel === message.channel),
    [channel, chatMessages]
  );

  const characterName = useMemo(
    () =>
      uniqueNamesGenerator({
        dictionaries: [starWars],
      }),
    []
  );

  useEffect(() => {
    // join channel
    socket.emit("join-channel", channel);
  }, [channel]);

  useEffect(() => {
    // listen for server messages
    socket.on("server-message", (message) => {
      setChatMessages((existingChatMessages) => [
        ...existingChatMessages,
        message,
      ]);
    });

    // listen for online users
    socket.on("online-users", (usersCount) => {
      setOnlineUsers(usersCount);
    });
  }, []);

  useEffect(() => {
    async function loadPreviousMessages() {
      // load past messages from firebase
      if (channelChatMessages.length === 0) {
        // get last 25 previous messages from firebase
        const q = query(
          collection(db, "messages"),
          where("channel", "==", channel),
          orderBy("created", "desc"),
          limit(25)
        );
        const querySnapshot = await getDocs(q);
        const firebaseMessages = [];
        querySnapshot.forEach((doc) => {
          firebaseMessages.push(doc.data());
        });

        firebaseMessages
          .slice()
          .reverse()
          .forEach((msg) => {
            setChatMessages((existingChatMessages) => [
              ...existingChatMessages,
              msg,
            ]);
          });
      }
    }
    loadPreviousMessages();
  }, [channel, channelChatMessages]);

  function toggleChannelsMenu() {
    setShowChannelsMenu(!showChannelsMenu);
  }

  async function onMessageEntered(msg) {
    socket.emit("chat-message", {
      text: msg,
      username: characterName,
      channel,
    });

    // save message in firestore collection
    try {
      await addDoc(collection(db, "messages"), {
        text: msg,
        username: characterName,
        created: serverTimestamp(),
        channel,
      });
    } catch (e) {
      console.error("Error adding document");
    }
  }

  return (
    <>
      <div className="flex w-full justify-center max-h-screen">
        <div className="flex flex-col sm:flex-row mb-16 mx-5 rounded-md px-5 w-full sm:w-3/4 lg:w-2/4 justify-evenly">
          <ChannelsMenuToggle toggleChannelsMenu={toggleChannelsMenu} />

          <ChannelsMenu
            channel={channel}
            setChannel={setChannel}
            showChannelsMenu={showChannelsMenu}
          />

          <div className="overflow-auto">
            <div>
              {channelChatMessages.map((message, index) => {
                return <ChatMessage message={message} key={index} />;
              })}
            </div>

            <span className="text-xs text-gray-400">
              Currently online: {onlineUsers}
              {onlineUsers > 1 ? " users" : " user"}
            </span>
            <ChatInput onMessageEntered={onMessageEntered} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
