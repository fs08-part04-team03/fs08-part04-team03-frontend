'use client';

import Image from 'next/image';

const ChatHeader = (): JSX.Element => (
  <div className="snack-chat-header snack-chat-header--with-logo">
    <Image src="/logo/logo-ai-black.svg" alt="SNACK" width={80} height={20} priority />
  </div>
);

export default ChatHeader;
