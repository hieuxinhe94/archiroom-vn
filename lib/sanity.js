import Image from "next/image";
import { createClient, createPreviewSubscriptionHook } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import { config } from "./config";
import GetImage from "../utils/getImage";

if (!config.projectId) {
  throw Error("The Project ID is not set. Check your environment variables.");
}
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const imageBuilder = (source) =>
  createImageUrlBuilder(config).image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Barebones lazy-loaded image component
const ImageComponent = ({ value }) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <div className="flex justify-center">
      <div>
        <div
          className="w-full my-8"
          style={{ paddingLeft: "2rem", paddingRight: "2rem", }}
        >
          <Image
            {...GetImage(value)}
            blurDataURL={GetImage(value).blurDataURL}
            objectFit="cover"
            className=""
            alt={value.alt || " "}
            placeholder="blur"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
  marks: {
    center: (props) => <div className="text-center">{props.children}</div>,
    highlight: (props) => (
      <span className="font-bold text-brand-primary">{props.children}</span>
    ),
    link: (props) => (
      <a href={props?.value?.href} target="_blank" rel="noopener">
        {props.children}
      </a>
    ),
  },
};
components.displayName = "components";
// Set up Portable Text serialization
export const PortableText = (props) => (
  <PortableTextComponent components={components} {...props} />
);

export const client = createClient({
  ...config,
  useCdn: false,
  withCredentials: true
});

export const previewClient = createClient({
  ...config,
  useCdn: false,
  withCredentials: true
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default client;
