import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage('color-mode', 'light');

  useEffect(() => {
    const bodyClasses = window.document.body.classList;

    colorMode === "dark" ? bodyClasses.add("dark") : bodyClasses.remove("dark");
  }, [colorMode])

  return [colorMode, setColorMode];
}

export default useColorMode;