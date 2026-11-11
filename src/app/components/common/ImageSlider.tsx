import "@/app/components/common/image-slider.css";
import Image from "next/image";
import { CSSProperties } from "react";

export interface ImageSlideItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  content: string;

  mobile_width: string; // 100wv, 500px 등..
  tablet_width: string; // mobile_width와 동일
}

interface ScrolledImageSliderProps {
  topic: string;
  images: ImageSlideItem[];
  height: string;
  mobileHeight?: string;
}

type ScrolledImageSliderStyle = CSSProperties & {
  "--slider-height": string;
  "--slider-mobile-height": string;
}

export function ScrolledImageSlider({ topic, images, height, mobileHeight } : ScrolledImageSliderProps) {
  const style: ScrolledImageSliderStyle = {
    "--slider-height": height,
    "--slider-mobile-height": mobileHeight ?? height
  }
  return (
    <div
      className="scrolled-image-slider"
      aria-label={`${topic} 사진`}
      tabIndex={0}
    >
      {images.map((image, index) => (
        <figure className="item" key={index}>
          <Image
            src={image.src}
            alt={image.content}
            width={image.width}
            height={image.height}
            sizes={`(max-width: 768px) ${image.mobile_width} ${image.tablet_width}`}
            className="image"
            style={style}
          />
          {image.content && <figcaption>{image.content}</figcaption>}
        </figure>
      ))}
    </div>
  );
}