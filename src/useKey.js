import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callBacks(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callBacks);

      // this is a clear up funtion for this effect

      return function () {
        document.removeEventListener("keydown", callBacks);
      };
    },
    [action, key]
  );
}
