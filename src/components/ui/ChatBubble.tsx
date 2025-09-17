'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import { ChatBubbleIcon } from './ChatBubbleIcon';

export function ChatBubble() {
  useEffect(() => {
    // mount n8n chat (id must exist in DOM)
    const destroy = createChat({
      webhookUrl:
        'https://ai-agents.juicefin.com/webhook/202a6379-0c36-4265-b09a-bc0e404d0c32/chat',
      mode: 'window',
      showWelcomeScreen: false,
      // openWindowOnLoad: true, // <- uncomment if you want it open by default
      initialMessages: [
        "Hello! I'm Berry👋",
        'I am here to help insurance companies like yours with our comprehensive solutions for managing incoming and outgoing payments.',
        'If you have any questions or need assistance, feel free to ask',
      ],
      i18n: {
        en: {
          title: 'Berry Assistant',
          subtitle: 'Juice Financial',
          inputPlaceholder: 'Type your question...',
          getStarted: 'New Conversation',
          footer: 'Powered by Juice Financial',
          closeButtonTooltip: 'Close chat',
        },
      },
    });

  }, []);

  return (
    <div id="n8n-chat" className="fixed bottom-6 right-6 z-50">
      <button
        aria-label="Open chat"
        className="chat-button-wrapper relative h-16 w-16 rounded-full shadow-lg outline-none ring-0"
      >
        <ChatBubbleIcon className="h-full w-full" />
      </button>
    </div>
  );
}
