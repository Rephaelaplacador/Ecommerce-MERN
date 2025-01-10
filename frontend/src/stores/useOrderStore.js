import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  orders: [],
  fetchCustomerOrders: async () => {
    try {
      const response = await fetch("/api/customer/orders"); 
      const data = await response.json();
      set({ orders: data });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  },
}));

