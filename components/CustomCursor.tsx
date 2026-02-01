"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {

  const [position, setPosition] = useState({x:0 , y:0});

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({x:e.clientX, y:e.clientY});
    }

    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  })
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-9999"
    style={{transform : `translate(${position.x - 40}px, ${position.y - 40}px)`}}>
      <div className="w-20 h-20 rounded-full bg-linear-to-r from-[#6366f1] via-[#22d3ee] to-[#f472b6] blur-3xl opacity-80" />
    </div>
  )
}