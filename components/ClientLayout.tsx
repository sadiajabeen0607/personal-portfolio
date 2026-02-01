"use client";

import { useState, useEffect } from "react";
import IntroAnimation from "./IntroAnimation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <IntroAnimation onFinish={() => setShowIntro(false)} />
      )}
      {!showIntro && children}
    </>
  );
}
