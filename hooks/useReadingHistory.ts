import { useState, useEffect } from 'react';

interface ReadingHistoryItem {
  postId: string;
  slug: string;
  title: string;
  lastReadAt: string;
  readingTime?: number; // in minutes
  progress?: number; // 0-100
}

interface ReadingHistory {
  items: ReadingHistoryItem[];
  lastUpdated: string;
}

const STORAGE_KEY = 'blog_reading_history';
const MAX_HISTORY_ITEMS = 50;

export function useReadingHistory() {
  const [history, setHistory] = useState<ReadingHistory>({ items: [], lastUpdated: new Date().toISOString() });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Error loading reading history:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (error) {
        console.error('Error saving reading history:', error);
      }
    }
  }, [history, isLoaded]);

  const addToHistory = (item: Omit<ReadingHistoryItem, 'lastReadAt'>) => {
    setHistory((prev) => {
      const existingIndex = prev.items.findIndex((i) => i.postId === item.postId);
      
      const newItem: ReadingHistoryItem = {
        ...item,
        lastReadAt: new Date().toISOString(),
      };

      let newItems: ReadingHistoryItem[];

      if (existingIndex >= 0) {
        // Update existing item
        newItems = [...prev.items];
        newItems[existingIndex] = newItem;
      } else {
        // Add new item at the beginning
        newItems = [newItem, ...prev.items];
      }

      // Keep only the most recent items
      if (newItems.length > MAX_HISTORY_ITEMS) {
        newItems = newItems.slice(0, MAX_HISTORY_ITEMS);
      }

      return {
        items: newItems,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const removeFromHistory = (postId: string) => {
    setHistory((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.postId !== postId),
    }));
  };

  const clearHistory = () => {
    setHistory({ items: [], lastUpdated: new Date().toISOString() });
  };

  const getHistoryItem = (postId: string): ReadingHistoryItem | undefined => {
    return history.items.find((i) => i.postId === postId);
  };

  const getRecentlyViewed = (limit: number = 5): ReadingHistoryItem[] => {
    return history.items.slice(0, limit);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryItem,
    getRecentlyViewed,
    isLoaded,
  };
}
