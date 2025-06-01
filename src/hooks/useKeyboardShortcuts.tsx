
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only trigger if Ctrl/Cmd + key is pressed
      if (!event.ctrlKey && !event.metaKey) return;

      switch (event.key) {
        case 'd':
          event.preventDefault();
          navigate('/dashboard');
          break;
        case 'e':
          event.preventDefault();
          navigate('/dashboard/engagement');
          break;
        case 'r':
          event.preventDefault();
          navigate('/dashboard/rewards');
          break;
        case 'c':
          event.preventDefault();
          navigate('/dashboard/community');
          break;
        case 'a':
          event.preventDefault();
          navigate('/dashboard/analytics');
          break;
        case 'k':
          event.preventDefault();
          // Trigger search modal
          const searchButton = document.querySelector('[data-search-trigger]') as HTMLElement;
          searchButton?.click();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
};
