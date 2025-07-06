import React, { useState, useEffect, useRef } from "react"; //used the extension Prettierfor formatting pretty cool  
import { io } from "socket.io-client";
import MessageList from "./MessageList.jsx";

const socket = io(""); // works as the professor said I hope!??

export default function ChatCard() {
  // starting it with a welcome message from the bot basically dummy message change to whatever you want guys
  const [messages, setMessages] = useState([
    {
      from: "bot",
      type: "text",
      text: "Greetings! I am Plato. How may I assist thee?",
    },
  ]);

  const [input, setInput] = useState(""); // This state is for whatever user is typing, frfr
  const [isBotThinking, setIsBotThinking] = useState(false); // A boolean to check if we're waiting for the bot because we dont wanna kill our api

  const inputRef = useRef(null); // it was really annoying when i couldnt type automatically after a reply this is for that

  useEffect(() => {
    const handleBotMessage = (msg) => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", type: "text", text: msg },
      ]);
      setTimeout(() => {
        // NO SPAMMING ALLOWED!!!!!! FREE API BRUH
        setIsBotThinking(false);
      }, 500); // 500ms delay
    };

    socket.on("bot_message", handleBotMessage); // so we can hear what gemini says
    return () => {
      socket.off("bot_message", handleBotMessage);
    };
  }, []);

  useEffect(() => {
    if (!isBotThinking && inputRef.current) {
      inputRef.current.focus();// hfor the annoying thing i mentioned so we can type after the response
    }
  }, [isBotThinking]);

  const sendMessage = () => {
    // no empty messages so needs to !!!!VERIFY!!!!! for spacebars
    if (!input.trim()) return;

    const userMsg = input.trim(); //trims whitespace and send input to chat right away so it feels fast
    setMessages((prev) => [
      ...prev,
      { from: "user", type: "text", text: userMsg },
    ]);
    setInput(""); //clears the input box for the next message
    setIsBotThinking(true); // thinking to true will disable the input
    //send the message to the server so the bot can do its thing.
    socket.emit("user_message", userMsg);
  };

  return (
    <div className="w-full h-[600px] flex flex-col rgb(129, 23, 4)/60 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden glow-animation">
      <div className="flex flex-col w-full h-full overflow-hidden rounded-2xl">
        <div className="bg-[#0ABAB5]/10 text-gray-800 p-4 text-center text-4xl font-bold shadow-md rounded-t-2xl hover:shadow-[#F08080]/50 hover:shadow-2xl transition-shadow duration-300 ease-in-out font-spartacus">
          PLATO
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-3 scrollbar-autohide">
          <MessageList messages={messages} />
          {isBotThinking && (
            <div className="text-gray-500 italic px-3">
              Plato is thinking...
            </div>
          )}{" "}
        </div>

        <div className="flex p-3 border-t border-gray-200 bg-white/5 backdrop-blur-xl items-center">
          <input
            ref={inputRef}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-in-out text-gray-800 placeholder-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} //disabled while the bot is thinking
            disabled={isBotThinking}
          />
          <button
            className="ml-3 bg-[#56DFCF] hover:bg-[#0ABAB5] text-gray-800 font-semibold py-2 px-6 rounded-full transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
            onClick={sendMessage}
            disabled={isBotThinking} //disabled while the bot is thinking
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
