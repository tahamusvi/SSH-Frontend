
import { Category, SoftwareSummary, SoftwareDetail } from '../types';

const BASE_URL = 'https://apitest.fpna.ir';

// Helper to construct full image URLs
export const getImageUrl = (path: string | null) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
};

export const apiService = {
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await fetch(`${BASE_URL}/software/categories/`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getSoftwareList: async (): Promise<{ count: number; results: SoftwareSummary[] }> => {
    try {
      // Assuming no pagination for simplicity or just first page
      const response = await fetch(`${BASE_URL}/software/list/`);
      if (!response.ok) throw new Error('Failed to fetch software list');
      return await response.json();
    } catch (error) {
      console.error('Error fetching software list:', error);
      return { count: 0, results: [] };
    }
  },

  getSoftwareDetail: async (slug: string): Promise<SoftwareDetail | null> => {
    try {
      const response = await fetch(`${BASE_URL}/software/detail/${slug}/`);
      if (!response.ok) throw new Error('Failed to fetch software detail');
      return await response.json();
    } catch (error) {
      console.error('Error fetching software detail:', error);
      return null;
    }
  }
};
