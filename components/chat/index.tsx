'use client';

import { useChatbox, ChatVariant } from '@/store/use-chatbox';
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { ReceivedChatMessage } from '@livekit/components-core';
import { ConnectionState } from 'livekit-client';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChatHeader, ChatHeaderSkeleton } from './chat-header';
import { ChatForm, ChatFormSkeleton } from './chat-form';
import { MessageList, MessageListSkeleton } from './message-list';
import { CommunityTab } from './community-tab';

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  streamOptions: {
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    followersOnly: boolean;
  };
  isFollowing: boolean;
}

export function Chat({
  viewerName,
  hostName,
  hostIdentity,
  streamOptions,
  isFollowing,
}: ChatProps) {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, setCollapsed } = useChatbox((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const [value, setValue] = useState('');
  const { chatMessages: rawMessages, send } = useChat();

  const { isChatEnabled, isChatDelayed, followersOnly } = streamOptions;
  const isOnline = connectionState === ConnectionState.Connected && participant;
  const isHidden = !isChatEnabled || !isOnline;

  useEffect(() => {
    if (matches) {
      setCollapsed(false);
    }
  }, [matches, setCollapsed]);

  const messages = useMemo<ReceivedChatMessage[]>(() => {
    return rawMessages.sort((a, b) => b.timestamp - a.timestamp);
  }, [rawMessages]);

  const sendMessage = () => {
    if (!send) return;

    send(value);
    setValue('');
  };

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-full lg:h-[calc(100vh-80px)] w-full">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <MessageList messages={messages} isHidden={isHidden} />
          <ChatForm
            onSubmitAction={sendMessage}
            value={value}
            onChangeAction={setValue}
            isHidden={isHidden}
            streamOptions={{
              isChatDelayed,
              followersOnly,
            }}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <CommunityTab
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col border-2 border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeaderSkeleton />
      <MessageListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
}
