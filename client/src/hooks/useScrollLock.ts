import { useEffect, useRef } from 'react';

export function useScrollLock(
  cooldown: number = 200,
  onUnlock?: () => void
) {
  const isScrollingRef = useRef(false);
  const onUnlockRef = useRef(onUnlock);

  useEffect(() => {
    onUnlockRef.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    let timer: number | undefined;
    let wasLocked = false;

    const lockScroll = () => {
      isScrollingRef.current = true;
      wasLocked = true;

      if (timer !== undefined) window.clearTimeout(timer);

      timer = window.setTimeout(() => {
        isScrollingRef.current = false;
        timer = undefined;

        if (wasLocked) {
          wasLocked = false;
          onUnlockRef.current?.();
        }
      }, cooldown);
    };

    window.addEventListener('wheel', lockScroll, { passive: true });
    window.addEventListener('scroll', lockScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', lockScroll);
      window.removeEventListener('scroll', lockScroll);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [cooldown]);

  return isScrollingRef;
}
