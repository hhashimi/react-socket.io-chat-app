import { useState } from "react";

const ChatInput = ({ onMessageEntered }) => {
  const [inputMessage, setInputMessage] = useState("");
  return (
    <div className="mt-3 px-2">
      <input
        className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline"
        type="text"
        placeholder="Enter your message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setInputMessage("");
            return onMessageEntered(inputMessage);
          }
        }}
      />
    </div>
  );
};

export default ChatInput;
