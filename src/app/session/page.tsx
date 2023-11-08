"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
export default function Home() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<{ type: string; message: string }[]>(
    [
      {
        type: "user",
        message: "hello"
      }
    ]
  );
  const [isLoading, setIsLoading] = useState(false);
  const inView =useRef<null | HTMLDivElement>(null); 

  useEffect(() => {
    inView.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  useEffect(() => {

    sendMessage("hello");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChatLog((prevchatLog) => [
      ...prevchatLog,
      { type: "user", message: input },
    ]);
    sendMessage(input);
    setInput("");
  };

  const sendMessage = async (message: string) => {
    console.log("message: ", message);
    try {
      const response = await axios.post("/session/callback", {
        type: "user",
        message: `${message}`,
      });
      setIsLoading(true);
      setChatLog((prevchatLog) => [
        ...prevchatLog,
        { type: "bot", message: `${response.data.message}` },
      ]);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };
  return (
    <main className=" mx-auto w-full   ">
      <div className="flex flex-col h-screen bg-slate-800 ">
        <h1
          className=" bg-gradient-to-br from-purple-300 to-rose-600 text-transparent bg-clip-text 
                        text-center py-3 font-bold text-5xl max-md:text-3xl  uppercase"
        >
          mock interview
        </h1>
        <div className="flex-grow p-6 my-2 overflow-auto ">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type == "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.type == "user"
                      ? "bg-rose-200 text-slate-800"
                      : "bg-slate-700 text-white "
                  } rounded-lg p-4 max-w-sm`}
                >
                  {message.message}
                </div>
                <div ref={inView}></div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="relative flex w-full flex-wrap items-stretch mb-3 rounded-full ">
            <input
              type="text"
              placeholder="Type your response..."
              className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="absolute right-0 top-0 mt-2 mr-4">
              <button className=" font-bold px-3 py-1.5 ">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
