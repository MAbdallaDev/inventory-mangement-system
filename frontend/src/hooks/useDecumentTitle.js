import { useEffect } from "react"

const useDecumentTitle = (title) => {
   useEffect(() => {
      document.title = title;
   }, [title])
}
export default useDecumentTitle;