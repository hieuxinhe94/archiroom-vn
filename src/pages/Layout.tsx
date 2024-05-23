
import AOS from "aos";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect } from "react";

import AnnouncementBar from "~/components/announcementBar";
// import "aos/dist/aos.css";
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: "https://TryOnHub.ai",
  logo: "https://TryOnHub.ai/favicon.svg",
};

let structuredData = {
  "@context": "https://schema.org",
  "@type": "ClaimReview",
  headline: "tryon.ai",
  url: "https://tryon.ai",
  
  itemReviewed: {
    "@type": "Claim",
    author: {
      "@type": "Organization",
      name: "Simplify Tech.Inc",
    },
    datePublished: "2023-06-20",
    appearance: {
      "@type": "OpinionNewsArticle",
      headline: "TryOnHub.AI - ELEVATE YOUR FASHION EXPERIENCE WITH AI-POWERED VIRTUAL TRY-ON",
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
    alternateName: "simplifydx.com",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { slug } = router.query;
  
  if (router.route == "/") {
    
   
  }
  
  useEffect(() => {
    AOS.init({
      duration: 500, once: true
    });
  }, []);

  return (
    <div className="scroll-smooth md:scroll-auto bg" id="fullpage">
      <NextSeo
        title={`${"TryOnHub.AI"}`}
        description={"" || ""}
        canonical={`/`}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
   
       
      {children}
    
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
     
    </div>
  );
}
