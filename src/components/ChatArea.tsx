import { Send, Sparkles, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChatAreaProps {
  isIndexing: boolean;
  isReady: boolean;
  userName?: string;
  space?: string;
  mode?: string;
}

export const ChatArea = ({ 
  isIndexing, 
  isReady, 
  userName = "QuanMario",
  space = "Physics 4A",
  mode = "Flash"
}: ChatAreaProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || !isReady) return;
    // Handle send message
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="flex-1 flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileCheck className="w-4 h-4" />
            <span className="text-sm font-medium">New Conversation</span>
          </div>
          <span className="text-sm text-muted-foreground">3 documents in space</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="bg-admin-bg text-admin-text hover:bg-admin-bg border-0 font-medium">
            Admin
          </Badge>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Mode:</span>
            <Badge variant="secondary" className="font-medium">
              <Sparkles className="w-3 h-3 mr-1" />
              {mode}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full space-y-8">
          {/* Greeting */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mb-4">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Hi {userName}, how are you?
            </h1>
          </div>

          {/* Status Banner */}
          <div className="flex flex-col gap-3">
            {isIndexing && (
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-secondary border border-border">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  Waiting for documents to be indexed...
                </span>
              </div>
            )}
            
            {isReady && (
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-success/10 border border-success/20">
                <FileCheck className="w-4 h-4 text-success" />
                <span className="text-sm text-success font-medium">
                  All 3 sources indexed. Ready to chat!
                </span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="relative">
            <div
              className={cn(
                "relative rounded-2xl border transition-all",
                isReady
                  ? "border-border bg-background shadow-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                  : "border-border bg-muted opacity-60 cursor-not-allowed"
              )}
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isReady ? "Ask a question about your documents..." : "Waiting for indexing..."}
                disabled={!isReady}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 py-6 text-base bg-transparent"
              />
              <Button
                onClick={handleSend}
                disabled={!isReady || !message.trim()}
                size="icon"
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 rounded-xl",
                  isReady && message.trim()
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {isReady && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                Press <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-xs">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-xs">Shift + Enter</kbd> for new line
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
