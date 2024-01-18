import { useEffect, useState } from 'react';

const useWindowResize = (isOpen) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth <= 700) {
        document.body.style.overflowY = isOpen ? 'hidden' : 'scroll';
      } else {
        document.body.style.overflowY = 'scroll';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return windowWidth;
};

export default useWindowResize;
