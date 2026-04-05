# Blog Reading History Implementation Guide

## Overview
This implementation provides a real-time reading history system using LocalStorage to track user's reading progress and behavior without requiring authentication or database changes.

## Features

### 1. **Real Reading Time Calculation**
- Automatically calculates reading time based on content length
- Average reading speed: 200 words per minute
- Strips markdown syntax for accurate word count

### 2. **Reading Progress Tracking**
- Tracks scroll position to determine reading progress
- Updates history in real-time as user reads
- Throttled updates for performance (1 second default)
- Resumes from last position on return visits

### 3. **Recently Viewed Posts**
- Shows reading progress on previously viewed posts
- Displays "Recently Read" section based on history
- Maintains up to 50 most recent posts

### 4. **Privacy-Friendly**
- All data stored in user's browser (LocalStorage)
- No server-side tracking or authentication required
- User can clear history anytime

## Usage Examples

### Basic Usage in Featured Blog Section

```typescript
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { formatReadingTime, formatLocaleDate } from '@/utils/blogHelpers';

function FeaturedBlog() {
  const { getHistoryItem, addToHistory, isLoaded } = useReadingHistory();

  return (
    <div>
      {/* Display post with real reading time */}
      <div className="meta">
        <Calendar />
        <span>{formatLocaleDate(post.publishedAt)}</span>
        <Clock />
        <span>
          {isLoaded ? (
            (() => {
              const historyItem = getHistoryItem(post.id);
              if (historyItem?.readingTime) {
                return formatReadingTime(historyItem.readingTime);
              }
              // Fallback: estimate from excerpt
              const estimatedTime = Math.max(1, Math.ceil(post.excerpt.length / 200));
              return formatReadingTime(estimatedTime);
            })()
          ) : (
            'Loading...'
          )}
        </span>
      </div>

      {/* Show progress bar if previously read */}
      {getHistoryItem(post.id)?.progress > 0 && (
        <div className="progress-bar">
          <div 
            className="fill"
            style={{ width: `${getHistoryItem(post.id).progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
```

### Advanced Usage with Progress Tracking

```typescript
import { useReadingProgress } from '@/hooks/useReadingProgress';

function BlogPostPage({ post }) {
  const { progress, hasStartedReading } = useReadingProgress({
    postId: post.id,
    slug: post.slug,
    title: post.title,
    content: post.content,
    readingTime: calculateReadingTime(post.content),
  });

  return (
    <div>
      {/* Display reading progress */}
      {hasStartedReading && (
        <div className="reading-progress">
          <div className="progress-bar">
            <div 
              className="fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{progress}% complete</span>
        </div>
      )}

      {/* Post content */}
      <article>{post.content}</article>
    </div>
  );
}
```

### Recently Viewed Section

```typescript
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { formatDate } from '@/utils/blogHelpers';

function RecentlyViewed() {
  const { getRecentlyViewed } = useReadingHistory();
  const recentPosts = getRecentlyViewed(5);

  return (
    <section>
      <h2>Recently Viewed</h2>
      {recentPosts.map((item) => (
        <Link key={item.postId} href={`/blog/${item.slug}`}>
          <h3>{item.title}</h3>
          <p>Last read: {formatDate(item.lastReadAt)}</p>
          {item.progress && item.progress < 100 && (
            <p>Progress: {item.progress}%</p>
          )}
        </Link>
      ))}
    </section>
  );
}
```

## API Reference

### `useReadingHistory()`

**Returns:**
- `history`: Current reading history object
- `addToHistory(item)`: Add/update post in history
- `removeFromHistory(postId)`: Remove post from history
- `clearHistory()`: Clear all history
- `getHistoryItem(postId)`: Get specific post history
- `getRecentlyViewed(limit)`: Get N most recent posts
- `isLoaded`: Boolean indicating if history is loaded from storage

### `useReadingProgress(options)`

**Options:**
- `postId`: Post ID
- `slug`: Post slug
- `title`: Post title
- `content`: Post content
- `readingTime`: Estimated reading time in minutes (optional)
- `throttleMs`: Throttle update frequency in ms (default: 1000)

**Returns:**
- `progress`: Reading progress percentage (0-100)
- `hasStartedReading`: Boolean indicating if user started reading

### Helper Functions

#### `calculateReadingTime(content: string): number`
Calculates reading time in minutes based on word count.

#### `formatReadingTime(minutes: number): string`
Formats reading time for display (e.g., "5 min read").

#### `formatDate(dateString: string): string`
Formats date as relative time (e.g., "2 days ago").

#### `formatLocaleDate(dateString: string, locale?: string): string`
Formats date in locale format (e.g., "Jan 15, 2024").

#### `calculateProgress(current: number, total: number): number`
Calculates progress percentage.

## Storage Structure

Data is stored in LocalStorage with key `'blog_reading_history'`:

```typescript
{
  items: [
    {
      postId: string,
      slug: string,
      title: string,
      lastReadAt: string (ISO date),
      readingTime?: number (minutes),
      progress?: number (0-100)
    }
  ],
  lastUpdated: string (ISO date)
}
```

## Performance Considerations

1. **Throttling**: Scroll events are throttled to avoid performance issues
2. **Max Items**: Limited to 50 most recent posts to prevent storage bloat
3. **Passive Listeners**: Uses passive scroll listeners for better scroll performance
4. **Lazy Loading**: History is loaded asynchronously on component mount

## Browser Support

- Requires LocalStorage support (all modern browsers)
- Falls back gracefully if LocalStorage is unavailable
- Works in Incognito/Private mode (persists until session ends)

## Future Enhancements

Potential improvements for the future:

1. **Sync Across Devices**: Add optional server-side sync for logged-in users
2. **Analytics**: Track reading patterns and popular posts
3. **Reading Streaks**: Gamification elements for engagement
4. **Offline Support**: Service worker for offline reading
5. **Export/Import**: Allow users to backup their reading history

## Troubleshooting

### History not persisting
- Check browser LocalStorage is enabled
- Verify browser console for errors
- Ensure storage quota is not exceeded

### Progress not updating
- Check that scroll listener is attached
- Verify throttle settings are appropriate
- Check browser console for errors

### Reading time inaccurate
- Ensure content is properly formatted (markdown)
- Check word count calculation
- Adjust reading speed constant if needed
