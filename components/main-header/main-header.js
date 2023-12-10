'use client';
import logoImg from '@/assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import classes from './main-header.module.css';
import MainHeaderBackground from './main-header-background';
import { usePathname } from 'next/navigation';
import NavLink from './Nav-link';
export default function MainHeader() {
  const path = usePathname();
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href='/'>
          <Image src={logoImg} alt='a plate with food on it' priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href='/meals'>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href='/community'>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
