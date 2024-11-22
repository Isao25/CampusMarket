import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BellOff, Flag, Lock, Send, Smile, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
//import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";

type Message = {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  receivedId: string;
};

type Contact = {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  faculty: string;
};

export function Chat() {
  const [message, setMessage] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactsSeller, setContactsSeller] = useState<Contact[]>([
    {
      id: "1",
      name: "Juan Rodriguez",
      avatar: "/placeholder.svg",
      lastMessage: "Lorem ipsum",
      timestamp: "01:05 pm",
      unreadCount: 5,
      faculty: "FCE",
    },
    {
      id: "2",
      name: "Pablo Meza",
      avatar: "/placeholder.svg",
      lastMessage: "Lorem ipsum",
      timestamp: "02:05 pm",
      unreadCount: 2,
      faculty: "FISI",
    },
  ]);
  const [contactsBuyer, setContactsBuyer] = useState<Contact[]>([
    {
      id: "1",
      name: "Adriana Rodriguez",
      avatar: "/placeholder.svg",
      lastMessage: "Lorem ipsum",
      timestamp: "01:05 pm",
      unreadCount: 2,
      faculty: "FCF",
    },
    {
      id: "2",
      name: "Rodrigo Meza",
      avatar: "/placeholder.svg",
      lastMessage: "Lorem ipsum",
      timestamp: "02:05 pm",
      unreadCount: 4,
      faculty: "FCB",
    },
    {
      id: "3",
      name: "Juan Carlos",
      avatar: "/placeholder.svg",
      lastMessage: "Lorem ipsum",
      timestamp: "02:05 pm",
      unreadCount: 1,
      faculty: "FIEE",
    },
  ]);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setEmojiPickerVisible(false);
  };

  const sendMessages = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      senderId: "currentUser",
      receivedId: selectedContact.id,
    };

    console.log("mensaje: ", message);

    setMessage((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="flex h-[784px] bg-primaryLight mt-8 mb-6 space-x-3">
      {/* Panel izquierdo - Bandeja de entrada */}
      <div className="w-80 border rounded-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Bandeja de entrada</h2>
          <Tabs defaultValue="comprador" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#003669]/20 text-terciaryLight ">
              <TabsTrigger
                value="comprador"
                className="data-[state=active]:bg-secondaryLight data-[state=active]:text-primaryLight"
              >
                Comprador
              </TabsTrigger>
              <TabsTrigger
                value="vendedor"
                className="data-[state=active]:bg-secondaryLight data-[state=active]:text-primaryLight"
              >
                Vendedor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="comprador">
              <ScrollArea className="h-[calc(100vh-8rem)]">
                {contactsSeller.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className="w-full p-4 flex items-start gap-3 hover:bg-accent transition-colors"
                  >
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between">
                        <span className="font-semibold">{contact.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {contact.timestamp}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          {contact.lastMessage}
                        </p>
                        {contact.unreadCount && (
                          <Badge
                            variant="default"
                            className="rounded-full bg-secondaryLight"
                          >
                            {contact.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="vendedor">
              <ScrollArea className="h-[calc(100vh-8rem)]">
                {contactsBuyer.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className="w-full p-4 flex items-start gap-3 hover:bg-accent transition-colors"
                  >
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between">
                        <span className="font-semibold">{contact.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {contact.timestamp}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          {contact.lastMessage}
                        </p>
                        {contact.unreadCount && (
                          <Badge
                            variant="default"
                            className="rounded-full bg-secondaryLight"
                          >
                            {contact.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Panel del medio - Chat */}
      <div className="flex-1 flex flex-col rounded-lg border">
        {selectedContact ? (
          <>
            <div className="border-b p-4 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedContact.avatar} />
                <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{selectedContact.name}</span>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-2">
                {message.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === "currentUser"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-l-[8px] rounded-t-[8px] p-3 space-y-2 ${
                        message.senderId === "currentUser"
                          ? "bg-secondaryLight text-primaryLight"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <span className="text-right text-xs opacity-70 mt-1 block">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessages();
                }}
                className="flex items-center gap-2"
              >
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
                >
                  <Smile className="h-5 w-5" />
                </Button>
                {isEmojiPickerVisible && (
                  <div className="absolute bottom-20">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe tu mensaje"
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-secondaryLight hover:bg-secondaryLight/80"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Selecciona una conversación para comenzar
          </div>
        )}
      </div>
      {/* Panel derecho - Perfil */}
      {selectedContact && (
        <Card className="w-80 border rounded-lg shadow-none">
          <div className="p-6 flex flex-col items-center text-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 font-semibold text-lg">
              {selectedContact.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedContact.faculty}
            </p>
            <div className="mt-6 space-y-5 w-full">
              <div className="flex gap-9 justify-center items-center">
                <Link
                  to="/"
                  className="flex text-center flex-col justify-center items-center gap-1"
                >
                  <div className="p-4 hover:bg-accent rounded-full cursor-pointer">
                    <User className="h-5 w-5" />
                  </div>
                  Perfil
                </Link>
                <div className="flex text-center flex-col justify-center items-center gap-1">
                  <div
                    className="p-4 hover:bg-accent rounded-full cursor-pointer"
                    onClick={(e) => alert("Hola")}
                  >
                    <BellOff className="h-5 w-5" />
                  </div>
                  Silenciar
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-none bg-background hover:bg-accent hover:text-accent-foreground"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Bloquear
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive border-none hover:bg-destructive/90"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Reportar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
