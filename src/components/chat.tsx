"use client";

import Image from "next/image";

import { PromptInputBasic } from "./chatinput";
import { Markdown } from "./ui/markdown";
import { useState, useEffect } from "react";
import { ChatContainer } from "./ui/chat-container";
import { UIMessage } from "ai";
import { ToolMessage } from "./tools";
import { useQuery } from "@tanstack/react-query";
import { chatState } from "@/actions/chat-streaming";
import { CompressedImage } from "@/lib/image-compression";
import { useChatSafe } from "./use-chat";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat(props: {
  appId: string;
  initialMessages: UIMessage[];
  isLoading?: boolean;
  topBar?: React.ReactNode;
  running: boolean;
}) {
  const { data: chat } = useQuery({
    queryKey: ["stream", props.appId],
    queryFn: async () => {
      return chatState(props.appId);
    },
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
  });

  const { messages, sendMessage } = useChatSafe({
    messages: props.initialMessages,
    id: props.appId,
    resume: props.running && chat?.state === "running",
  });

  const [input, setInput] = useState("");
  const [showReadyButton, setShowReadyButton] = useState(false);

  // 채팅이 완료되었는지 확인하는 로직
  useEffect(() => {
    const isGenerating = props.isLoading || chat?.state === "running";
    const hasMessages = messages.length > 0;
    const lastMessage = messages[messages.length - 1];
    
    // AI가 응답을 완료했고, 마지막 메시지가 "I made a website of"로 시작하는 경우
    if (!isGenerating && hasMessages && lastMessage && lastMessage.role === "assistant") {
      const lastMessageText = lastMessage.parts?.[0]?.type === "text" ? lastMessage.parts[0].text : "";
      if (lastMessageText.startsWith("I made a website of")) {
        // 1초 후에 버튼 표시
        const timer = setTimeout(() => {
          setShowReadyButton(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
    
    // 새로운 메시지가 시작되면 버튼 숨기기
    if (isGenerating) {
      setShowReadyButton(false);
    }
  }, [props.isLoading, chat?.state, messages]);

  const onSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }
    sendMessage(
      {
        parts: [
          {
            type: "text",
            text: input,
          },
        ],
      },
      {
        headers: {
          "Moov-App-Id": props.appId,
        },
      }
    );
    setInput("");
  };

  const onSubmitWithImages = (text: string, images: CompressedImage[]) => {
    const parts: Parameters<typeof sendMessage>[0]["parts"] = [];

    if (text.trim()) {
      parts.push({
        type: "text",
        text: text,
      });
    }

    images.forEach((image) => {
      parts.push({
        type: "file",
        mediaType: image.mimeType,
        url: image.data,
      });
    });

    sendMessage(
      {
        parts,
      },
      {
        headers: {
          "Moov-App-Id": props.appId,
        },
      }
    );
    setInput("");
  };

  async function handleStop() {
    await fetch("/api/chat/" + props.appId + "/stream", {
      method: "DELETE",
      headers: {
        "Moov-App-Id": props.appId,
      },
    });
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ 
        transform: "translateZ(0)",
        backgroundImage: 'url(/drawingpaper.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {props.topBar}
      <div
        className="flex-1 overflow-y-auto flex flex-col space-y-6 min-h-0"
        style={{ overflowAnchor: "auto" }}
      >
        <ChatContainer autoScroll>
          {messages.map((message: any) => (
            <MessageBody key={message.id} message={message} />
          ))}
          <AnimatePresence>
            {showReadyButton && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  duration: 0.6
                }}
                className="mt-[-20px] ml-3"
              >
                <motion.button
                  
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="cursor-pointer"
                  onClick={() => {
                    // 버튼 클릭 시 처리 (예: 웹사이트로 이동 등)
                    console.log("Ready to Moov clicked!");
                  }}
                >
                  <svg width="250" height="64" viewBox="0 0 224 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_440_184)">
                      <rect x="4.5" y="4.5" width="215" height="48" rx="6.5" fill="white" stroke="#FCF6E9"/>
                      <path d="M21.5039 19.375C21.3281 18.3555 20.5078 17.7695 19.4766 17.7695C18.082 17.7695 17.1094 18.8359 17.1094 20.7578C17.1094 22.7031 18.0938 23.7461 19.4766 23.7461C20.4844 23.7461 21.3047 23.1836 21.5039 22.1875H23.0391C22.8047 23.8164 21.4688 25.1172 19.4531 25.1172C17.2148 25.1172 15.5742 23.4883 15.5742 20.7578C15.5742 18.0156 17.2383 16.3984 19.4531 16.3984C21.3281 16.3984 22.7812 17.4883 23.0391 19.375H21.5039ZM24.2812 25V18.6367H25.7344V19.6914H25.8047C26.0273 18.9648 26.6484 18.543 27.375 18.543C27.5391 18.543 27.7734 18.5547 27.9141 18.5781V19.9609C27.7852 19.9141 27.4688 19.8672 27.2227 19.8672C26.3906 19.8672 25.7812 20.4414 25.7812 21.25V25H24.2812ZM31.418 25.1289C29.4961 25.1289 28.3242 23.8516 28.3242 21.8594C28.3242 19.8906 29.5195 18.5547 31.3359 18.5547C32.8945 18.5547 34.2422 19.5273 34.2422 21.7656V22.2344H29.8008C29.8184 23.3184 30.457 23.957 31.4297 23.957C32.0859 23.957 32.5312 23.6758 32.7188 23.3008H34.1836C33.9141 24.4023 32.8945 25.1289 31.418 25.1289ZM29.8125 21.2148H32.8125C32.8008 20.3477 32.2266 19.7148 31.3594 19.7148C30.457 19.7148 29.8594 20.4004 29.8125 21.2148ZM35.1094 23.207C35.1094 21.7773 36.293 21.3555 37.4766 21.2852C37.916 21.2559 38.8301 21.2031 39.1055 21.1914V20.6875C39.1055 20.0547 38.6953 19.6914 37.957 19.6914C37.2891 19.6914 36.8789 19.9961 36.7617 20.4531H35.3203C35.4258 19.375 36.3984 18.5547 37.9922 18.5547C39.1992 18.5547 40.5938 19.0469 40.5938 20.7461V25H39.1641V24.1211H39.1172C38.8359 24.6602 38.2383 25.1289 37.2422 25.1289C36.0234 25.1289 35.1094 24.4609 35.1094 23.207ZM36.5508 23.1953C36.5508 23.7461 36.9961 24.0273 37.6289 24.0273C38.5312 24.0273 39.1172 23.4297 39.1172 22.7148V22.1875L37.7109 22.2812C36.9961 22.3398 36.5508 22.6328 36.5508 23.1953ZM45.1758 18.6367V19.7852H43.9219V23.0898C43.9219 23.6992 44.2266 23.8281 44.6016 23.8281C44.7773 23.8281 45.0703 23.8164 45.2578 23.8047V25.0234C45.082 25.0586 44.7891 25.082 44.4141 25.082C43.2891 25.082 42.4219 24.5312 42.4336 23.3359V19.7852H41.5195V18.6367H42.4336V17.1133H43.9219V18.6367H45.1758ZM49.0781 25.1289C47.1562 25.1289 45.9844 23.8516 45.9844 21.8594C45.9844 19.8906 47.1797 18.5547 48.9961 18.5547C50.5547 18.5547 51.9023 19.5273 51.9023 21.7656V22.2344H47.4609C47.4785 23.3184 48.1172 23.957 49.0898 23.957C49.7461 23.957 50.1914 23.6758 50.3789 23.3008H51.8438C51.5742 24.4023 50.5547 25.1289 49.0781 25.1289ZM47.4727 21.2148H50.4727C50.4609 20.3477 49.8867 19.7148 49.0195 19.7148C48.1172 19.7148 47.5195 20.4004 47.4727 21.2148ZM55.9805 25V16.5156H59.2266C61.0664 16.5156 61.9805 17.4531 61.9805 18.7188C61.9805 19.75 61.3242 20.3242 60.4922 20.5234V20.6055C61.3945 20.6523 62.3086 21.4023 62.3086 22.6914C62.3086 24.0156 61.3594 25 59.4141 25H55.9805ZM59.1797 23.7227C60.293 23.7227 60.7617 23.2422 60.7617 22.5742C60.7617 21.8125 60.1641 21.2266 59.2148 21.2266H57.5039V23.7227H59.1797ZM59.0391 20.125C59.8477 20.125 60.457 19.6562 60.457 18.9062C60.457 18.25 59.9883 17.7812 59.0742 17.7812H57.5039V20.125H59.0391ZM63.4688 25V23.8984L66.4688 21.0039C67.3242 20.1484 67.7695 19.6445 67.7695 18.9297C67.7695 18.1445 67.1484 17.6406 66.3164 17.6406C65.4375 17.6406 64.875 18.1914 64.8867 19.0469H63.4336C63.4219 17.4414 64.6289 16.3984 66.3281 16.3984C68.0625 16.3984 69.2344 17.4297 69.2344 18.8594C69.2344 19.8203 68.7656 20.5938 67.1016 22.1641L65.5898 23.6641V23.7227H69.3633V25H63.4688ZM70.7812 25V16.5156H74.0273C75.8672 16.5156 76.7812 17.4531 76.7812 18.7188C76.7812 19.75 76.125 20.3242 75.293 20.5234V20.6055C76.1953 20.6523 77.1094 21.4023 77.1094 22.6914C77.1094 24.0156 76.1602 25 74.2148 25H70.7812ZM73.9805 23.7227C75.0938 23.7227 75.5625 23.2422 75.5625 22.5742C75.5625 21.8125 74.9648 21.2266 74.0156 21.2266H72.3047V23.7227H73.9805ZM73.8398 20.125C74.6484 20.125 75.2578 19.6562 75.2578 18.9062C75.2578 18.25 74.7891 17.7812 73.875 17.7812H72.3047V20.125H73.8398ZM85.8164 18.8477C85.7461 18.1211 85.125 17.6992 84.2109 17.6992C83.25 17.6992 82.6641 18.168 82.6641 18.8008C82.6641 19.5156 83.4141 19.8086 84.1172 19.9727L84.9141 20.1836C86.1797 20.4766 87.3984 21.1445 87.3984 22.6211C87.3984 24.1094 86.2266 25.1289 84.1875 25.1289C82.207 25.1289 80.9648 24.1797 80.8945 22.5039H82.3945C82.4648 23.3945 83.2148 23.8281 84.1758 23.8281C85.1836 23.8281 85.875 23.3359 85.875 22.6094C85.875 21.9414 85.2539 21.6602 84.3398 21.4258L83.3789 21.1797C81.9844 20.8164 81.1172 20.1133 81.1172 18.8945C81.1172 17.3945 82.4531 16.3984 84.2344 16.3984C86.0391 16.3984 87.2578 17.418 87.2812 18.8477H85.8164ZM88.3008 23.207C88.3008 21.7773 89.4844 21.3555 90.668 21.2852C91.1074 21.2559 92.0215 21.2031 92.2969 21.1914V20.6875C92.2969 20.0547 91.8867 19.6914 91.1484 19.6914C90.4805 19.6914 90.0703 19.9961 89.9531 20.4531H88.5117C88.6172 19.375 89.5898 18.5547 91.1836 18.5547C92.3906 18.5547 93.7852 19.0469 93.7852 20.7461V25H92.3555V24.1211H92.3086C92.0273 24.6602 91.4297 25.1289 90.4336 25.1289C89.2148 25.1289 88.3008 24.4609 88.3008 23.207ZM89.7422 23.1953C89.7422 23.7461 90.1875 24.0273 90.8203 24.0273C91.7227 24.0273 92.3086 23.4297 92.3086 22.7148V22.1875L90.9023 22.2812C90.1875 22.3398 89.7422 22.6328 89.7422 23.1953ZM94.8984 23.207C94.8984 21.7773 96.082 21.3555 97.2656 21.2852C97.7051 21.2559 98.6191 21.2031 98.8945 21.1914V20.6875C98.8945 20.0547 98.4844 19.6914 97.7461 19.6914C97.0781 19.6914 96.668 19.9961 96.5508 20.4531H95.1094C95.2148 19.375 96.1875 18.5547 97.7812 18.5547C98.9883 18.5547 100.383 19.0469 100.383 20.7461V25H98.9531V24.1211H98.9062C98.625 24.6602 98.0273 25.1289 97.0312 25.1289C95.8125 25.1289 94.8984 24.4609 94.8984 23.207ZM96.3398 23.1953C96.3398 23.7461 96.7852 24.0273 97.418 24.0273C98.3203 24.0273 98.9062 23.4297 98.9062 22.7148V22.1875L97.5 22.2812C96.7852 22.3398 96.3398 22.6328 96.3398 23.1953ZM106.477 18.8477C106.406 18.1211 105.785 17.6992 104.871 17.6992C103.91 17.6992 103.324 18.168 103.324 18.8008C103.324 19.5156 104.074 19.8086 104.777 19.9727L105.574 20.1836C106.84 20.4766 108.059 21.1445 108.059 22.6211C108.059 24.1094 106.887 25.1289 104.848 25.1289C102.867 25.1289 101.625 24.1797 101.555 22.5039H103.055C103.125 23.3945 103.875 23.8281 104.836 23.8281C105.844 23.8281 106.535 23.3359 106.535 22.6094C106.535 21.9414 105.914 21.6602 105 21.4258L104.039 21.1797C102.645 20.8164 101.777 20.1133 101.777 18.8945C101.777 17.3945 103.113 16.3984 104.895 16.3984C106.699 16.3984 107.918 17.418 107.941 18.8477H106.477Z" fill="black"/>
                      <path d="M16.7812 41V33.9297H19.1836C20.8438 33.9297 21.5957 34.916 21.5957 36.1758C21.5957 37.4258 20.8438 38.4316 19.1934 38.4316H17.6602V41H16.7812ZM17.6602 37.6504H19.1543C20.2773 37.6504 20.7266 37.0156 20.7266 36.1758C20.7266 35.3262 20.2773 34.7109 19.1445 34.7109H17.6602V37.6504ZM22.7188 41V35.6973H23.5293V36.5078H23.5879C23.7832 35.9707 24.3301 35.6094 24.9551 35.6094C25.082 35.6094 25.2969 35.6191 25.3945 35.6289V36.4785C25.3359 36.459 25.1016 36.4199 24.8867 36.4199C24.125 36.4199 23.5586 36.9473 23.5586 37.6602V41H22.7188ZM28.2656 41.1074C26.7324 41.1074 25.7852 40.0234 25.7852 38.3926C25.7852 36.7617 26.7422 35.6289 28.1875 35.6289C29.3008 35.6289 30.4727 36.3125 30.4727 38.2754V38.627H26.625C26.6641 39.75 27.3184 40.3652 28.2656 40.3652C28.9004 40.3652 29.3008 40.0918 29.4961 39.7598H30.3945C30.1406 40.5605 29.3594 41.1074 28.2656 41.1074ZM26.6348 37.9141H29.623C29.623 37.0254 29.0566 36.3711 28.1875 36.3711C27.2695 36.3711 26.6836 37.0938 26.6348 37.9141ZM35.7656 35.6973L33.8027 41H32.9336L30.9805 35.6973H31.8984L33.3438 39.9062H33.4023L34.8477 35.6973H35.7656ZM36.6934 41V35.6973H37.5332V41H36.6934ZM37.1133 34.8184C36.791 34.8184 36.5273 34.5742 36.5273 34.2617C36.5273 33.9492 36.791 33.7051 37.1133 33.7051C37.4355 33.7051 37.709 33.9492 37.709 34.2617C37.709 34.5742 37.4355 34.8184 37.1133 34.8184ZM41.0977 41.1074C39.5645 41.1074 38.6172 40.0234 38.6172 38.3926C38.6172 36.7617 39.5742 35.6289 41.0195 35.6289C42.1328 35.6289 43.3047 36.3125 43.3047 38.2754V38.627H39.457C39.4961 39.75 40.1504 40.3652 41.0977 40.3652C41.7324 40.3652 42.1328 40.0918 42.3281 39.7598H43.2266C42.9727 40.5605 42.1914 41.1074 41.0977 41.1074ZM39.4668 37.9141H42.4551C42.4551 37.0254 41.8887 36.3711 41.0195 36.3711C40.1016 36.3711 39.5156 37.0938 39.4668 37.9141ZM45.5898 41L43.9785 35.6973H44.8672L46 39.7402H46.0488L47.1719 35.6973H48.0703L49.1738 39.7207H49.2324L50.3652 35.6973H51.2441L49.6328 41H48.8027L47.6504 36.957H47.5723L46.4297 41H45.5898ZM55.5215 33.9297V41H54.6816V33.9297H55.5215ZM56.6055 39.4961C56.6055 38.2754 57.6797 38.002 58.5977 37.9336C58.9346 37.9092 59.7939 37.8652 60.0332 37.8555V37.4258C60.0332 36.752 59.6328 36.3613 58.832 36.3613C58.1582 36.3613 57.7578 36.6738 57.6406 37.0742H56.7617C56.8691 36.2246 57.6992 35.6289 58.8711 35.6289C59.5645 35.6289 60.8633 35.834 60.8633 37.5039V41H60.0332V40.2773H59.9941C59.8184 40.6387 59.3301 41.127 58.4121 41.127C57.4062 41.127 56.6055 40.5312 56.6055 39.4961ZM57.4453 39.5352C57.4453 40.0918 57.9141 40.375 58.5586 40.375C59.5059 40.375 60.0332 39.7402 60.0332 39.0762V38.5391L58.6953 38.6367C57.9336 38.6855 57.4453 38.959 57.4453 39.5352ZM64.5254 35.6973V36.4004H63.4121V39.4766C63.4121 40.1602 63.7441 40.2676 64.1055 40.2676C64.2617 40.2676 64.4766 40.2578 64.6035 40.248V41.0293C64.4766 41.0488 64.2617 41.0684 64.0176 41.0684C63.3145 41.0684 62.5625 40.6289 62.5625 39.6914V36.4004H61.7617V35.6973H62.5625V34.4277H63.4121V35.6973H64.5254ZM67.7773 41.1074C66.2441 41.1074 65.2969 40.0234 65.2969 38.3926C65.2969 36.7617 66.2539 35.6289 67.6992 35.6289C68.8125 35.6289 69.9844 36.3125 69.9844 38.2754V38.627H66.1367C66.1758 39.75 66.8301 40.3652 67.7773 40.3652C68.4121 40.3652 68.8125 40.0918 69.0078 39.7598H69.9062C69.6523 40.5605 68.8711 41.1074 67.7773 41.1074ZM66.1465 37.9141H69.1348C69.1348 37.0254 68.5684 36.3711 67.6992 36.3711C66.7812 36.3711 66.1953 37.0938 66.1465 37.9141ZM74.0273 37.0742C73.9102 36.6348 73.5781 36.3418 72.9531 36.3418C72.2988 36.3418 71.8301 36.6934 71.8301 37.1426C71.8301 37.4941 72.1133 37.7383 72.7383 37.8848L73.5293 38.0801C74.4766 38.3047 74.9453 38.7734 74.9453 39.5156C74.9453 40.4336 74.1934 41.1074 72.8652 41.1074C71.6738 41.1074 70.9609 40.5801 70.8242 39.6133H71.7031C71.8008 40.1309 72.1816 40.375 72.8457 40.375C73.5977 40.375 74.0762 40.0625 74.0762 39.5645C74.0762 39.1934 73.8125 38.9395 73.207 38.8027L72.4062 38.6172C71.4785 38.4023 70.9902 37.8945 70.9902 37.1914C70.9902 36.2832 71.7812 35.6289 72.9531 35.6289C74.0469 35.6289 74.7402 36.2148 74.8477 37.0742H74.0273ZM78.3535 35.6973V36.4004H77.2402V39.4766C77.2402 40.1602 77.5723 40.2676 77.9336 40.2676C78.0898 40.2676 78.3047 40.2578 78.4316 40.248V41.0293C78.3047 41.0488 78.0898 41.0684 77.8457 41.0684C77.1426 41.0684 76.3906 40.6289 76.3906 39.6914V36.4004H75.5898V35.6973H76.3906V34.4277H77.2402V35.6973H78.3535Z" fill="black"/>
                      <path d="M209.371 21.5293L204.908 23.7852V22.877L208.287 21.2656V21.207L204.908 19.5859V18.6777L209.371 20.9434V21.5293Z" fill="black"/>
                    </g>
                    <defs>
                      <filter id="filter0_d_440_184" x="0" y="0" width="224" height="57" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_440_184"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_440_184" result="shape"/>
                      </filter>
                    </defs>
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </ChatContainer>
      </div>
      <div 
        className="flex-shrink-0 p-3 transition-all bg-background md:backdrop-blur-sm"
        style={{ 
          backgroundImage: 'url(/drawingpaper.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <PromptInputBasic
          stop={handleStop}
          input={input}
          onValueChange={(value) => {
            setInput(value);
          }}
          onSubmit={onSubmit}
          onSubmitWithImages={onSubmitWithImages}
          isGenerating={props.isLoading || chat?.state === "running"}
        />
      </div>
    </div>
  );
}

function MessageBody({ message }: { message: any }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end py-1 mb-3">
        <div className="rounded-xl px-4 py-1 max-w-[80%] ml-auto" style={{ backgroundColor: '#FFF5D1' }}>
          {message.parts.map((part: any, index: number) => {
            if (part.type === "text") {
              return <div key={index}>{part.text}</div>;
            } else if (
              part.type === "file" &&
              part.mediaType?.startsWith("image/")
            ) {
              return (
                <div key={index} className="mt-2">
                  <Image
                    src={part.url as string}
                    alt="User uploaded image"
                    width={200}
                    height={200}
                    className="max-w-full h-auto rounded"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              );
            }
            return <div key={index}>unexpected message</div>;
          })}
        </div>
      </div>
    );
  }

  if (Array.isArray(message.parts) && message.parts.length !== 0) {
    return (
      <div className="mb-4 ml-4 mt-4">
        {message.parts.map((part: any, index: any) => {
          if (part.type === "text") {
            return (
              <div key={index} className="mb-4">
                <Markdown className="prose prose-sm dark:prose-invert max-w-none">
                  {part.text}
                </Markdown>
              </div>
            );
          }

          if (part.type.startsWith("tool-")) {
            // if (
            //   part.toolInvocation.state === "result" &&
            //   part.toolInvocation.result.isError
            // ) {
            //   return (
            //     <div
            //       key={index}
            //       className="border-red-500 border text-sm text-red-800 rounded bg-red-100 px-2 py-1 mt-2 mb-4"
            //     >
            //       {part.toolInvocation.result?.content?.map(
            //         (content: { type: "text"; text: string }, i: number) => (
            //           <div key={i}>{content.text}</div>
            //         )
            //       )}
            //       {/* Unexpectedly failed while using tool{" "}
            //       {part.toolInvocation.toolName}. Please try again. again. */}
            //     </div>
            //   );
            // }

            // if (
            //   message.parts!.length - 1 == index &&
            //   part.toolInvocation.state !== "result"
            // ) {
            return <ToolMessage key={index} toolInvocation={part} />;
            // } else {
            //   return undefined;
            // }
          }
        })}
      </div>
    );
  }

  if (message.parts) {
    return (
      <div className="ml-4 mt-2">
        <Markdown className="prose prose-sm dark:prose-invert max-w-none">
          {message.parts
            .map((part: any) =>
              part.type === "text" ? part.text : "[something went wrong]"
            )
            .join("")}
        </Markdown>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-500">Something went wrong</p>
    </div>
  );
}
