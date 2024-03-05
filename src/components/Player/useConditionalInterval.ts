import { useEffect } from 'react';

const useConditionalInterval = (callback: () => void, delay: number, condition: any) => {
  useEffect(() => {
    let intervalId: any

    if (condition) {
      intervalId = setInterval(callback, delay);
    }

    return () => clearInterval(intervalId);
  }, [callback, delay, condition]);
};

export default useConditionalInterval;
