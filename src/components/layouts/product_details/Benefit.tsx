import { PRODUCT_FEATURES } from "@/constants/features";

type FeatureListProps = {
  features: typeof PRODUCT_FEATURES;
};
const Benefit: React.FC<FeatureListProps> = ({ features }) => {
  return (
    <div>
      <ul className=" pt-3 flex gap-2 flex-col text-sm">
        {features.map((feature, index) => (
          <li className="item relative flex gap-2 items-center" key={index}>
            <div className="max-w-5">{feature.icon}</div>
            <span>{feature.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Benefit;
