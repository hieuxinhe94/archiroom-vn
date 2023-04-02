export function CustomFieldsComponent({ children, type }) {
  switch (type) {
    case "blockquoteComponent":
      return <CustomComponentQuote children={children} />;
    case "podcastComponent":
      return <CustomPodcastComponent children={children} />;
    case "videoComponent":
      return <CustomVideoComponent children={children} />;
    case "chatbotComponent":
      return <CustomChatbotComponent children={children} />;
    case "rpaComponent":
      return <CustomRpaComponent children={children} />;
    default:
      return <></>;
  }
}

export function CustomComponentQuote({ children }) {
  return (
    <>
      <div className="w-full ">
        <div className="w-full cursor-pointer relative inline-flex rounded-md bg-gray-200 text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-150 hover:text-slate-900">
          <div className="w-full flex px-3 py-2">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:R3aojaddh:"
              data-state="closed"
            >
              <div className="group hidden items-center gap-3 text-white/60 transition-colors hover:text-white lg:flex">
                <span className="flex items-center rounded-full bg-white/70 px-3 py-3 group-hover:bg-white">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    className="relative text-black "
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                  </svg>
                </span>
                <div className="text-left text-indigo-800">CustomComponentQuote:{children}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function CustomPodcastComponent({ children }) {
  return (
    <>
      <div className="w-full ">
        <div className="w-full cursor-pointer relative inline-flex rounded-md bg-gray-200 text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-150 hover:text-slate-900">
          <div className="w-full flex px-3 py-2">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:R3aojaddh:"
              data-state="closed"
            >
              <div className="group hidden items-center gap-3 text-white/60 transition-colors hover:text-white lg:flex">
                <span className="flex items-center rounded-full bg-white/70 px-3 py-3 group-hover:bg-white">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    className="relative text-black "
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                  </svg>
                </span>
                <div className="text-left text-indigo-800">CustomPodcastComponent: {children}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function CustomVideoComponent({ children }) {
  return (
    <>
      <div className="w-full ">
        <div className="w-full cursor-pointer relative inline-flex rounded-md bg-gray-200 text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-150 hover:text-slate-900">
          <div className="w-full flex px-3 py-2">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:R3aojaddh:"
              data-state="closed"
            >
              <div className="group hidden items-center gap-3 text-white/60 transition-colors hover:text-white lg:flex">
                <span className="flex items-center rounded-full bg-white/70 px-3 py-3 group-hover:bg-white">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    className="relative text-black "
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                  </svg>
                </span>
                <div className="text-left text-indigo-800">CustomVideoComponent: {children}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function CustomChatbotComponent({ children }) {
  return (
    <>
      <div className="w-full ">
        <div className="w-full cursor-pointer relative inline-flex rounded-md bg-gray-200 text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-150 hover:text-slate-900">
          <div className="w-full flex px-3 py-2">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:R3aojaddh:"
              data-state="closed"
            >
              <div className="group hidden items-center gap-3 text-white/60 transition-colors hover:text-white lg:flex">
                <span className="flex items-center rounded-full bg-white/70 px-3 py-3 group-hover:bg-white">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    className="relative text-black "
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                  </svg>
                </span>
                <div className="text-left text-indigo-800">CustomChatbotComponent: {children}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function CustomRpaComponent({ children }) {
    return (
      <>
        <div className="w-full ">
          <div className="w-full cursor-pointer relative inline-flex rounded-md bg-gray-200 text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-150 hover:text-slate-900">
            <div className="w-full flex px-3 py-2">
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:R3aojaddh:"
                data-state="closed"
              >
                <div className="group hidden items-center gap-3 text-white/60 transition-colors hover:text-white lg:flex">
                  <span className="flex items-center rounded-full bg-white/70 px-3 py-3 group-hover:bg-white">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 448 512"
                      className="relative text-black "
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                    </svg>
                  </span>
                  <div className="text-left text-indigo-800">CustomRpaComponent: {children}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }