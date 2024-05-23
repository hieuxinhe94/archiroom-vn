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
            description: "Mua sắm trực tuyến, chăm sóc khách hàng,...",
            image: './services/ai-character.png',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 2,
            title: "Truyền thông & Marketing",
            description: "Sáng tạo nội dung, nhân vật AI, videos.",
            image: './services/architecture-2.png',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 2,
            title: "Kiến trúc & Xây dựng",
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
        arrows:false,
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
        {
            id: 1,
            title: "Người mẫu AI tạo sinh",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/ai-character.png',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 2,
            title: "Tạo hình kiến trúc xây dựng",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/architecture-2.png',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 3,
            title: "GenAI mặc thử quần áo",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/virtual-try-on.jpg',
            tryLink: 'https://www.tryonhub.ai'
        },
    ],
    allTools: [
        {
            id: 1,
            title: "Người mẫu AI tạo sinh",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/ai-character.png',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 2,
            title: "Tạo hình kiến trúc xây dựng",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/architecture-2.png',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 3,
            title: "GenAI mặc thử quần áo",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/virtual-try-on.jpg',
            tryLink: 'https://www.tryonhub.ai'
        },
        {
            id: 4,
            title: "Người mẫu AI tạo sinh",
            description: "Tạo sinh các người mẫu với phong cách Á Đông bằng mô hình Generative AI tiên tiến, mạnh mẽ dành riêng cho người.",
            image: './services/ai-character.png',
            tryLink: 'https://www.tryonhub.ai'
        },
    ],
    fqa: {
        config: {
            title: 'Những câu hỏi thường gặp',
            description: 'Nếu bạn không thể tìm thấy những gì bạn đang tìm kiếm, hãy gửi email tới contact@tryonhub.ai của chúng tôi và sẽ có người liên hệ lại với bạn.'

        },
        items: [
            { title: 'How do you generate reports?', description: 'You just tell us what data you need a report for, and we get our kids to create beautiful charts for you using only the finest crayons.' },
            { title: 'How do you generate reports?', description: 'You just tell us what data you need a report for, and we get our kids to create beautiful charts for you using only the finest crayons.' }
        ]
    },
    footer: {
        brandName: 'SIMPLIFY AI INC',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique',
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
