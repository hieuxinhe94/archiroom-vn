import styles from "../styles/Home.module.css";
import Link from "next/link";
import { pageInfo, heroInfo, ctaTexts } from "../Constants/userinfo";
import SectionCardTypeTimeline from "./SectionCardTypeTimeline";
import SectionCardTypeProduct from "./SectionCardTypeProduct";
import SectionCardTypeCaseStudy from "./SectionCardTypeCaseStudy";
import SectionCardTypeConcept from "./SectionCardTypeConcept";
import SectionCardTypeSolution from "./SectionCardTypeSolution";
import SectionCardTypeObjective from "./SectionCardTypeObjectives";
import SectionCardTypeParterTrusted from "./SectionCardTypeParterTrusted";
import ChatbotHead from "./ChatbotHead";
import { useRouter } from "next/router";
import { useState } from "react";
import ChatbotCustomView from "./ChatbotCustomView";
import TypeIt from "typeit-react";
import SectionCardConsultantService from "./SectionCardConsultantService";
import SectionCardChatbotProduct from "./SectionCardChatbotProduct";
import SectionCardOCRService from "./SectionCardOCRService";
import SectionCardTechProduct from "./SectionCardTechProduct";
import Contact from "../pages/contact";
import SectionCardContact from "./SectionCardContact";
import Banner from "./Banner";

export default function HomePage(props) {
  const { postdata, products, siteconfig, preview, currentTheme } = props;
  const router = useRouter();
  const [displayBot, setDisplayBot] = useState(true);

  return (
    <div>
      <div id="banner relative">
        <div className="w-full h-full">
          <div
            className={styles.homeheading + " overflow-visible"}
            style={{
              backgroundColor: currentTheme.secondary,
              backgroundImage: "",
              opacity: 0.9,
            }}
          >
            <section class="hero-banner">
              {/* <Banner {...props} /> */}
            </section>
            <h2
              className={styles.subheading}
              style={{ color: currentTheme.subtext }}
            >
              <p id="subtitleTyping"></p>
            </h2>
          </div>
        </div>
        <div className="fixed w-full h-full z-50"></div>
      </div>

      <div
        style={{
          backgroundColor: currentTheme.body,
        }}
      >
        {true ? (
          <SectionCardConsultantService currentTheme={currentTheme} />
        ) : null}
      </div>
      <SectionCardTechProduct
        currentTheme={currentTheme}
        products={products.filter(
          (t) => t.productcode == "ECM" || t.productcode == "BPM"
        )}
      />
      <SectionCardChatbotProduct
        currentTheme={currentTheme}
        products={products}
      />
      <SectionCardOCRService currentTheme={currentTheme} products={products} />

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
        {true ? (
          <SectionCardTypeCaseStudy
            currentTheme={currentTheme}
            posts={postdata}
          />
        ) : null}
      </div>

      <SectionCardContact currentTheme={currentTheme} />
      {displayBot && (
        <div className="fixed hidden lg:block lg:bottom-5 lg:right-10">
          <ChatbotCustomView currentTheme={currentTheme} />
        </div>
      )}
    </div>
  );
}
