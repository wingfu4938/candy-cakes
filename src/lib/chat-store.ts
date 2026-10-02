import { create } from "zustand";
import { persist } from "zustand/middleware";
import { uid } from "@/lib/utils";

export type ChatRole = "user" | "agent";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  at: string;
};

type ChatState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  messages: ChatMessage[];
  addMessage: (role: ChatRole, text: string) => ChatMessage;
  greeted: boolean;
  markGreeted: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      open: false,
      setOpen: (open) => set({ open }),
      messages: [],
      greeted: false,
      markGreeted: () => set({ greeted: true }),
      addMessage: (role, text) => {
        const message: ChatMessage = {
          id: uid(),
          role,
          text,
          at: new Date().toISOString(),
        };
        set((s) => ({ messages: [...s.messages, message] }));
        return message;
      },
    }),
    {
      name: "qitang-facebook-chat",
      partialize: (s) => ({
        messages: s.messages,
        greeted: s.greeted,
      }),
    },
  ),
);
