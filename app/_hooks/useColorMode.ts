import { useEffect, useState } from "react";

const useColorMode = () => {
  const [colorMode, setColorMode] = useState("light");

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const bodyClasses = window.document.body.classList;

      colorMode === "dark" ? bodyClasses.add("dark") : bodyClasses.remove("dark");
    }
  }, [colorMode]);

  return [colorMode, setColorMode] as const;
};

export default useColorMode;