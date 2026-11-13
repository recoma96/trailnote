import "@/app/components/course-detail/location-bottom-sheet.css";
import { CourseLocation } from "@/app/lib/api/types";
import { ScrolledImageSlider } from "../common/ImageSlider";

interface LocationBottomSheetProps {
  location: CourseLocation | null,
  onClose: () => void;
}


export default function LocationBottomSheet({ location, onClose } : LocationBottomSheetProps) {
  const displayCss = location !== null ? "block" : "none";

  return (
    <div style={{ display: displayCss }} className="course-detail-location-layer">
      <div className="course-detail-location-bottom-sheet">
        <ScrolledImageSlider
          topic={location?.name ?? ''}
          height={"500px"}
          mobileHeight={"240px"}
          images={location?.images.map((image) => ({
            src: image.url,
            alt: image.summary,
            width: image.width,
            height: image.height,
            content: image.summary,

            mobile_width: "100wv",
            tablet_width: "400px",
          })) ?? []}
        />
        <div className="text-layer">
          <button type="button" className="close-botton" onClick={onClose} aria-label="닫기">x</button>
          <h1>{location?.name}</h1>
          <p>{location?.content}</p>
        </div>
      </div>
    </div>
  );
}