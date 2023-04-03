//PLEASE FOLLOW THE FORMAT OF THIS FILE.

import {
  faGithubAlt,
  faLinkedinIn,
  faMediumM,
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";

export const pageInfo = {
  logoText: "Pasture Consul", //This text is visible on your navbar and footer like your logo.
  logoSecondaryText: "Tư vấn chiến lược công nghệ", //This text is visible on your navbar and footer like your logo.
  subtitle: "Tư vấn chiến lược công nghệ",
  description: "Tư vấn chiến lược công nghệ",
  contact: {
    email: "michaelscott@email.com", //It is always a good idea to mention your email on your website. Good platform to communicate.
    phone: "1234567890", //Phone number is optional, if you dont want it, consider leaving it blank .
    countrycode: "+91", //It is advisable to add the country code incase you mention your contact number.
  },
  socials: [
    //For aesthetics, it is advisable for you to mention upto 4 social media links only. Fill in the links.
    //more icons are imported above, use as you like them.
    { type: "github", link: "", icon: faGithubAlt },
    { type: "linkedin", link: "", icon: faLinkedinIn },
    { type: "medium", link: "", icon: faMediumM },
  ],
  blogs: {
    //set this to false if you want to omit this section
    visible: true,
  },
};

export const navigations = [
  { id: 1, href: "/", link: "/", label: "Trang chủ" },
  {
    id: 1,
    href: "/consultant-service",
    link: "/#consultant-service",
    label: "Dịch vụ tư vấn",
  },
  { id: 1, href: "/solution", link: "/#solution", label: "Phương pháp" },
  { id: 1, href: "/tool", link: "/#tool", label: "Công cụ" },
  { id: 1, href: "/contact", link: "/#contact", label: "Liên hệ" },
];

export const heroInfo = {
  title: "Pasture Consul", //This text is visible on your navbar and footer like your logo.
  subtitle: "Tư vấn chiến lược công nghệ", //This text is visible on your navbar and footer like your logo.
};

export const ctaTexts = {
  //you can customise all the cta texts here.
  landingCTA: "My work",
  workCTA: "View All",
  capabCTA: "Get in Touch",
  moreDetail: "Chi tiết",
  resumeCTA: "Resume",
  submitBTN: "Submit",
};

export const businessMainSteps = {
  title: "Quy trình tư vấn",
  subtitle: "Tư vấn chiến lược công nghệ",
  steps: [
    {
      id: 1,
      title: "Empathize",
      subtitle: "Thấu hiểu vấn đề",
      description: "Định nghĩa kết quả",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "team.svg",
        alt: "",
      },
    },
    {
      id: 2,
      title: "Define",
      subtitle: "Định nghĩa kết quả",
      description: "Định nghĩa kết quả",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "team.svg",
        alt: "",
      },
    },
    {
      id: 3,
      title: "Ideate",
      subtitle: "Sáng tạo",
      description: "Định nghĩa kết quả",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "team.svg",
        alt: "",
      },
    },
    {
      id: 4,
      title: "Solutions",
      subtitle: "Thiết kế giải pháp",
      description: "Định nghĩa kết quả",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "team.svg",
        alt: "",
      },
    },
    {
      id: 5,
      title: "Control",
      subtitle: "Giám sát, điều chỉnh",
      description: "Định nghĩa kết quả",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },
  ],
};

export const digitalTransformationSteps = {
  title: "Tư vấn chiến lược",
  subtitle: "DX consultant",
  steps: [
    {
      id: 1,
      title: "Hiểu về DX",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description: `Hiểu các khái niệm/tiêu chuẩn kỹ thuật về Chuyển đổi số.
         Tiếp theo là các đánh giá về ngành, đối thủ cạnh tranh trên thị trường về năng lực Chuyển đổi số của họ.
         Sau đó bạn cần hiểu về những công nghệ mới, cách mà tổ chức khác đang áp dụng chúng nhằm tăng lợi thế cạnh tranh với bạn. 
         Cuối cùng, và rất quan trọng, bạn cần hiểu những chiến lược cạnh tranh nhất định có thể áp dụng như những lựa chọn sống còn cho tổ chức.`,
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },

    {
      id: 2,
      title: "Hiểu về tổ chức",
      subtitle:
        "Triển khai [PDM Consul Software] - Công cụ chiến lược phân tích/đo lường mức độ số hóa.",
      description: `Đánh giá tình trạng chuyển đổi số hiện tại của công ty: 
        Cần tiến hành khảo sát và phân tích hệ thống và quy trình hoạt động của công ty để xác định tình trạng chuyển đổi số hiện tại,
        bao gồm cả các vấn đề về hạ tầng công nghệ, quản lý dữ liệu, cơ cấu tổ chức, quy trình kinh doanh và trải nghiệm khách hàng.`,
      due_date: "3-4 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },

    {
      id: 3,
      title: "Hiểu mục tiêu",
      subtitle: "Xác định mục tiêu chuyển đổi số",
      description: `Xác định mục tiêu chuyển đổi số:
         Dựa trên tình trạng chuyển đổi số hiện tại và chiến lược kinh doanh của công ty, 
         cần xác định mục tiêu chuyển đổi số cụ thể mà công ty mong muốn đạt được, 
         bao gồm cả các chỉ tiêu về hiệu quả hoạt động, tăng trưởng doanh số và cải thiện trải nghiệm khách hàng.`,
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },

    {
      id: 4,
      title: "Hiểu giải pháp",
      subtitle: "Thiết kế chiến lược & Đánh giá kết quả & Cải tiến liên tục.",
      description: `Dựa trên mục tiêu chuyển đổi số đã xác định, cần thiết kế chiến lược chuyển đổi số phù hợp với nhu cầu và điều kiện của công ty.
         Chiến lược này nên bao gồm các giải pháp kỹ thuật, cơ cấu tổ chức, quy trình kinh doanh và trải nghiệm khách hàng để đảm bảo tính toàn diện và hiệu quả của quá trình chuyển đổi.`,
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },
  ],
};

export const digitalConceptMetatdata = {
  title: "Hiểu về DX",
  subtitle: "Giới thiệu tổng quan khái niệm về DX",
  description: "Diễn dãi chi tiết hơn ở đây ....",
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/lawyer.png",
    alt: "",
  },
  features: [
    {
      id: 1,
      title: "Số hóa - Digitalization",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },
    {
      id: 2,
      title: "Tự động hóa - RPA",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },
    {
      id: 2,
      title: "Chuyển đổi số toàn diện - DX",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },
  ],
};

