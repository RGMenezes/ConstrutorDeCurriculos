"use client";

import { useEffect, useRef, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import styles from "./PageLoading.module.css";

const LINE_WIDTHS = ["100%", "100%", "80%"];
const STEP_DURATION = 300;

export default function PageLoading() {
  const [step, setStep] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : 0));
    }, STEP_DURATION);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [step]);

  const getWidth = (idx: number) => {
    if (step === 0) return "0%";
    if (step > idx) return LINE_WIDTHS[idx];
    return "0%";
  };

  return (
    <div className={styles.container}>
      <div className={styles.paper}>
        <div className={styles.line1} style={{ width: getWidth(0), transition: "width 0.3s cubic-bezier(.4,0,.2,1)" }} />
        <div className={styles.line2} style={{ width: getWidth(1), transition: "width 0.3s cubic-bezier(.4,0,.2,1)" }} />
        <div className={styles.line3} style={{ width: getWidth(2), transition: "width 0.3s cubic-bezier(.4,0,.2,1)" }} />
        <FaRegFilePdf className={styles.icon} />
      </div>
    </div>
  );
}
