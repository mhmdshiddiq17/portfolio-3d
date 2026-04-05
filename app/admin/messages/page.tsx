'use client';

import { useEffect, useState } from 'react';
import { Mail, Trash2, Eye, EyeOff, Check, X, Clock } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const url = `/api/admin/messages${filter === 'unread' ? '?unread=true' : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, read }),
      });

      if (!response.ok) {
        throw new Error('Failed to update message');
      }

      setMessages(messages.map(msg =>
        msg.id === id ? { ...msg, read } : msg
      ));

      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read });
      }
    } catch (err) {
      console.error('Error updating message:', err);
      alert('Failed to update message');
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      setMessages(messages.filter(msg => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Failed to delete message');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <X className="mx-auto text-red-500 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Messages</h1>
          <p className="text-gray-400">
            {filter === 'all'
              ? `${messages.length} total messages`
              : `${messages.filter(m => !m.read).length} unread messages`
            }
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-gradient-to-r from-primary to-secondary text-darker'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative ${
              filter === 'unread'
                ? 'bg-gradient-to-r from-primary to-secondary text-darker'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            Unread
            {messages.filter(m => !m.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {messages.filter(m => !m.read).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-4">
          {messages.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center">
              <Mail className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400">
                {filter === 'unread' ? 'No unread messages' : 'No messages yet'}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`glass rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                  selectedMessage?.id === message.id
                    ? 'glow-border border-primary'
                    : 'hover:border-gray-600'
                } ${!message.read ? 'border-l-4 border-l-primary' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold line-clamp-1 flex-1">
                    {message.subject}
                  </h3>
                  {!message.read && (
                    <span className="w-2 h-2 bg-primary rounded-full ml-2 flex-shrink-0" />
                  )}
                </div>

                <p className="text-gray-400 text-sm mb-2">{message.name}</p>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <Clock size={12} />
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {!selectedMessage ? (
            <div className="glass rounded-xl p-8 text-center h-full flex items-center justify-center">
              <Mail className="mx-auto text-gray-600 mb-4" size={64} />
              <p className="text-gray-400">Select a message to view details</p>
            </div>
          ) : (
            <div className="glass rounded-xl p-6 glow-border h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{selectedMessage.name}</span>
                    <span>•</span>
                    <span>{selectedMessage.email}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatDate(selectedMessage.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedMessage.read
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}
                >
                  {selectedMessage.read ? 'Read' : 'Unread'}
                </span>
              </div>

              {/* Message Content */}
              <div className="bg-darker/50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed break-words">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {!selectedMessage.read ? (
                  <button
                    onClick={() => markAsRead(selectedMessage.id, true)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-darker font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Mark as Read
                  </button>
                ) : (
                  <button
                    onClick={() => markAsRead(selectedMessage.id, false)}
                    className="flex-1 px-4 py-3 glass text-white font-semibold rounded-lg hover:border-primary transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <EyeOff size={20} />
                    Mark as Unread
                  </button>
                )}

                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Reply
                </a>

                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="px-4 py-3 bg-red-500/20 text-red-400 border border-red-500/30 font-semibold rounded-lg hover:bg-red-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
