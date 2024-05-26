import classNames from "classnames";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactImageUploading, { ImageType } from "react-images-uploading";

import { Button } from "@/components/buttons/Button";
import { Icon, Icons } from "@/components/Icon";

interface TraceImageSearchProps {
  onSearch: (image: ImageType) => void | any;
}
export function TraceImageSearch(props: TraceImageSearchProps) {
  const [image, setImage] = useState<ImageType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation();
  const handleSearch = () => {
    props.onSearch?.(image ? [image] : []);
  };
  return (
    <ReactImageUploading
      onChange={(images) => {
        setImage(images[0]);
      }}
      value={image ? [image] : []}
    >
      {({ dragProps, onImageUpload, isDragging, imageList, onImageRemove }) => (
        <div className="w-full md:w-[600px] rounded-lg p-8 text-center bg-background-900">
          <h2 className="text-2xl font-semibold">{t("trace.upload_image")}</h2>
          <h2 className="text-lg text-gray-300">
            {t("trace.upload_supported_extensions")}
          </h2>
          {imageList[0]?.dataURL ? (
            <div className="relative w-full">
              <img
                src={imageList[0].dataURL}
                alt="uploaded image"
                className="w-full mt-4 border border-white/40"
              />
              <button
                type="button"
                className="absolute top-2 right-2 !bg-zinc-300 p-2 rounded-full"
                onClick={() => {
                  onImageRemove(0);
                }}
              >
                <Icon icon={Icons.DELETE} />
              </button>

              <div className="flex items-center justify-end w-full mt-4 space-x-2">
                <Button
                  onClick={onImageUpload}
                  icon={Icons.UPLOAD}
                  theme="purple"
                >
                  <p>{t("trace.upload_another_image")}</p>
                </Button>
                <Button
                  onClick={handleSearch}
                  icon={Icons.SEARCH}
                  theme="purple"
                >
                  <p>{t("trace.search")}</p>
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={classNames(
                "mt-8 p-4 w-full rounded-md border border-dashed border-white/60 flex flex-col items-center justify-center transition duration-300",
                isDragging ? "bg-white/20" : "bg-background-800",
              )}
              {...dragProps}
            >
              <Icon
                className=" text-gray-300 w-24 h-24"
                icon={Icons.CLOUD_UPLOAD}
              />
              <p className="text-gray-300">
                {t("trace.drag_and_drop")} {t("common:or")}{" "}
                <button
                  type="button"
                  className="text-purple-500 hover:underline"
                  onClick={onImageUpload}
                >
                  {t("trace.browse_files")}
                </button>
              </p>

              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="text"
                  className="bg-slate-900 appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="URL"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />

                <Button
                  theme="purple"
                  className="w-24"
                  onClick={() => {
                    setImage({
                      dataURL: inputValue,
                    });
                  }}
                >
                  <Icon icon={Icons.UPLOAD} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </ReactImageUploading>
  );
}
