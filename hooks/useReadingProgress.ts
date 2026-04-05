import { useState, useEffect, useRef } from 'react';
import { useReadingHistory } from './useReadingHistory';

interface ReadingProgressOptions {
  postId: string;
  slug: string;
  title: string;
  content: string;
  readingTime?: number;
  throttleMs?: number;
}

export function useReadingProgress({
  postId,
  slug,
  title,
  content,
  readingTime,
  throttleMs = 1000,
}: ReadingProgressOptions) {
  const [progress, setProgress] = useState(0);
  const { addToHistory, getHistoryItem } = useReadingHistory();
  const lastUpdateRef = useRef<number>(0);
  const hasStartedReadingRef = useRef(false);

  useEffect(() => {
    // Restore previous progress if exists
    const historyItem = getHistoryItem(postId);
    if (historyItem?.progress) {
      setProgress(historyItem.progress);
    }
  }, [postId, getHistoryItem]);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle updates
      if (now - lastUpdateRef.current < throttleMs) {
        return;
      }

      // Calculate reading progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate how much of the content has been viewed
      const scrollableDistance = documentHeight - windowHeight;
      const scrolledPercentage = (scrollTop / scrollableDistance) * 100;
      
      // Start tracking only after user scrolls past 10%
      if (scrolledPercentage > 10 && !hasStartedReadingRef.current) {
        hasStartedReadingRef.current = true;
        addToHistory({
          postId,
          slug,
          title,
          readingTime,
          progress: Math.round(scrolledPercentage),
        });
      }

      // Update progress if user has started reading
      if (hasStartedReadingRef.current) {
        const newProgress = Math.min(100, Math.round(scrolledPercentage));
        setProgress(newProgress);
        lastUpdateRef.current = now;

        // Update history with new progress
        addToHistory({
          postId,
          slug,
          title,
          readingTime,
          progress: newProgress,
        });
      }
    };

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [postId, slug, title, readingTime, addToHistory, throttleMs]);

  // Save final progress when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasStartedReadingRef.current) {
        addToHistory({
          postId,
          slug,
          title,
          readingTime,
          progress,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also save on unmount (SPA navigation)
      if (hasStartedReadingRef.current) {
        addToHistory({
          postId,
          slug,
          title,
          readingTime,
          progress,
        });
      }
    };
  }, [postId, slug, title, readingTime, progress, addToHistory]);

  return {
    progress,
    hasStartedReading: hasStartedReadingRef.current,
  };
}
