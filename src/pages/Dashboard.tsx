import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatArea } from "@/components/ChatArea";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"conversations" | "documents">("conversations");
  const [isIndexing, setIsIndexing] = useState(true);
  const [isReady, setIsReady] = useState(false);
  
  const [conversations] = useState([
    {
      id: "1",
      title: "New Chat",
      model: "Flash",
      timestamp: "09:49 PM"
    }
  ]);

  // Simulate indexing process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIndexing(false);
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNewConversation = () => {
    console.log("Creating new conversation...");
  };

  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        conversations={conversations}
        onNewConversation={handleNewConversation}
      />
      <ChatArea
        isIndexing={isIndexing}
        isReady={isReady}
      />
    </div>
  );
};

export default Dashboard;
