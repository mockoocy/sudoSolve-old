import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOuterClick(callback: Function) {
  const callbackRef = useRef<any>(); // initialize mutable ref, which stores callback
  const innerRef = useRef<any>(); // returned to client, who marks "border" element

  // update cb on each render, so second useEffect has access to current value 
  useEffect(() => { callbackRef.current = callback; });
  
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e: Event | React.MouseEvent) {
      if (innerRef.current && callbackRef.current && 
        !innerRef.current.contains(e.target)
      ) callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener
      
  return innerRef; // convenience for client (doesn't need to init ref himself) 
}