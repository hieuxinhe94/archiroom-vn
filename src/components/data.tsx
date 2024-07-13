export const autoPlaySettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
};

export const MARKET_CONFIG_DATA = {
    header: {
        logo: '/logo-s.png',
        navigators: [
            {
                id: 1,
                href: "/marketplace#features",
                title: "Tất cả ứng dụng",
                description: "#features",
            },
            {
                id: 2,
                href: '',
                title: "Mô hình AI",
                description: ".",
            },
            {
                id: 2,
                href: '',
                title: "Developer",
                description: ".",
            },
            {
                id: 2,
                href: '/about',
                title: "Giới thiệu",
                description: ".",
            },
        ]
    },
    sliderConfig: autoPlaySettings,
    domainData: [
        {
            id: 1,
            title: "Thương mại điện tử",
            code: "",
            description: "Mua sắm trực tuyến, chăm sóc khách hàng,...",
            image: './services/ai-character.png',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 2,
            title: "Truyền thông & Marketing",
            code: "",
            description: "Sáng tạo nội dung, nhân vật AI, videos.",
            image: './services/architecture-2.png',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 2,
            title: "Kiến trúc & Xây dựng",
            code: "",
            description: "Sáng tạo nội dung, nhân vật AI, videos.",
            image: './services/virtual-try-on.jpg',
            tryLink: 'https://www.tryonhub.ai'
        },
    ],
    verticleSliderSettings: {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        fade: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
        verticalSwiping: true,
        swipeToSlide: true,
        beforeChange: function (currentSlide, nextSlide) {
            // console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function (currentSlide) {
            // console.log("after change", currentSlide);
        }
    },
    previewData: [
        // {
        //     id: 1,
        //     code: "ai-film-maker",
        //     title: "Làm video/film bằng GenAI",
        //     description: "Thăng cấp sự sáng tạo của bạn với Gen AI – tạo phim và truyện một cách dễ dàng, biến tưởng tượng thành hiện thực! ",
        //     image: './services/film-maker.png',
        //     tryLink: 'https://www.tryonhub.ai'
        // },
        {
            id: 2,
            code: "ai-chatbot",
            title: "ChatGPT tùy chỉnh (GPT-4o)",
            description: "Trợ lý ảo trong lĩnh vực cụ thể, đào tạo thêm bằng thông tin bổ sung từ dữ liệu nội bộ. Vd: Tuyển dụng, Chăm sóc KH, Đào tạo.",
            image: './services/chatbot-ai.png',
            tryLink: ''
        },
        {
            id: 3,
            code: "ai-architecture",
            fullscreen: true,
            title: "Tạo hình kiến trúc xây dựng",
            description: "Sáng tạo cho bạn những công trình nhiều màu sắc và đầy thú vị bằng Gen AI. Upload sketch và nhận về thiết kế.",
            image: './services/architecture-2.png',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 4,
            title: "GenAI mặc thử quần áo",
            code: "tryonhub",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/virtual-try-on.jpg',
            tryLink: 'https://www.tryonhub.ai'
        },
    ],
    archiroomPreviewData: [
        {
            id: 1,
            code: "archiroom-exterior",
            title: "AI cho ngoại thất",
            description: "",
            image: 'archiroom/sample-6.jpg',
            image2: 'archiroom/sample-3.jpg',
            tryLink: ''
        },
        {
            id: 2,
            code: "archiroom-iterior",
            fullscreen: true,
            title: "AI cho nội thất",
            description: "",
            image: 'archiroom/sample-1.jpg',
            image2: 'archiroom/sample-2.jpg',
            tryLink: ''
        },
        {
            id: 3,
            title: "Hiện thực hóa bản sketch",
            code: "archiroom-sketch",
            description: "",
            image: 'archiroom/sample-7.jpg',
            image2: 'archiroom/sample-8.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Chuyển đổi phong cách",
            code: "archiroom-transform",
            description: "",
            image: 'archiroom/sample-3.jpg',
            image2: 'archiroom/sample-4.jpg',
            tryLink: ''
        },
        {
            id: 5,
            title: "Cải tạo công trình",
            code: "archiroom-transform",
            description: "",
            image: 'archiroom/sample-9.jpg',
            image2: 'archiroom/sample-10.jpg',
            tryLink: ''
        },
    ],

    archiroomFeatures: [
        {
            id: 1,
            code: "archiroom-exterior",
            title: "Lên ý tưởng ngoại thất ",
            description: "",
            image: 'archiroom/sample-1.jpg',
            video: './services/chatbot-ai.mp4',
            tryLink: ''
        },
        {
            id: 2,
            code: "ai-architecture",
            fullscreen: true,
            title: "Nội thất nhà ở",
            description: "",
            image: 'archiroom/sample-2.jpg',
            tryLink: ''
        },
        {
            id: 3,
            title: "Nội thất văn phòng, sự kiện",
            code: "tryonhub",
            description: "",
            image: 'archiroom/sample-3.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Thay đổi phong cách",
            code: "tryonhub",
            description: "",
            image: 'archiroom/sample-4.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Thay đổi phong cách",
            code: "tryonhub",
            description: "",
            image: 'archiroom/sample-5.jpg',
            tryLink: ''
        }
    ],
    archiroomStyles: [
        {
            id: 2,
            code: "archiroom-style-change",
            title: "Biệt thự hiện đại",
            image: 'archiroom/biệt thự phong cách hiện đại.jpg',
            tryLink: ''
        },
        {
            id: 3,
            code: "ai-architecture",
            fullscreen: true,
            title: "Biệt thự tân cổ điển",
            image: 'archiroom/biệt thự phong cách tân cổ điển.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Nhà mái thái",
            code: "tryonhub",
            image: 'archiroom/nhà mái thái.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Nhà phố hiện đại",
            code: "tryonhub",
            image: 'archiroom/nhà phố phong cách hiện đại.jpg',
            tryLink: ''
        },
        {
            id: 5,
            title: "Phong cách địa trung hải",
            code: "tryonhub",
            image: 'archiroom/phong cách địa trung hải.jpg',
            tryLink: ''
        },
        {
            id: 6,
            title: "Nội thất wabisabi",
            code: "tryonhub",
            image: 'archiroom/nội thất wabisabi.jpg',
            tryLink: ''
        },
    ],
    allTools: [
        {
            id: 2,
            code: "archiroom-style-change",
            title: "ChatGPT tùy chỉnh (GPT-4o)",
            description: "Trợ lý ảo trong lĩnh vực cụ thể, đào tạo thêm bằng thông tin bổ sung từ dữ liệu nội bộ. Vd: Tuyển dụng, Chăm sóc KH, Đào tạo",
            image: './services/chatbot-ai.png',
            tryLink: ''
        },
        {
            id: 3,
            code: "ai-architecture",
            fullscreen: true,
            title: "Tạo hình kiến trúc xây dựng",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/architecture-2.png',
            tryLink: ''
        },
        {
            id: 4,
            title: "GenAI mặc thử quần áo",
            code: "tryonhub",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/virtual-try-on.jpg',
            tryLink: ''
        },
    ],
    fqa: {
        config: {
            title: 'Những câu hỏi thường gặp',
            description: 'Nếu bạn không thể tìm thấy những gì bạn đang tìm kiếm, hãy gửi email tới contact@archiroom.vn của chúng tôi và sẽ có người liên hệ lại với bạn.'

        },
        items: [
            { title: 'Giới thiệu Archiroom.vn', description: 'Chúng tôi là công ty cung cấp dịch vụ Generative AI dựa trên nền tảng Stable Diffusion và Mid Jorney.' },
            { title: 'Archiroom.vn có miễn phí không?', description: 'Bạn sẽ được sử dụng miễn phí gói FREE+ của chúng tôi với credit là 200$.' },
            { title: 'Sử dụng Archiroom vào những mục đích nào', description: 'Tất cả mục đích trong việc thiết kế nội thất, kiến trúc....' }
        ]
    },
    footer: {
        brandName: 'SIMPLIFY AI INC',
        description: 'Kho ứng dụng Generative AI dành cho doanh nghiệp Việt Nam',
        logo: '/logo-s.png',
        shortLinks: [
            {
                title: 'Lĩnh vực',
                description: '',
                href: '#',
                items: [
                    {
                        title: 'Thương mại điện tử',

                        href: '#',
                    },
                    {
                        title: 'Kiến trúc',

                        href: '#',
                    },
                    {
                        title: 'Nội dung & Marketing',

                        href: '#',
                    }
                ]
            },
            {
                title: 'Nghiên cứu mô hình',
                description: '',
                href: '#',
                items: [
                    {
                        title: 'Gen AI có ứng dụng gì',

                        href: '#',
                    },
                    {
                        title: 'Gen AI là gì?',

                        href: '#',
                    },

                ]
            },
            {
                title: 'Developer',
                description: '',
                href: '#',
                items: [
                    {
                        title: 'Tài liệu tích hợp',

                        href: '#',
                    },
                    {
                        title: 'Swagger',

                        href: '#',
                    }
                ]
            },
            {
                title: 'Hợp tác',
                description: '',
                href: '#',
                items: [
                    {
                        title: 'Liên hệ CEO',

                        href: '#',
                    },
                    {
                        title: 'Tuyển dụng',

                        href: '#',
                    },
                    {
                        title: 'Đội ngũ chúng tôi',

                        href: '#',
                    },
                ]
            }
        ],

    }
};


