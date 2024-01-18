import { useState, useEffect } from 'react';

const useToggleSidebar = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth <= 700) {
        setToggle(false);
      }
    };

    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  return [toggle, setToggle];
};

export default useToggleSidebar;
