import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type CreamId,
  type FlavorId,
  type SizeId,
  leadDaysFor,
} from "@/lib/catalog";
import { uid } from "@/lib/utils";

export type Draft = {
  size: SizeId | null;
  /** Chosen cake design (gallery slug). */
  flavor: FlavorId | null;
  /** Cream type, e.g. "fresh-cream". */
  cream: CreamId | null;
  /** Taste id, e.g. "matcha". */
  taste: string | null;
  /** Name to write on the cake (optional). */
  cakeName: string;
  /** Age to write on the cake (optional). */
  cakeAge: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
  /** Always pickup; kept for record shape. */
  delivery: "pickup";
  /** Chosen pickup day, YYYY-MM-DD. */
  pickupDate: string;
  /** Chosen pickup time, HH:MM (24h). */
  pickupTime: string;
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
  size: null,
  flavor: null,
  cream: null,
  taste: null,
  cakeName: "",
  cakeAge: "",
  notes: "",
  name: "",
  phone: "",
  email: "",
  delivery: "pickup",
  pickupDate: "",
  pickupTime: "",
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
          !draft.size ||
          !draft.flavor ||
          !draft.cream ||
          !draft.taste ||
          !draft.name ||
          !draft.phone ||
          !draft.pickupDate ||
          !draft.pickupTime
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
