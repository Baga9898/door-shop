import { useEffect, useState } from 'react';

const useOutsideClick = (initialValue, reference) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
      if (!value) return;
      const handleClick = (event) => {
        if (reference.current && !reference.current.contains(event.target)) {
          setValue(false);
        }
      }
      window.addEventListener("click", handleClick);
  
      return () => window.removeEventListener("click", handleClick);
  }, [value]);

  return [value, setValue];
};

export { useOutsideClick };
