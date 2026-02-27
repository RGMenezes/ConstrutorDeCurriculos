"use client";
import styles from "./NavPage.module.css";
import Link from "../base/Link";
import { useAuth } from "@/hooks/useAuth";
import { MdDashboard, MdOutlineBadge, MdOutlineChat, MdOutlineSchool, MdOutlineWorkOutline, MdOutlineWorkspacePremium, MdSettings, MdTranslate} from "react-icons/md";

export default function NavPage({ row, gridIcons, isLogged }: { row?: boolean, gridIcons?: boolean, isLogged?: boolean }) {
  const auth = useAuth();

  if(typeof isLogged === "undefined"){
    isLogged = auth.isLogged;
  }

  return (
    <nav>
      <ul className={`${styles.list} ${row && styles.row} ${gridIcons && isLogged && styles.grid}`}>
        {isLogged ? (
        
          <>
            <li>
              <Link variant="icon" Icon={MdOutlineBadge} href="/dashboard/profile" />
            </li>
            <li>
              <Link variant="icon" Icon={MdOutlineWorkOutline} href="/dashboard/work" />
            </li>
            <li>
              <Link variant="icon" Icon={MdOutlineSchool} href="/dashboard/formation" />
            </li>
            <li>
              <Link variant="icon" Icon={MdOutlineWorkspacePremium} href="/dashboard/skill" />
            </li>
            <li>
              <Link variant="icon" Icon={MdOutlineChat} href="/dashboard/feedback" />
            </li>
            <li>
              <Link variant="icon" Icon={MdTranslate} href="/dashboard/language" />
            </li>
            <li>
              <Link variant="icon" Icon={MdSettings} href="/dashboard/settings" />
            </li>
            <li>
              <Link variant="icon" Icon={MdDashboard} href="/dashboard" />
            </li>
          </>

        ) : (
  
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/about">Sobre</Link>
            </li>
            <li>
              <Link href="/terms">Termos</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
            <li>
              <Link href="/privacy">Políticas</Link>
            </li>
          </>

        )}
      </ul>
    </nav>
  );
}
