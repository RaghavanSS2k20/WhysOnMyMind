import Router from "next/router";
import { usePageLoading } from "@/utils/root/usePageLoading";
import WhysOnMyMindLoader from "@/components/WhysOnMyMindLoader";
export default function App({ Component, pageProps }) {
    const { isPageLoading } = usePageLoading();
  
    return (
      <>
        {isPageLoading ? (
          <WhysOnMyMindLoader/>
        ) : (
          <Component {...pageProps} />
        )}
      </>
     );
  }