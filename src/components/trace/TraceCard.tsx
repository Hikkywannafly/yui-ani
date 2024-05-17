// import { getTitle } from "@/utils/data";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { TraceImageResult } from "@/hooks/useTraceImage";

export function parseTime(seconds: string | number) {
  seconds = seconds.toString();
  let minutes = Math.floor(Number(seconds) / 60).toString();
  let hours = "";

  if (Number(minutes) > 59) {
    hours = Math.floor(Number(minutes) / 60).toString();
    hours = Number(hours) >= 10 ? hours : `0${hours}`;
    minutes = (Number(minutes) - Number(hours) * 60).toString();
    minutes = Number(minutes) >= 10 ? minutes : `0${minutes}`;
  }

  seconds = Math.floor(Number(seconds) % 60).toString();
  seconds = Number(seconds) >= 10 ? seconds : `0${seconds}`;

  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

interface TraceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any;
  isActive?: boolean;
}

export function TraceCard(props: TraceCardProps) {
  const { data, isActive } = props;
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        "space-y-2 bg-background-900 p-4 hover:bg-white/20 transition duration-300 cursor-pointer",
        // isActive && "bg-white/20",
        // className,
      )}
      // {...props}
    >
      {/* <p className="text-lg font-semibold">{data.anime}</p> */}

      <div className="grid grid-cols-10">
        <div className="col-span-5 flex flex-col justify-between">
          <p>
            {t("common:episode")} {data.episode}
          </p>

          <p>
            {parseTime(data.from)} - {parseTime(data.to)}
          </p>

          {/* <p>~{(data.similarity * 100).toFixed(2)}% chính xác</p> */}
          <p>
            {t("trace.percent_similarity", {
              percent: (data.similarity * 100).toFixed(2),
            })}
          </p>
        </div>
        <div className="col-span-5">
          <video
            src={`${data.video}&size=s`}
            loop
            className="w-full object-contain"
            autoPlay
            muted
          />
        </div>
      </div>
    </div>
  );
}