export const ARCHIROOM_TOOL_CONFIG = {
    mode: [
        {
            id: 'genMode-1',
            name: "Cơ bản",
        },
        {
            id: 'genMode-2',
            name: "Nâng cao",
        },

    ],
    context: [
        {
            id: "context-1",
            name: "Ngoại thất",
            image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/Ngoại thất.jpg"
        },
        {
            id: "context-2",
            name: "Nội thất",
            image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/Nội thất.jpg"
        },
      
    ],
    upload: {
        title: "Tải lên hình phác thảo hoặc mô hình 3D"
    },
    optionsSelected:
    {
        "genType": "genType-1"
    }
    ,
    options: [
        {
            id: "genType",
            title: "Kiểu kiến trúc",
            image: "",
            child: [
                {
                    id: "genType-1",
                    title: "Dinh thự",
                    context: "context-2",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/01. Kiểu kiến trúc/biệt thự.jpg"
                },
                {
                    id: "genType-2",
                    title: "Biệt thự",
                     context: "context-2",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/01. Kiểu kiến trúc/dinh thự.png"
                },
                {
                    id: "genType-3",
                    title: "Nhà phố",
                     context: "context-2",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/01. Kiểu kiến trúc/Nhà phố.jpg"
                },
                {
                    id: "genType-4",
                    title: "Tòa Văn phòng",
                     context: "context-2",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/01. Kiểu kiến trúc/Tòa nhà văn phòng.jpg"
                },
                // other context
                {
                    id: "genType-11",
                    title: "Phòng ăn",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/01. Kiểu phòng/Phòng ăn.jpg"
                },
                {
                    id: "genType-12",
                    title: "Phòng bếp",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/01. Kiểu phòng/phòng bếp.jpg"
                },
                {
                    id: "genType-13",
                    title: "Phòng khách",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/01. Kiểu phòng/Phòng khách.jpg"
                },
                {
                    id: "genType-14",
                    title: "Phòng ngủ",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/01. Kiểu phòng/phòng ngủ.jpg"
                },
                {
                    id: "genType-15",
                    title: "Phòng tắm",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/01. Kiểu phòng/Phòng tắm.jpg"
                }
            ]

        },
        {
            id: "genStyle",
            title: "Phong cách",
            image: "",
            child: [
                {
                    id: "genStyle-1",
                    title: "Biệt thự hiện đại",
                    context: "context-2",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/02. Phong cách/biệt thự hiện đại.png"
                },
                {
                    id: "genStyle-2",
                    title: "Biệt thự tân cổ",
                    context: "context-2",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/02. Phong cách/biệt thự tân cổ.png"
                },
                {
                    id: "genStyle-3",
                    title: "Cổ điển",
                    context: "context-2",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/02. Phong cách/Cổ điển.jpg"
                },
                {
                    id: "genStyle-4",
                    title: "Địa trung hải",
                    context: "context-2",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/02. Phong cách/Địa trung hải.jpg"
                },
                {
                    id: "genStyle-5",
                    title: "Tối giản",
                    context: "context-2",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/02. Phong cách/Tối giản.jpg"
                },
                // other context
                {
                    id: "genStyle-11",
                    title: "Ấm cúng",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/02. Phong cách/Ấm cúng.jpg"
                },
                {
                    id: "genStyle-12",
                    title: "Cổ điển",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/02. Phong cách/Cổ điện.jpg"
                },
                {
                    id: "genStyle-13",
                    title: "Địa trung hải",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/02. Phong cách/địa trung hải.jpg"
                },
                {
                    id: "genStyle-14",
                    title: "Hiện đại",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/02. Phong cách/Hiện đại.jpg"
                },
                {
                    id: "genStyle-15",
                    title: "Mộc mạc",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/02. Phong cách/mộc mạc.jpg"
                },
                {
                    id: "genStyle-16",
                    title: "Indochina",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/02. Phong cách/nội thất indochi.jpg"
                },
                {
                    id: "genStyle-17",
                    title: "Tân cổ",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/02. Phong cách/nội thất tân cổ 1.jpg"
                },
                {
                    id: "genStyle-18",
                    title: "Phòng khách hiện đại",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/02. Phong cách/phòng khách hiện đại.jpg"
                },
                {
                    id: "genStyle-19",
                    title: "Sang trọng",
                    context: "context-1",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/02. Nội thất/02. Phong cách/Sang trọng.jpg"
                },
            ]
        },
        {
            id: "genMaterial",
            title: "Nguyên vật liệu",
            image: "",
            child: [
                {
                    id: "genMaterial-1",
                    title: "Vật liệu Gỗ",
                    context: null,
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Bê tông.jpg"
                },
                {
                    id: "genMaterial-2",
                    title: "Đá hoa",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Đá hoa.jpg"
                },
                {
                    id: "genMaterial-3",
                    title: "Đá ",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Đá.jpg"
                },
                {
                    id: "genMaterial-4",
                    title: "Gạch ",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Gạch.jpg"
                },
                {
                    id: "genMaterial-5",
                    title: "Gỗ tổng hợp ",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Gỗ tổng hợp.jpg"
                },
                {
                    id: "genMaterial-6",
                    title: "Gỗ ",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Gỗ.jpg"
                },
                {
                    id: "genMaterial-7",
                    title: "Nhôm ",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Nhôm.jpg"
                },
                {
                    id: "genMaterial-8",
                    title: "Pvc ",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Pvc.jpg"
                },
                {
                    id: "genMaterial-9",
                    title: "Sắt ",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Sắt.jpg"
                },
                {
                    id: "genMaterial-10",
                    title: "Tre ",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Tre.jpg"
                },
                {
                    id: "genMaterial-11",
                    title: "Vữa ",
                    image: "archiroom/02. Thư viện ảnh/02. Thư viện ảnh/01. Ngoại thất/03. Nguyên vật liệu/Vữa.jpg"
                }
            ]
        },
        {
            id: "genExactly",
            title: "Độ kiết xuất",
            image: "",
            child: [
                {
                    id: "genExactly-1",
                    title: "Chính xác",
                    image: "./services/architecture-ai-step-3.jpg"
                },
                {
                    id: "genExactly-2",
                    title: "Tương đối",
                    image: "./services/architecture-ai-step-3.jpg"
                },
                {
                    id: "genExactly-2",
                    title: "Sáng tạo",
                    image: "./services/architecture-ai-step-3.jpg"
                }
            ]
        }

    ],
    responseDefault: {
        title: "Kết quả của {genType}, ",
        config: {},
        outputs: [
            {
                id: 1,
                title: "Biệt thự 1",
                description: "",
                image: "archiroom/output-sample-1.jpg",
                tags: ["Biệt thự", "Việt Nam"]
            },
            {
                id: 2,
                title: "Biệt thự 2",
                description: "",
                image: "archiroom/output-sample-2.jpg",
                tags: ["Biệt thự", "Châu Âu"]
            },
            {
                id: 3,
                title: "Biệt thự 3",
                description: "",
                image: "archiroom/output-sample-3.jpg",
                tags: ["Biệt thự", "Scandarian"]
            },
            {
                id: 4,
                title: "Biệt thự 4",
                description: "",
                image: "archiroom/output-sample-4.jpg",
                tags: ["Biệt thự", "America"]
            }
        ]

    },
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },

    ]
};