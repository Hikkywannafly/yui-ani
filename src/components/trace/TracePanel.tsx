import { useTranslation } from "react-i18next";
import { ImageType } from "react-images-uploading";

import { TraceImageResponse } from "@/hooks/useTraceImage";

import { TraceCard } from "./TraceCard";

interface TracePanelProps {
  data: any;
  image?: ImageType | any;
}

export function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function TracePanel(props: TracePanelProps) {
  const { data, image } = props;
  console.log(`TracePanel: data`, data);
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-8 md:flex-row">
      <div className="w-full space-y-4 md:w-[30%]">
        <div className="bg-background-900 p-4">
          <p className="text-xl font-semibold">{t("trace.your_image")}</p>
          <p className="text-sm text-gray-300">
            {t("trace.num_of_found_images", {
              num: numberWithCommas(data.frameCount),
            })}
          </p>

          <div className="mt-2">
            <img src={image[0]?.dataURL} alt="Search image" />
          </div>
        </div>

        {data.result.map((result: any) => (
          <TraceCard
            data={result}
            key={result.anime.id}
            // onClick={() => handleCardClick(index)}
            // isActive={index === cardIndex}
          />
        ))}
      </div>
    </div>
  );
}
