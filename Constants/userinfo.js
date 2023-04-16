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
    href: "/services",
    link: "/#services",
    label: "Dịch vụ tư vấn",
  },
  { id: 1, href: "/posts", link: "/#posts", label: "Phương pháp luận" },
  { id: 1, href: "/tool/auth", link: "/#tool/auth", label: "Công cụ" },
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
  subtitle: "3 Cấp độ quan trọng:",
  description:
    "Chuyển đổi số là quá trình chuyển đổi các hoạt động và quy trình từ hình thức truyền thống sang kỹ thuật số, nhằm tối ưu hóa hiệu quả và năng suất. Thường thì quá trình có thể được chia thành 3 giai đoạn chính, bao gồm:",
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/lawyer.png",
    alt: "",
  },
  features: [
    {
      id: 1,
      title: "Số hóa - Digitalization",
      subtitle:
        "Giai đoạn tiền chuyển đổi số (Pre-digital transformation stage)",
      description:
        "Đây là giai đoạn khi các tổ chức và doanh nghiệp vẫn đang sử dụng các phương pháp công nghệ truyền, lập trình các ứng dụng phục vụ các hoạt động kinh doanh, vận hành tổ chức. Các công nghệ và hệ thống được sử dụng trong giai đoạn này thường gây ra các hạn chế về tốc độ, chính xác và khả năng mở rộng. Việc thu thập và xử lý dữ liệu cũng gặp khó khăn và đôi khi dẫn đến sai sót.",
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
      title: "Tự động hóa - Tối ưu hóa",
      subtitle: "Giai đoạn chuyển đổi số (Digital transformation stage)",
      description:
        "Giai đoạn này bắt đầu khi tổ chức bắt đầu áp dụng các công nghệ số vào hoạt động kinh doanh. Các công nghệ này bao gồm đám mây, trí tuệ nhân tạo, big data và Internet of Things (IoT). Các hệ thống mới này cung cấp khả năng tăng tốc độ xử lý, tăng tính chính xác và tăng khả năng mở rộng, giúp cho các tổ chức có thể hoạt động một cách hiệu quả hơn và nhanh chóng hơn.",
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
      id: 3,
      title: "Chuyển đổi số toàn diện - DX",
      subtitle:
        "Giai đoạn sau chuyển đổi số (Post-digital transformation stage)",
      description:
        "Giai đoạn này bắt đầu khi các tổ chức đã hoàn thành quá trình chuyển đổi số. Các hệ thống và công nghệ số đã trở thành một phần của quy trình kinh doanh hàng ngày và được sử dụng để nâng cao năng suất và tối ưu hóa hiệu quả. Tại giai đoạn này, các tổ chức có thể tập trung vào việc phát triển và cải thiện các giải pháp kỹ thuật số, tạo ra giá trị gia tăng cho khách hàng và nâng cao năng suất của các hoạt động kinh doanh.",
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
  subtitle: "Đánh giá năng lực chuyển đổi số tổ chức",
  description: `[ProductName] cung cấp cho người quản trị những chỉ số đa chiều 360 về năng lực của tổ chức.\n
   Chúng tôi hỗ trợ các chỉ số thông dụng sau:
   `,
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/lawyer.png",
    alt: "",
  },
  steps: [
    {
      id: 1,
      title: "Digital Transformation Index - DTI",
      subtitle: " Chỉ số mức độ chuyển đổi số",
      description:
        "Đây là chỉ số đo lường mức độ chuyển đổi số của một tổ chức hay doanh nghiệp, bao gồm đánh giá các yếu tố như năng lực kỹ thuật số, quản lý dữ liệu, cơ sở hạ tầng kỹ thuật số, quản lý đổi mới và sáng tạo.",
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
      title: "Digital Adaptability Index - DAI",
      subtitle: "Chỉ số sự thích nghi với chuyển đổi số",
      description:
        " Đây là chỉ số đo lường khả năng thích nghi với các thay đổi kỹ thuật số trong môi trường kinh doanh, bao gồm đánh giá các yếu tố như tính linh hoạt của tổ chức, khả năng đổi mới và sáng tạo, và khả năng học hỏi và thích nghi nhanh chóng.",
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
      title: "Digital Momentum Index - DMI: ",
      subtitle: "Chỉ số động lực kỹ thuật số",
      description:
        "Đây là chỉ số đo lường tốc độ và quy mô của chuyển đổi số của một tổ chức hay doanh nghiệp, bao gồm đánh giá các yếu tố như tốc độ đầu tư vào công nghệ kỹ thuật số, tốc độ đào tạo nhân viên về kỹ thuật số, và tốc độ triển khai các giải pháp kỹ thuật số mới.",
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
      title: "Digital Customer Interaction Index - DCI",
      subtitle: "Chỉ số tương tác khách hàng kỹ thuật số ",
      description:
        "Đây là chỉ số đo lường mức độ tương tác của tổ chức hay doanh nghiệp với khách hàng thông qua các kênh kỹ thuật số, bao gồm đánh giá các yếu tố như trải nghiệm khách hàng, tính khả dụng của các kênh tương tác, và tốc độ phản hồi của tổ chức đối với phản hồi của khách hàng trên các kênh kỹ thuật số.",
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
  subtitle:
    "Mục tiêu chuyển đổi số sẽ giúp doanh nghiệp xác định được hướng đi của mình và những thay đổi cần thiết.",
  description: `
    Tập trung nỗ lực và tài nguyên vào những mục tiêu cụ thể để đạt được hiệu quả cao nhất. Xác định mục tiêu chuyển đổi số sẽ giúp doanh nghiệp tránh việc mơ hồ hoặc không thực tế khi triển khai chiến lược. Và cũng rất quan trọng là tăng tính nhất quán và tăng tính cạnh tranh. Ví dụ:
    
    • Tăng cường khả năng cạnh tranh
    • Tăng năng suất và hiệu quả
    • Cải thiện trải nghiệm khách hàng
    • Giảm chi phí
    • Tăng khả năng dự đoán và đưa ra quyết định kinh doanh
    `,
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/lawyer.png",
    alt: "",
  },
  features: [
    {
      id: 1,
      title: "Điều tra",
      subtitle: "3m",
      description:
        "Điều tra và đánh giá tình hình hiện tại của doanh nghiệp, bao gồm việc đánh giá các quy trình, hệ thống và cơ sở hạ tầng kỹ thuật số hiện có của doanh nghiệp. Thiết lập mục tiêu chuyển đổi số và lập kế hoạch chi tiết để đạt được các mục tiêu đó.",
      due_date: 3,
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
    },
    {
      id: 2,
      title: "Số hóa có tính chiến lược",
      subtitle: "6m",
      description:
        "Xây dựng và triển khai các giải pháp phần mềm và ứng dụng kỹ thuật số cho các bộ phận và quy trình khác nhau của doanh nghiệp.",
      due_date: 6,
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
    },
    {
      id: 3,
      title: "Đào tạo công nghệ mới",
      subtitle: "3m",
      description:
        "Đào tạo nhân viên về kỹ thuật số, để đảm bảo họ có đầy đủ kiến thức và kỹ năng để sử dụng các công nghệ kỹ thuật số.",
      due_date: 3,
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
    },
    {
      id: 4,
      title: "Đánh giá & điều chỉnh",
      subtitle: "3m",
      description:
        "Đánh giá hiệu quả của các giải pháp kỹ thuật số đã triển khai và tìm cách cải thiện chúng để đạt được kết quả tốt nhất.",
      due_date: 3,
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
    },
  ],
};

export const digitalSolutionMetadata = {
  title: "Thực thi + Cải tiến",
  subtitle: "Vòng tròn cải tiến liên tục trong quá trình chuyển đổi số ",
  description: `Việc thực hiện quá trình chuyển đổi số có thể khó khăn và đòi hỏi sự nỗ lực của toàn bộ doanh nghiệp để thực hiện thành công. Vòng tròn cải tiến liên tục (PDCA - Plan-Do-Check-Act) được sử dụng để cải thiện hiệu quả và hiệu suất của giải pháp.
  `,
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
    alt: "",
  },
  features: [
    {
      id: 1,
      title: "Plan: Hiểu rõ mục tiêu ngắn hạn",
      subtitle: "",
      description: "Trong quá trình xác định vấn đề, điều này có thể áp dụng bằng cách tìm hiểu cách mà khách hàng tương tác với doanh nghiệp và các sản phẩm/sản phẩm của doanh nghiệp.",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
    },
    {
      id: 2,
      title: "Do: Thực thi",
      subtitle: "",
      description: "",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
    },
    {
      id: 3,
      title: "Check: Đánh giá",
      subtitle: "",
      description: "",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
    },
    {
      id: 4,
      title: "Act: Điều chỉnh",
      subtitle: "",
      description: "",
      due_date: "1-2 weeks",
      href: "/solution",
      main_classes: "",
      secondary_classes: "",
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

export const ourTeamMetadata = {
  title: "Chúng tôi",
  subtitle: "Our team",
  description: "",
  main_image: {
    src: "https://www.morrisengineeringllc.com/wp-content/uploads/condominium-icon.png",
    alt: "",
  },
  members: [
    {
      id: 1,
      title: "TPBank",
      subtitle: "Hiểu rõ về DX trong lĩnh vực hiện tại",
      description:
        "Mô tả rõ, chi tiết, phương pháp luận, trung bình ngành, kẻ dần đầu, case study ...etc",
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
