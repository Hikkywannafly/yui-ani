import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Icon, Icons } from "@/components/Icon";

export function SceneSearch(props: {
  clickable?: boolean;
  hideTextOnMobile?: boolean;
  backgroundClass?: string;
}) {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        "flex items-center space-x-2 rounded-full px-4 py-2 text-type-logo",
        props.backgroundClass ?? " bg-opacity-50",
        props.clickable
          ? "transition-[transform,background-color] hover:scale-105 hover:bg-pill-backgroundHover  hover:text-type-logo active:scale-95"
          : "",
      )}
    >
      <Icon
        className={classNames(
          "font-semibold text-white ",
          props.hideTextOnMobile ? "hidden" : " sm:block",
        )}
        icon={Icons.SEARCH}
      />
      <span
        className={[
          "font-semibold text-white ",
          props.hideTextOnMobile ? "hidden sm:block" : "",
        ].join(" ")}
      >
        {t("global.search")}
      </span>
    </div>
  );
}
