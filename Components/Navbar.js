import { Switch } from "@chakra-ui/react";
import styles from "../styles/NavbarFooter.module.css";
import Navlinks from "./Navlinks";
import { useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { pageInfo } from "../Constants/userinfo";

const Navbar = ({ toggleTheme, currentTheme }) => {
  const [drawerVisible] = useMediaQuery("(max-width: 950px)");
  const [sticky, setSticky] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div
      className={styles.navbar + " top-0 relative"}
      style={{
        // backgroundColor: currentTheme.secondary,
        boxShadow: currentTheme.boxShadow,
        position: sticky ? "fixed" : "static",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "baseline",
          marginBottom: !drawerVisible ? "0" : "10px",
          opacity: "90%"
        }}
      >
        <Link href="/">
          <a>
            <h2 className={styles.logo}>{pageInfo.logoText} &#174;</h2>

            <h5 className="ml-1 text-xs">{pageInfo.logoSecondaryText}</h5>
          </a>
        </Link>

        {!drawerVisible ? (
          <div style={{ display: "flex" }}>
            <Navlinks
              onMouseEnterCb={(item) => {
                item.link == "/#showcases" && setShowMegaMenu(true);
              }}
              onMouseLeaveCb={(item) => {
                // item.link == "/#showcases" && setShowMegaMenu(false);
              }}
            />
          </div>
        ) : null}
        <Switch
          className="my-auto "
          id="dark-mode"
          colorScheme="blue"
          size={!drawerVisible ? "lg" : "md"}
          isChecked={currentTheme.name === "dark" ? true : false}
          onChange={() => toggleTheme()}
        />
      </div>
      {drawerVisible ? (
        <>
          <hr></hr>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "10px",
            }}
          >
            <Navlinks
              onMouseEnterCb={(item) => {
                item.link == "/#showcases" && setShowMegaMenu(true);
              }}
              onMouseLeaveCb={(item) => {
                // item.link == "/#showcases" && setShowMegaMenu(false);
              }}
            />
          </div>
        </>
      ) : null}

      {showMegaMenu && (
        <MegaMenu
          currentTheme={currentTheme}
          onMouseEnterCb={() => {
            setShowMegaMenu(true);
          }}
          onMouseLeaveCb={() => {
            setShowMegaMenu(false);
          }}
        />
      )}
    </div>
  );
};

const MegaMenu = ({ currentTheme, onMouseEnterCb, onMouseLeaveCb }) => {
  const menuDetailService = [
    {
      id: 0,
      href: "/digital-consultant",
      title: "Tư vấn Chuyển đổi số",
      description: "Mastering Digital Transformation",
      items: [
        {
          id: 1,
          href: "/digital-consultant",
          title: "Ngành tài chính - ngân hàng",
          description: "Phân tích ngành, đánh giá hiện trạng tổ chức và xây dựng KPI",
        },
        {
          id: 2,
          href: "/digital-consultant",
          title: "Ngành xây dựng - sản xuất",
          description: "Phân tích ngành, đánh giá hiện trạng tổ chức và xây dựng KPI",
        },
        {
          id: 3,
          href: "/digital-consultant",
          title: "Đo lường năng lực Chuyển đổi số",
          description: "",
        },
      ],
    },
    {
      id: 1,
      href: "/chatbots",
      title: "Chatbot AI",
      description: "Trí tuệ nhân tạo - AI",
      items: [
        {
          id: 101,
          href: "/chatbots",
          title: "Chatbot QnA",
          description: "Đọc tài liệu, web pages và hỏi đáp nội dung",
        },
        {
          id: 102,
          href: "/chatbots",
          title: "Chatbot Customer Support",
          description: "Hỗ trợ nghiệp vụ tự động kết nối dữ liệu",
        },
        {
          id: 103,
          href: "/chatbots",
          title: "Chatbot On-Premise",
          description: "Triển khai hạ tầng nội bộ doanh nghiệp",
        },
      ],
    },
    {
      id: 2,
      href: "/ocr-service",
      title: "Robot - OCR",
      description: "Robot Process Automation",
      items: [
        {
          id: 201,
          href: "/ocr-service",
          title: "Ví dụ mẫu bóc tách hồ sơ",
          description: "CMND, ID, Passport, Invoice, Màn hình chuyển khoản, Thẻ SV...",
        },
         
        {
          id: 202,
          href: "/ocr-service",
          title: "Nhận diện loại tài liệu mới",
          description: "Train loại tài liệu mới dễ dàng",
        },
        {
          id: 203,
          href: "/ocr-service",
          title: "Triển khai nội bộ On-Premise",
          description: "Triển khai hạ tầng nội bộ DN",
        },
      ],
    },
    {
      id: 3,
      href: "",
      title: "Phần mềm ứng dụng",
      description: "Business ",
      items: [
        {
          id: 301,
          href: "/tech/bpm-nen-tang-quan-ly-quy-trinh-doanh-nghiep",
          title: "Quản lý quy trình - BPM",
          description:
            "Cấu hình quy trình, biểu mẫu công việc, tích hợp tự động hóa công việc.",
        },
        {
          id: 302,
          href: "/tech/ecm-phan-mem-luu-tru-tap-trung",
          title: "Quản lý lưu trữ - ECM",
          description:
            "Lưu trữ dữ liệu phi cấu trúc office, email, media... lên tới hàng Terabytes",
        },
      ],
    },
  ];

  return (
    <div
      id="ResourcesDesktopMenu"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
      onMouseEnter={() => onMouseEnterCb()}
      onMouseLeave={() => onMouseLeaveCb()}
      className="no-scrollbar rounded mt-4 px-6 overflow-hidden overflow-y-auto max-w-screen-xl  bg-white absolute inset-x-0 top-[73px] z-50 pointer-events-none transition-transform duration-[452ms] ease-[cubic-bezier(0.26,1.00,0.48,1.00)] motion-reduce:transition-none  text-black opacity-98 visible pointer-events-auto translate-y-0"
    >
      <div className="container  grid grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-0">
        {menuDetailService.map((item, i) => (
          <div
            key={i}
            className="pt-5 translate-y-0"
            data-background="transparent_light"
          >
            <div className="flex items-center border-shade-30 mb-6 border-b pb-4 text-lg font-bold">
              <span className="flex items-center nav:ml-0 mr-3 md:mr-3 inline-block h-6 w-6">
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
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              </span>
              <span
                id="subNavItem-Help and support"
                className="font-medium text-t7 inline-block"
              >
                <a href={item.href || "#"}> {item.title}</a>
              </span>
            </div>
            <ul className="pb-2" aria-labelledby="subNavItem-Help and support">
              {item.items?.map((subitem, si) => (
                <li key={si} className="mb-2 pr-2 hover:bg-gray-200 p-2">
                  <a
                    className="group inline-block w-full text-black hover:text-black"
                    href={subitem.href || "#"}
                  >
                    <div className="text-base font-semibold">
                      <span className="inline-block arrow-animation text-indigo-900">
                        {subitem.title}
                      </span>
                    </div>
                    <div className="text-sm font-light text-shade-70 group-hover:text-black">
                      {subitem.description}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
