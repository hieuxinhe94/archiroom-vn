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
import Leader from "./Leader";

export default function HomePage(props) {
  const { postdata, products, siteconfig, preview, currentTheme } = props;
  const router = useRouter();
  const [displayBot, setDisplayBot] = useState(true);

  return (
    <div >
      <div className="section">
        {/* <div className="">
          <video className="videoTag" autoPlay loop muted>
            <source src="./bannerbg.mp4" type="video/mp4" />
          </video>
        </div> */}
        <div
          className="absolute hidden lg:block"
          style={{ top: "25rem", left: "10%", maxWidth: "45rem" }}
        >
          {/* <h1 className={styles.heading}>{heroInfo.title}</h1> */}
          <h2 className={styles.subheading}>
            <p id="" className="mx-4">
              <h2 className="mb-12 uppercase md:text-[26px] md:leading-[32px] text-2xl [&amp;_div]:relative [@media(min-width:900px)]:[&amp;_div]:inline-block [&amp;_div]:inline   [&amp;_div]:before:absolute [&amp;_div]:before:top-0 [&amp;_div]:before:left-0 [&amp;_div]:before:h-full  [&amp;_div]:before:w-[102.5%] [@media(min-width:900px)]:[&amp;_div]:before:bg-homepage-globe-headline-before [&amp;_div]:before:transform-[translateX(-1.25%)] richtext">
                <TypeIt
                  getBeforeInit={(instance) => {
                    instance
                      .type("Chúng tôi hiểu rằng: <br/>")
                      .pause(250)
                      .type(
                        "Sự thay đổi nhanh chóng, phức tạp của những công nghệ luôn là trở ngại lớn. <br/> "
                      )
                      .pause(250)
                      .type(" Và sứ mệnh chúng tôi: <br/>")
                      .pause(250)
                      .type(
                        `<div style="margin:1px;  background-image: linear-gradient(90deg, rgb(96, 116, 213), rgb(20, 88, 133) 45.31%, rgb(64, 19, 197));">Là một cầu nối vững chắc tiến tới chuyển đổi số thành công.</div>`
                      );

                    return instance;
                  }}
                  options={{
                    speed: 3,
                    startDelay: 100,
                    waitUntilVisible: true,
                    cursor: false,
                  }}
                />
              </h2>
            </p>
          </h2>
        </div>
      </div>

      <div
        className="section"
        style={{
          backgroundColor: currentTheme.secondarybody,
        }}
      >
        {true ? (
          <SectionCardConsultantService currentTheme={currentTheme} />
        ) : null}
      </div>

      <div
        className="section"
        style={{
          backgroundColor: currentTheme.secondarybody,
        }}
      >
        <SectionCardTechProduct
          currentTheme={currentTheme}
          products={products.filter(
            (t) => t.productcode == "ECM" || t.productcode == "BPM"
          )}
        />
      </div>
      <div
        className="section"
        style={{
          backgroundColor: currentTheme.secondarybody,
        }}
      >
        <SectionCardChatbotProduct
          currentTheme={currentTheme}
          products={products}
        />
      </div>

      <div
        className="section"
        style={{
          backgroundColor: currentTheme.secondarybody,
        }}
      >
        <SectionCardOCRService
          currentTheme={currentTheme}
          products={products}
        />
      </div>
      <div className="section"
        style={{
          backgroundColor: currentTheme.secondarybody,
        }}>
        {true ? (
          <SectionCardTypeParterTrusted currentTheme={currentTheme} />
        ) : null}
      </div>

      <Leader currentTheme={currentTheme}/>

      <div
        className={" h-1 w-full container mx-auto " + styles.lineHorizontal}
        data-aos="fade-up"
      />
      
      <div >
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
