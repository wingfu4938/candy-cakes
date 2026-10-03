import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type CreamId,
  type FinishId,
  type FlavorId,
  type OccasionId,
  type SizeId,
  leadDaysFor,
} from "@/lib/catalog";
import { uid } from "@/lib/utils";

export type Draft = {
  occasion: OccasionId | null;
  size: SizeId | null;
  /** Chosen cake design (gallery slug). */
  flavor: FlavorId | null;
  /** Cream type, e.g. "fresh-cream". */
  cream: CreamId | null;
  /** Taste id, e.g. "matcha". */
  taste: string | null;
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
  cream: null,
  taste: null,
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
        if (
          !draft.occasion ||
          !draft.size ||
          !draft.flavor ||
          !draft.cream ||
          !draft.taste ||
          !draft.date ||
          !draft.name ||
          !draft.phone
        ) {
          return null;
        }
        const commission: Commission = {
          ...draft,
          id: uid(),
          createdAt: new Date().toISOString(),
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
