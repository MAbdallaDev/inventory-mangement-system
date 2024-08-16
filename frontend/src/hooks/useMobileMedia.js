import { useEffect, useState } from "react";

const useMobileMedia = () => {
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
   useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 992);
      window.addEventListener('resize', handleResize)
      return () => {
         window.addEventListener('resize', handleResize)
      }
   }, [])

   return isMobile;
}
export default useMobileMedia;
