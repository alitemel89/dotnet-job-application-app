import { create } from "zustand";

type StoreState = {
  companyLogoUrl: string | null;
  setCompanyLogo: (logoUrl: string) => void;
};

export const useStore = create<StoreState>((set) => ({
  companyLogoUrl: null,
  setCompanyLogo: (logoUrl) => set({ companyLogoUrl: logoUrl }),
}));
