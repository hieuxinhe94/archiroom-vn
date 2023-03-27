import styles from "../styles/Home.module.css";
import Link from "next/link";
import { pageInfo, heroInfo, ctaTexts } from "../Constants/userinfo";
import SectionCardTypeTimeline from "./SectionCardTypeTimeline";
import HomeBusinessMainProcess from "./HomeBussinessMainProcess";
import SectionCardTypeProduct from "./SectionCardTypeProduct";
import SectionCardTypeCaseStudy from "./SectionCardTypeCaseStudy";

const HomePage = ({ currentTheme }) => {
  return (
    <div>
      <div
        className={styles.homeheading}
        style={{ backgroundColor: currentTheme.secondary }}
      >
        <h1 className={styles.heading}>{heroInfo.title}</h1>
        <h2
          className={styles.subheading}
          style={{ color: currentTheme.subtext }}
        >
          {heroInfo.subtitle}
        </h2>
        <Link href="#work">
          <a
            className={styles.cta1}
            style={{
              backgroundColor: currentTheme.accent,
              color: currentTheme.contrastText,
              boxShadow: currentTheme.boxShadow,
            }}
          >
            {ctaTexts.landingCTA}
          </a>
        </Link>
      </div>
      <section className="-mt-20 bg-transparent xsm:-mt-16 sm:mt-0 md:-mt-10 xl:-mt-20 xl1450:-mt-20 z-10 relative pb-8 sm:pb-16 overflow-visible z-10">
            <HomeBusinessMainProcess currentTheme={currentTheme}/>
      </section>

      <div>{true ? <SectionCardTypeTimeline currentTheme={currentTheme} /> : null}</div>

      <div>{true ? <SectionCardTypeProduct currentTheme={currentTheme} /> : null}</div>

      <div>{true ? <SectionCardTypeCaseStudy currentTheme={currentTheme} /> : null}</div>
    </div>
  );
};

export default HomePage;
