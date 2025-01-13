import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  fetchCustomerOrders: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/orders/mine', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      set({ orders: data, loading: false });
    } catch (error) {
      console.error('Error fetching orders:', error);
      set({ loading: false });
    }
  },
}));
