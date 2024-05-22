import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageType } from "react-images-uploading";

import { getDataWithName } from "@/backend/metadata/tmdb";
import { TraceImageResponse } from "@/hooks/useTraceImage";

import { TraceCard } from "./TraceCard";

interface TracePanelProps {
  data: TraceImageResponse;
  image?: ImageType | any;
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function TracePanel(props: TracePanelProps) {
  const { data, image } = props;
  const [cardIndex, setCardIndex] = useState(0);

  const card = useMemo(() => data.result[cardIndex], [cardIndex, data.result]);

  const activeData = useMemo(
    () => getDataWithName(card.anime.title.native).then,
    [card.anime],
  );

  const handleCardClick = useCallback((index: number) => {
    setCardIndex(index);
  }, []);
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

        {data.result.map((result: any, index: number) => (
          <TraceCard
            data={result}
            key={index.toFixed(0)}
            onClick={() => handleCardClick(index)}
            isActive={index === cardIndex}
          />
        ))}
      </div>
      <div className="h-max w-full space-y-4 bg-background-900 md:w-[70%]">
        <div className="aspect-h-9 aspect-w-16 w-full">
          <video
            src={`${card.video}&size=l`}
            loop
            className="w-full object-contain"
            autoPlay
            muted
            controls
          />
        </div>
        <div className="space-y-8 p-8">
          <div className="flex flex-col items-start gap-4 text-center md:flex-row md:text-left">
            <div className="mx-auto w-[183px] shrink-0 md:mx-0">
              <div className="relative aspect-w-2 aspect-h-3">
                {/* <img src={} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TracePanel);
