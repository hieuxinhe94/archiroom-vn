const Leader = ({ currentTheme }) => {
  const peoples = [
    {
      id: 1,
      name: "Jun Phạm",
      title: "CEO-Founder",
      image: "avatars/hieu.jpg",
      description:
        "Master Degree, 10+ years experiences in technology, AI Engineer expert. ",
    },
    {
      id: 2,
      name: "Quan Bach",
      title: "AI Engineer Leader",
      image: "avatars/quan.jpg",
      description: "8+ years as AI Engineer.",
    },
    {
      id: 3,
      name: "Hoa Bui Chi",
      title: "Mobile Development Leader",
      image: "avatars/user.png",
      description: "12+ years experiences .",
    },
    {
      id: 4,
      name: "Kun Pham",
      title: "Blockchain Engineer Leader",
      image: "avatars/user.png",
      description: "8+ years experiences .",
    },
    {
      id: 5,
      name: "Khang Tran",
      title: "Web Development Leader",
      image: "avatars/user.png",
      description: "8+ years experiences .",
    },
  ];

  return (
    <div className="py-20">
      <div className="xl:container mx-auto px-6 md:px-12">
        <div className="mb-16 md:w-2/3 lg:w-1/2">
          <h2 className="mb-4 text-2xl font-bold text-gray-200 dark:text-white md:text-4xl">
            Our leadership
          </h2>
          <p className="text-gray-300 dark:text-gray-300">
            Với sức trẻ và sự khát khao cuồng nhiệt, chúng tôi sẽ mang đến những sản phẩm với niềm tâm huyết - tận tụy - phần mềm chất lượng nhất giúp khách hàng tạo lợi thế cạnh tranh.
          </p>
        </div>
        <div className="grid gap-6 px-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {peoples.map((item, index) => (
       
              <div key={index} className="group relative rounded-3xl  space-y-6 overflow-hidden">
                <img
                  className="mx-auto h-[26rem] w-full  object-cover object-top ransition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  src={item.image}
                  alt="woman"
                  loading="lazy"
                  width="640"
                  height="805"
                />
                <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-gray-800 dark:bg-white translate-y-24 transition duration-300 ease-in-out group-hover:translate-y-0">
                  <div>
                    <h4 className="text-xl font-semibold dark:text-gray-700 text-white">
                      {item.name}
                    </h4>
                    <span className="block text-sm text-gray-200">
                      {item.title}
                    </span>
                  </div>
                  <p className="mt-8 text-gray-300 dark:text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
        
          ))}
        </div>
      </div>
    </div>
  );
};
export default Leader;
