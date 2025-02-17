import Link from "next/link";

interface PropsTitleHeading {
  titleHeading: string;
}

const TitleHeading: React.FC<PropsTitleHeading> = ({ titleHeading }) => {
  return (
    <div className="relative flex items-center justify-center before-heading">
      <h2 className="relative px-5 z-10 bg-[#f2f6f3] text-5xl text-[#016735] font-semibold inline-block text-center">
        <Link className="tab-url" href="/" title="EGA Minimart Short">
          {titleHeading}
        </Link>
      </h2>
    </div>
  );
};

export default TitleHeading;
