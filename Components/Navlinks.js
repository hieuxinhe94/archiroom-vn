import { useState, useEffect } from "react";
import styles from "../styles/NavbarFooter.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { navigations } from "../Constants/userinfo";

const Navlinks = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(router.asPath);
  }, [router.asPath]);

  return (
    <>
      {navigations.map((item, index) => (
        <div key={index} className={styles.navlinks}>
          <Link href={item.href}>
            <a style={{ opacity: activeLink === item.link ? "100%" : "70%" }}>
              {item.label}
            </a>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Navlinks;
