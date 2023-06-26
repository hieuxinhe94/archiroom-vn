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

export default function HomePage(props) {
  const { postdata, siteconfig, preview, currentTheme } = props;
  const router = useRouter();
  const [displayBot, setDisplayBot] = useState(true);

  return (
    <div>
      <div
        className={styles.homeheading + " overflow-visible"}
        style={{ backgroundColor: currentTheme.secondary }}
      >
        <h1 className={styles.heading}>{heroInfo.title}</h1>

        <h2
          className={styles.subheading}
          style={{ color: currentTheme.subtext }}
        >
          <p id="subtitleTyping">
            <TypeIt
              options={{
                strings: [heroInfo.subtitle],
                speed: 10,
                startDelay: 100,
                waitUntilVisible: true,
                cursor: false,
              }}
            ></TypeIt>{" "}
          </p>
        </h2>
      </div>

      <div
        style={{
          backgroundColor: currentTheme.body,
        }}
      >
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
        {true ? (
          <SectionCardTypeCaseStudy
            currentTheme={currentTheme}
            posts={postdata}
          />
        ) : null}
      </div>
      {displayBot && (
        <div className=" fixed bottom-5 right-10">
          <ChatbotCustomView currentTheme={currentTheme} />
        </div>

        // <div className="fixed bottom-10 right-10">
        // <iframe
        //   src="https://webchat.botframework.com/embed/SimplifyAILanguageService01-bot?s=XN_b7jXwYcQ.310bmzFahKZJgN4BBPk3GLam2Jzkkht6bphzkvNZ7p0"
        //   style={{ height: "502px", maxHeight: "502px" }}
        // ></iframe>
        // </div>
      )}
    </div>
  );
}
