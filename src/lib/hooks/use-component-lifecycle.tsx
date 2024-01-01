import { useEffect } from "react";

// Custom hook to log component mount and unmount
export function useLogLifecycle(componentName: string) {
  useEffect(() => {
    // Component mounted
    console.log(`${componentName} mounted`);

    // Component will unmount
    return () => {
      console.log(`${componentName} unmounted`);
    };
  }, [componentName]);
}
