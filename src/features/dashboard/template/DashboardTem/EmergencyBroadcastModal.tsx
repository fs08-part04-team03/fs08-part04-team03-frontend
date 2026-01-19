'use client';

import { useState, useRef, useEffect } from 'react';
import { clsx } from '@/utils/clsx';
import Button from '@/components/atoms/Button/Button';

interface EmergencyBroadcastModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
}

export const EmergencyBroadcastModal = ({
  open,
  onClose,
  onSend,
}: EmergencyBroadcastModalProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      textareaRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[var(--z-overlay-content)] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-16 p-24 w-full max-w-400 shadow-xl m-16">
        <h2 className="text-18 font-bold text-gray-900 mb-16">긴급 알림 전송</h2>

        <p className="text-14 text-gray-600 mb-8">전체 사용자에게 발송될 알림 내용을 입력하세요.</p>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={clsx(
            'w-full h-120 p-12 mb-20',
            'border border-gray-200 rounded-8',
            'text-14 text-gray-900',
            'placeholder:text-gray-400',
            'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
            'resize-none'
          )}
          placeholder="내용을 입력해주세요"
        />

        <div className="flex justify-end gap-10">
          <Button variant="secondary" className="w-80 h-40 text-14" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primary"
            className="w-80 h-40 text-14"
            onClick={handleSend}
            inactive={!message.trim()}
          >
            전송
          </Button>
        </div>
      </div>
    </div>
  );
};
