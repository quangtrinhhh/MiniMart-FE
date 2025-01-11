import SwiperShort from "./SwiperShort";
import TitleHeading from "./TitleHeading";

const SectionVideoRview: React.FC = ({}) => {
  return (
    <div>
      <TitleHeading titleHeading="EGA Minimart Short" />
      <div className="mt-5">
        <SwiperShort />
      </div>
    </div>
  );
};

export default SectionVideoRview;
