import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If the URL contains a hash (like #projects), do nothing.
    // This allows react-router-hash-link to scroll to the section.
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Listen for changes to both the path and the hash

  return null;
};

export default ScrollToTop;