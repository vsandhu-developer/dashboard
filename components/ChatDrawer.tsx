"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Check, Loader2 } from "lucide-react";
import type { PostLog } from "@/lib/types";

interface Message {
  role: "user" | "assistant";
  content: string;
  ts: number;
}

interface ChatDrawerProps {
  post: PostLog | null;
  open: boolean;
  onClose: () => void;
  onApprove: (updatedBody: string) => void;
}

export default function ChatDrawer({ post, open, onClose, onApprove }: ChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [currentDraft, setCurrentDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      setMessages([]);
      setCurrentDraft(post.body_preview || "");
      setInput("");
    }
  }, [post]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  if (!post) return null;

  async function sendMessage() {
    if (!input.trim() || sending) return;

    const userMsg: Message = { role: "user", content: input, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    const sent = input;
    setInput("");
    setSending(true);

    try {
      const r = await fetch("/api/revise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id: post?.postsyncer_id,
          platform: post?.platform,
          current_draft: currentDraft,
          feedback: sent,
        }),
      });
      const data = await r.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.message || "Revised.",
        ts: Date.now(),
      };
      setMessages((m) => [...m, assistantMsg]);
      if (data.revised_draft) setCurrentDraft(data.revised_draft);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Revision endpoint not wired yet. Chat draft updated locally only.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg flex flex-col transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--bg-elev)",
          borderLeft: "1px solid var(--border)",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.5)",
        }}
      >
        <header
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div>
            <h3 className="text-sm font-semibold">Chat to revise</h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {post.platform} · {post.type} · {post.scheduled?.slice(0, 16).replace("T", " ")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded flex items-center justify-center"
            style={{ background: "var(--bg-elev-2)" }}
          >
            <X size={14} />
          </button>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div
            className="p-4 border-b"
            style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elev-2)" }}
          >
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--text-dim)" }}
            >
              Current Draft
            </div>
            <pre
              className="text-sm leading-relaxed whitespace-pre-wrap font-sans"
              style={{ color: "var(--text)" }}
            >
              {currentDraft}
            </pre>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div
                className="text-center py-6 text-xs"
                style={{ color: "var(--text-dim)" }}
              >
                Tell the writer what to change.
                <br />
                &quot;Make the hook punchier.&quot;
                <br />
                &quot;Cut the middle paragraph.&quot;
                <br />
                &quot;Add the pest control number.&quot;
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className="flex"
                style={{ justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}
              >
                <div
                  className="max-w-[85%] rounded-2xl px-3 py-2 text-sm"
                  style={{
                    background: m.role === "user" ? "var(--accent)" : "var(--bg-elev-2)",
                    color: m.role === "user" ? "white" : "var(--text)",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl px-3 py-2 text-sm flex items-center gap-2"
                  style={{ background: "var(--bg-elev-2)", color: "var(--text-muted)" }}
                >
                  <Loader2 size={12} className="animate-spin" />
                  Writer is revising…
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="What should change?"
                disabled={sending}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: "var(--bg-elev-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="btn btn-secondary"
                style={{ opacity: !input.trim() || sending ? 0.5 : 1 }}
              >
                <Send size={14} />
              </button>
            </div>

            <button
              onClick={() => {
                onApprove(currentDraft);
                onClose();
              }}
              className="btn btn-primary w-full mt-2 justify-center"
              disabled={currentDraft === post.body_preview}
              style={{ opacity: currentDraft === post.body_preview ? 0.5 : 1 }}
            >
              <Check size={14} />
              {currentDraft === post.body_preview ? "No changes yet" : "Approve + update schedule"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