export const digitalMeasureToolMetatdata = {
  title: "Hiểu chính mình",
  subtitle: "Pasture DXMaturity",
  description: "Pasture DX Maturity Tool",
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/lawyer.png",
    alt: "",
  },
  steps: [
    {
      id: 1,
      title: "Đo lường tỷ lệ Số hóa ",
      subtitle: "Đo lường mức độ số hóa, ....",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://cdn-icons-png.flaticon.com/512/4727/4727266.png",
        alt: "",
      },
    },
    {
      id: 2,
      title: "Liên thông số hóa quy trình",
      subtitle: "Đo lường mức độ số hóa, ....",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://cdn-icons-png.flaticon.com/512/4727/4727266.png",
        alt: "",
      },
    },
    {
      id: 3,
      title: "Đo lường tần suất/thời gian",
      subtitle: "Đo lường mức độ số hóa, ....",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://cdn-icons-png.flaticon.com/512/4727/4727266.png",
        alt: "",
      },
    },
    {
      id: 4,
      title: "Đề xuất điểm Tự động hóa",
      subtitle: "RPA - R ....",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://cdn-icons-png.flaticon.com/512/4727/4727266.png",
        alt: "",
      },
    },

    {
      id: 5,
      title: "Ứng dụng Công nghệ mới",
      subtitle: "Đo lường mức độ số hóa, ....",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://cdn-icons-png.flaticon.com/512/4727/4727266.png",
        alt: "",
      },
    },

    {
      id: 7,
      title: "Cải tiến quy trình",
      subtitle:
        "Đổi mới quy trình vận hành, quy trình kinh doanh dựa trên nền tảng những công nghệ cốt lõi đã xây dựng.",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://cdn-icons-png.flaticon.com/512/4727/4727266.png",
        alt: "",
      },
    },
  ],
};

export const digitalObjectivesMetadata = {
  title: "Xác định mục tiêu",
  subtitle: "Pasture DX Maturity Tool",
  description: "Pasture DX Maturity Tool",
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/lawyer.png",
    alt: "",
  },
  features: [
    {
      id: 1,
      title: "Hiểu về DX",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },
  ],
};

export const digitalSolutionMetadata = {
  title: "Căn chỉnh Giải pháp",
  subtitle: "Pasture DX Maturity Tool",
  description: "Pasture DX Maturity Tool",
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
    alt: "",
  },
  features: [
    {
      id: 1,
      title: "Hiểu về DX",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },
  ],
};

export const partnerTrustedMetadata = {
  title: "Đối tác cùng chúng tôi",
  subtitle: "Pasture DX Maturity Tool",
  description: "Pasture DX Maturity Tool",
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
    alt: "",
  },
  partners: [
    {
      id: 1,
      title: "TPBank",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
        alt: "",
      },
    },
  ],
};

export const digitalCaseStudyArticles = {
  title: "Case studies",
  subtitle: "Pasture DX Maturity Tool",
  description: "Pasture DX Maturity Tool",
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
    alt: "",
  },
  articles: [
    {
      id: 1,
      title: "Vinamilk",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/post/searching",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/home-inspection.png",
        alt: "",
      },
    },

    {
      id: 3,
      title: "Tập đoàn Vingroup",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/home-inspection.png",
        alt: "",
      },
    },
    {
      id: 3,
      title: "Ngân hàng TPBank",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/home-inspection.png",
        alt: "",
      },
    },
    {
      id: 2,
      title: "Tập đoàn thép Hòa Phát",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/home-inspection.png",
        alt: "",
      },
    },

    {
      id: 2,
      title: "Electrolux",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
      main_image: {
        src: "https://www.morrisengineeringllc.com/wp-content/uploads/home-inspection.png",
        alt: "",
      },
    },
  ],
};
