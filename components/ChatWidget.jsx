"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaComments } from "react-icons/fa";
// import { BsEmojiSmile } from "react-icons/bs";
// import { FaPaperclip } from "react-icons/fa";
import Picker from "emoji-picker-react"; // npm install emoji-picker-react
import "./ChatWidget.css";
import { LuSend } from "react-icons/lu";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const prevMessagesLength = useRef(0);
  const notificationSound = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const token = localStorage.getItem("Auth_Token");
    setAuthToken(token);

    async function fetchMessages() {
      try {
        const res = await fetch(
          "https://admin.cannata.ae/api/merchant/conversation?other_id=1",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        const data = await res.json();

        if (data.status && Array.isArray(data.data.messages)) {
          if (data.data.messages.length > prevMessagesLength.current) {
            if (notificationSound.current) {
              notificationSound.current.currentTime = 0;
              notificationSound.current.play().catch(() => {});
            }
          }
          setMessages(data.data.messages);
          prevMessagesLength.current = data.data.messages.length;
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [open]);

  const sendMessage = async (fileUrl = null) => {
    if ((!input.trim() && !fileUrl) || !authToken) return;

    const newMessage = {
      id: Date.now(),
      content: input,
      file: fileUrl,
      receiver_type: "App\\Models\\User",
    };

    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const formData = new FormData();
      if (fileUrl instanceof File) {
        formData.append("file", fileUrl);
      } else {
        formData.append("message", input);
      }
      formData.append("receiver_id", 1);

      await fetch("https://admin.cannata.ae/api/merchant/send-message", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getSenderType = (msg) => {
    if (msg.receiver_type === "App\\Models\\User") return "user";
    return "bot";
  };

  const onEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setShowEmoji(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    sendMessage(file); // يرفع الملف مباشرة
  };

  return (
    <div className="chat-widget">
      <div className="chat-icon mb-5" onClick={() => setOpen(!open)}>
        <FaComments size={28} />
      </div>

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <div className="support-info">
              <img
                src="/images/bot.jpg"
                alt="Support"
                className="avatar-header"
              />
              <span>الدعم الفني</span>
            </div>
            <button className="close-btn" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => {
              const sender = getSenderType(msg);
              return (
                <div key={i} className={`msg-row ${sender}`}>
                  {sender === "bot" && (
                    <img
                      src="/images/bot.jpg"
                      alt="Support"
                      className="avatar"
                    />
                  )}
                  <div className={`msg ${sender}`}>
                    {msg.file ? (
                      msg.file.type?.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(msg.file)}
                          alt="uploaded"
                          className="uploaded-img"
                        />
                      ) : (
                        <a href={URL.createObjectURL(msg.file)} download>
                          📎 Download File
                        </a>
                      )
                    ) : (
                      msg.content
                    )}
                  </div>
                  {sender === "user" && (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/194/194915.png"
                      alt="User"
                      className="avatar"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="chat-footer">
            {authToken ? (
              <div className="input-area mx-3">
                {/* <button
                  className="emoji-btn"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <BsEmojiSmile size={22} />
                </button>
                <button
                  className="file-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaPaperclip size={20} />
                </button> */}
                {/* <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                /> */}

                <input
                  type="text"
                  placeholder="اكتب رسالتك..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button  onClick={() => sendMessage()}>
                  <LuSend />
                </button>
              </div>
            ) : (
              <p className="login-warning">Login !</p>
            )}
          </div>

          {showEmoji && (
            <div className="emoji-picker">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      )}

      <audio
        ref={notificationSound}
        src="/notification-sound-effect-372475.mp3"
        preload="auto"
      />
    </div>
  );
}
