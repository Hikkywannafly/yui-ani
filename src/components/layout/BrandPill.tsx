import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Icon, Icons } from "@/components/Icon";

export function BrandPill(props: {
  clickable?: boolean;
  hideTextOnMobile?: boolean;
  backgroundClass?: string;
}) {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        "flex items-center space-x-2 rounded-full px-4 py-2 text-type-logo",
        props.backgroundClass ?? "bg-pill-background bg-opacity-50",
        props.clickable
          ? "transition-[transform,background-color] hover:scale-105 hover:bg-pill-backgroundHover backdrop-blur-lg hover:text-type-logo active:scale-95"
          : "",
      )}
    >
      <Icon className="text-xl" icon={Icons.YUI_ANI} />
      <span
        className={[
          "font-bold bg-clip-text  text-transparent rounded-xl drop-shadow-2xl animate-text bg-gradient-to-r from-white to-gray-700 via-gray-400",
          props.hideTextOnMobile ? "hidden sm:block" : "",
        ].join(" ")}
      >
        {t("global.name")}
      </span>
    </div>
  );
}
