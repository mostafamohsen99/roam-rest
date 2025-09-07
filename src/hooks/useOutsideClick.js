import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        //console.log("ref.current", ref.current);
        // console.log("e.target", e.target);
        if (ref.current && !ref.current.contains(e.target)) {
          //   console.log("Click out side");
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
