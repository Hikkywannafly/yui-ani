import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageType } from "react-images-uploading";

import { Button } from "@/components/buttons/Button";
import { Icons } from "@/components/Icon";
import { Loading } from "@/components/layout/Loading";
import { WideContainer } from "@/components/layout/WideContainer";
import { TraceImageSearch } from "@/components/trace/TraceImageSearch";
import { TracePanel } from "@/components/trace/TracePanel";
import { Heading2, Paragraph } from "@/components/utils/Text";
import { useTraceImage } from "@/hooks/useTraceImage";
import { PageTitle } from "@/pages/parts/util/PageTitle";

import { SubPageLayout } from "../../layouts/SubPageLayout";

// Hàm chuyển đổi dữ liệu
function transformTraceResult(data: any) {
  return data.result.map((item: any) => ({
    anime: {
      id: item.anime.Media.id,
      title: item.anime.Media.title,
    },
    filename: item.filename,
    episode: item.episode,
    from: item.from,
    to: item.to,
    similarity: item.similarity,
    video: item.video,
    image: item.image,
  }));
}

export function SceneSearch() {
  const { t } = useTranslation();
  const [traceResult, setTraceResult] = useState(null);
  const [image, setImage] = useState(null);

  const { mutate, data, isLoading } = useTraceImage();

  const handleOnSearch = useCallback(
    async (images: any) => {
      setImage(images);
      await mutate(images);
    },
    [mutate],
  );

  useEffect(() => {
    if (data) {
      const transformedData = data;
      setTraceResult(transformedData);
    }
  }, [data]);

  const handleReset = useCallback(() => {
    setTraceResult(null);
    setImage(null);
  }, []);

  return (
    <SubPageLayout>
      <PageTitle subpage k="trace.heading" />
      <WideContainer>
        <div className="text-center">
          <Heading2>{t("trace.heading")}</Heading2>
          <h3 className="text-lg mb-2">{t("trace.description")}</h3>
          <Paragraph className="italic text-lg mb-1">
            {t("trace.made_by")}{" "}
            <a
              className="hover:underline"
              href="https://github.com/soruly/trace.moe"
            >
              trace.moe
            </a>
          </Paragraph>
          <Paragraph className="italic">{t("trace.note")}</Paragraph>
        </div>
        <div className="pt-20 space-y-16 flex flex-col items-center justify-center">
          {traceResult ? (
            <>
              <Button
                theme="purple"
                onClick={handleReset}
                className=""
                icon={Icons.TRY_AGAIN}
              >
                <p>{t("trace.try_again")}</p>
              </Button>
              <TracePanel data={traceResult} image={image} />
            </>
          ) : isLoading ? (
            <div className="flex justify-center items-center relative">
              <img
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                src={image[0]?.dataURL}
                alt="searched image"
                className="w-full object-fit blur-[2px] transition duration-300"
              />
              <div className="relative inset-0 bg-black/30" />
              <Loading className="absolute flex justify-center" />
            </div>
          ) : (
            <TraceImageSearch onSearch={handleOnSearch} />
          )}
        </div>
      </WideContainer>
    </SubPageLayout>
  );
}
