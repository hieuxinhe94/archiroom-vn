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
                slidesToShow: 3,
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
            image: 'archiroom/sample-3.jpg',
            image2: 'archiroom/sample-4.jpg',
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
            image: 'archiroom/sample-6.jpg',
            image2: 'archiroom/sample-5.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Chuyển đổi phong cách",
            code: "archiroom-transform",
            description: "",
            image: 'archiroom/sample-7.jpg',
            image2: 'archiroom/sample-8.jpg',
            tryLink: ''
        },
    ],

    archiroomFeatures: [
        {
            id: 1,
            code: "archiroom-exterior",
            title: "Lên ý tưởng ngoại thất ",
            description: "Gen ảnh ngoại thất bằng AI - Công cụ thiết kế đột phá cho ngôi nhà mơ ước! Bứt phá giới hạn sáng tạo, biến mọi ý tưởng ngoại thất thành hiện thực chỉ với vài cú nhấp chuột cùng công cụ Gen ảnh ngoại thất bằng AI",
            image: 'archiroom/sample-1.jpg',
            video: './services/chatbot-ai.mp4',
            tryLink: ''
        },
        {
            id: 2,
            code: "ai-architecture",
            fullscreen: true,
            title: "Nội thất nhà ở",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: 'archiroom/sample-2.jpg',
            tryLink: ''
        },
        {
            id: 3,
            title: "Nội thất văn phòng, sự kiện",
            code: "tryonhub",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: 'archiroom/sample-3.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Thay đổi phong cách",
            code: "tryonhub",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: 'archiroom/sample-4.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Thay đổi phong cách",
            code: "tryonhub",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: 'archiroom/sample-5.jpg',
            tryLink: ''
        }
    ],
    archiroomStyles: [
        {
            id: 2,
            code: "archiroom-style-change",
            title: "Phong cách Á Đông",
            description: "Trợ lý ảo trong lĩnh vực cụ thể, đào tạo thêm bằng thông tin bổ sung từ dữ liệu nội bộ. Vd: Tuyển dụng, Chăm sóc KH, Đào tạo",
            image: 'archiroom/sample-11.jpg',
            tryLink: ''
        },
        {
            id: 3,
            code: "ai-architecture",
            fullscreen: true,
            title: "Phong cách làng quê VN",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: 'archiroom/sample-12.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Phong cách châu Âu",
            code: "tryonhub",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: 'archiroom/sample-13.jpg',
            tryLink: ''
        },
        {
            id: 4,
            title: "Phong cách khác",
            code: "tryonhub",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: 'archiroom/sample-14.jpg',
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
