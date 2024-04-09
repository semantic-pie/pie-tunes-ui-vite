import { useEffect } from "preact/hooks";

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
