import React from "react";
import styles from "../styles/Home.module.css";
import {
  userinfo,
   
  ctaTexts,
  digitalTransformationSteps,
} from "../Constants/userinfo";
import Link from "next/link";

const SectionCardTypeTimeline = ({ currentTheme, data }) => {
  return (
    <div
      className={styles.educationWrapper + " container mx-auto mt-0"}
     
    >
      <div
        className={
          styles.workheading +
          " flex items-end md:text-sm lg:text-4xl px-4 " +
          styles.lineHorizontal
        }
        data-aos="fade-up"
      >
        Lộ trình triển khai
       
      </div>
      <div className={styles.timeline + ""}>
        <ul>
          {digitalTransformationSteps
            ? digitalTransformationSteps.steps.map((value, key) => {
                return (
                  <li data-aos="fade-up" key={key}>
                    <div className={styles.content}>
                      <h3
                        className=" font-semibold "
                        style={{
                          color: currentTheme.textColor,
                        }}
                      >
                        {value.title}
                      </h3>
                      <p style={{ color: currentTheme.text }}>
                        {value.subtitle}
                      </p>
                      <p
                        className="text-justify leading-relaxed"
                        style={{ color: currentTheme.subtext }}
                      >
                        {value.description}
                      </p>
                    </div>
                    <div
                      className={styles.time + ""}
                      style={{
                        border: `0.5px solid ${currentTheme.accent}`,
                        color: currentTheme.subtext,
                      }}
                    >
                      <h4>{value.due_date}</h4>
                    </div>
                  </li>
                );
              })
            : null}
          <div style={{ clear: "both" }}></div>
        </ul>
      </div>
    </div>
  );
};

export default SectionCardTypeTimeline;
