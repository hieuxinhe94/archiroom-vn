import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Layout({ children, toggleTheme, currentTheme }) {
  const router = useRouter();
  const { slug } = router.query;
  let isHomePage = false;
  console.log(router);
  if ((router.route == "/")) {
    console.log("Home page")
    isHomePage = true;
  }

  let structuredData = {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    headline: "simplify dx",
    url: "https://simplifydx.com",
    claimReviewed: "Công ty tư vấn Chuyển đổi số",
    itemReviewed: {
      "@type": "Claim",
      author: {
        "@type": "Organization",
        name: "simplify dx",
      },
      datePublished: "2022-06-20",
      appearance: {
        "@type": "OpinionNewsArticle",
        headline: "simplify dx - Công ty tư vấn Chuyển đổi số",
        datePublished: "2022-06-22",
        author: {
          "@type": "Person",
          name: "simplifydx.com",
        },
      },
    },
    author: {
      "@type": "Organization",
      name: "simplifydx.com",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "1",
      bestRating: "5",
      worstRating: "1",
      alternateName: "Công ty tư vấn Chuyển đổi số",
    },
  };

  return (
    <div className="scroll-smooth md:scroll-auto" id="fullpage">
      <div className="static mt-24">
      <div
          style={{
            width: isHomePage ? "99.6vw" : "10vw",
            height: isHomePage ? "100vh" : "15vh",
          }}
        >
          <video className="videoTag" autoPlay loop muted>
            <source src="./bannerbg.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          className="absolute"
          style={{ top: "0rem", left: "0", width: "100%", zIndex: 100 }}
        >
          <Navbar toggleTheme={toggleTheme} currentTheme={currentTheme} />
        </div>
      </div>

      {children}
      <Footer currentTheme={currentTheme} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
