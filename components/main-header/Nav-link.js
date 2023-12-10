import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './Nav-link.module.css';
export default function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href) ? `${classes.active}` : `${classes.link}`
      }
    >
      {children}
    </Link>
  );
}
