"use client";

import { useEffect, useState } from "react";
import { BiExitFullscreen, BiMenu } from "react-icons/bi";
import Button from "../base/Button";
import NavPage from "../interaction/NavPage";
import TypingMessage from "../interaction/TypingMessage";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "@pub/icons/icon.png";
import Link from "../base/Link";

export default function Header() {
  const [visibility, setVisibility] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
    
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setVisibility(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <header className={`${styles.container} ${visibility ? styles.containerOpenMenu : ""}`}>
        <Link href="/" className={styles.containerLogo}>
          <Image src={logo} alt="Logo" width={40} height={40} />
        </Link>
        <TypingMessage data={["PV 6:9-11", "JO 3:16", "MT 6:6", "JR 29:11", "FP 4:6–7"]}/>
        {isMobile ?
          <>
            <div className={styles.menu}>
              <Button onClick={() => setVisibility(!visibility)} variant="icon" Icon={visibility ?  BiExitFullscreen : BiMenu} />
            </div>
                        
            <div onClick={() => setVisibility(false)} className={styles.menuNav}>
              <NavPage gridIcons/>
            </div>
          </>
          :
          <div className={styles.menu}>
            <NavPage row/>
          </div>
        }
      </header>
      <div className={styles.fill}/>
    </div>
  );
}