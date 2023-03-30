import styles from "../styles/Home.module.css";
import Link from "next/link";
import { pageInfo, heroInfo, ctaTexts } from "../Constants/userinfo";
import SectionCardTypeTimeline from "./SectionCardTypeTimeline";
import HomeBusinessMainProcess from "./HomeBussinessMainProcess";
import SectionCardTypeProduct from "./SectionCardTypeProduct";
import SectionCardTypeCaseStudy from "./SectionCardTypeCaseStudy";
import SectionCardTypeConcept from "./SectionCardTypeConcept";
import SectionCardTypeSolution from "./SectionCardTypeSolution";
import SectionCardTypeObjective from "./SectionCardTypeObjectives";
import SectionCardTypeParterTrusted from "./SectionCardTypeParterTrusted";
import ChatbotHead from "./ChatbotHead";

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

        <div className="absolute rounded-xl top-16 right-8 sm:w-1/2 lg:w-1/3 bg-white/90">
          <ChatbotHead />
        </div>
      </div>
      <section className="-mt-30 bg-transparent xsm:-mt-16 sm:mt-0 md:-mt-10 xl:-mt-20 xl1450:-mt-20 z-10 relative pb-8 sm:pb-16 overflow-visible z-10">
        <HomeBusinessMainProcess currentTheme={currentTheme} />
      </section>

      <div>
        {true ? <SectionCardTypeTimeline currentTheme={currentTheme} /> : null}
      </div>

      <div>
        {true ? <SectionCardTypeConcept currentTheme={currentTheme} /> : null}
      </div>

      <div>
        {true ? <SectionCardTypeProduct currentTheme={currentTheme} /> : null}
      </div>

      <div>
        {true ? <SectionCardTypeObjective currentTheme={currentTheme} /> : null}
      </div>

      <div>
        {true ? <SectionCardTypeSolution currentTheme={currentTheme} /> : null}
      </div>

      <div
        className={" h-1 w-full container mx-auto " + styles.lineHorizontal}
        data-aos="fade-up"
      />

      <div>
        {true ? (
          <SectionCardTypeParterTrusted currentTheme={currentTheme} />
        ) : null}
      </div>
      <div
        className={" h-1 w-full container mx-auto " + styles.lineHorizontal}
        data-aos="fade-up"
      />
      <div>
        {true ? <SectionCardTypeCaseStudy currentTheme={currentTheme} /> : null}
      </div>

   
    </div>
  );
};

export default HomePage;
