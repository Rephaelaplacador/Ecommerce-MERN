import { create } from "zustand";
import axios from "../lib/axios";

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  purchaseStatus: null,
  fetchCustomerOrders: async (token) => {
    set({ loading: true });
    try {
      const response = await axios.get("/orders/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ orders: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({ loading: false });
    }
  },
  updatePurchaseStatus: (status) => {
    set({ purchaseStatus: status });
  },
}));
