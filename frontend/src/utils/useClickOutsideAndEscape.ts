import { useEffect } from 'react';

import type { RefObject } from 'react';

export function useClickOutsideAndEscape(
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
  isOpen: boolean,
  onEscape?: () => void,
) {
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (onEscape) {
          onEscape();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, onClose, onEscape, isOpen]);
}