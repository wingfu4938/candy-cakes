import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type FinishId,
  type FlavorId,
  type OccasionId,
  type SizeId,
  leadDaysFor,
  quotePrice,
} from "@/lib/catalog";
import { uid } from "@/lib/utils";

export type Draft = {
  occasion: OccasionId | null;
  size: SizeId | null;
  flavor: FlavorId | null;
  finish: FinishId | null;
  inscription: string;
  date: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
  delivery: "pickup" | "delivery";
};

export type Commission = Draft & {
  id: string;
  createdAt: string;
  total: number;
  leadDays: number;
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
};

const emptyDraft = (): Draft => ({
  occasion: null,
  size: null,
  flavor: null,
  finish: "velvet",
  inscription: "",
  date: "",
  notes: "",
  name: "",
  phone: "",
  email: "",
  delivery: "pickup",
});

type State = {
  draft: Draft;
  setDraft: (partial: Partial<Draft>) => void;
  resetDraft: () => void;
  commissions: Commission[];
  submitCommission: () => Commission | null;
  inquiries: Inquiry[];
  submitInquiry: (input: Omit<Inquiry, "id" | "createdAt">) => Inquiry;
};

export const useOrderStore = create<State>()(
  persist(
    (set, get) => ({
      draft: emptyDraft(),
      setDraft: (partial) =>
        set((s) => ({ draft: { ...s.draft, ...partial } })),
      resetDraft: () => set({ draft: emptyDraft() }),
      commissions: [],
      submitCommission: () => {
        const { draft } = get();
        const total = quotePrice(draft);
        if (!total || !draft.occasion || !draft.size || !draft.flavor || !draft.date || !draft.name || !draft.phone) {
          return null;
        }
        const commission: Commission = {
          ...draft,
          id: uid(),
          createdAt: new Date().toISOString(),
          total,
          leadDays: leadDaysFor(draft),
        };
        set((s) => ({
          commissions: [commission, ...s.commissions],
          draft: emptyDraft(),
        }));
        return commission;
      },
      inquiries: [],
      submitInquiry: (input) => {
        const inquiry: Inquiry = {
          ...input,
          id: uid(),
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ inquiries: [inquiry, ...s.inquiries] }));
        return inquiry;
      },
    }),
    { name: "candy-cakes-orders" },
  ),
);
