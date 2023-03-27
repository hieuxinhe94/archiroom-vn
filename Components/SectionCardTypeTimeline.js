import React from "react";
import styles from "../styles/Home.module.css";
import {
  userinfo,
  headings,
  ctaTexts,
  digitalTransformationSteps,
} from "../Constants/userinfo";
import Link from "next/link";

const SectionCardTypeTimeline = ({ currentTheme, data }) => {
  return (
    <div className={styles.educationWrapper + " container mx-auto"}>
      <div
        className={styles.workheading + " flex items-end " + styles.lineHorizontal}
        data-aos="fade-up"
      >
 
        {digitalTransformationSteps?.title} 
          <div className="pb-12 px-2">
            <span className="block text-2xl font-bold text-gray-400 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </span>
         </div>
      </div>
      <div className={styles.timeline + " pt-20"}>
        <ul>
          {digitalTransformationSteps
            ? digitalTransformationSteps.steps.map((value, key) => {
                return (
                  <li data-aos="fade-up" key={key}>
                    <div className={styles.content}>
                      <h3 style={{ color: currentTheme.accent }}>
                        {value.title}
                      </h3>
                      <p style={{ color: currentTheme.text }}>
                        {value.subtitle}
                      </p>
                      <p style={{ color: currentTheme.subtext }}>
                        {value.description}
                      </p>
                    </div>
                    <div
                      className={styles.time}
                      style={{
                        border: `2px solid ${currentTheme.accent}`,
                        color: currentTheme.accent,
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
