import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Sticky from "react-sticky-el";
import { useWindowSize } from "react-use";

import { ThinContainer } from "@/components/layout/ThinContainer";
import { useSlashFocus } from "@/components/player/hooks/useSlashFocus";
import { HeroTitle } from "@/components/text/HeroTitle";
import { useBannerSize } from "@/stores/banner";

export interface HeroPartProps {
  setIsSticky: (val: boolean) => void;
  title: string;
}

export function HeroPart2({ setIsSticky, title }: HeroPartProps) {
  const [, setShowBg] = useState(false);
  const bannerSize = useBannerSize();
  const stickStateChanged = useCallback(
    (isFixed: boolean) => {
      setShowBg(isFixed);
      setIsSticky(isFixed);
    },
    [setShowBg, setIsSticky],
  );
  const { t } = useTranslation();
  const { width: windowWidth } = useWindowSize();
  const subPageTitle = t(title);
  const topSpacing = 16;
  const [stickyOffset, setStickyOffset] = useState(topSpacing);
  useEffect(() => {
    if (windowWidth > 1200) {
      // On large screens the bar goes inline with the nav elements
      setStickyOffset(topSpacing);
    } else {
      // On smaller screens the bar goes below the nav elements
      setStickyOffset(topSpacing + 60);
    }
  }, [windowWidth]);
  const inputRef = useRef<HTMLInputElement>(null);
  useSlashFocus(inputRef);

  return (
    <ThinContainer>
      <div className="mt-44 space-y-16 text-center">
        <div className="relative z-10 mb-16">
          <HeroTitle className="mx-auto max-w-md">{subPageTitle}</HeroTitle>
        </div>
        <div className="relative h-20 z-30">
          <Sticky
            topOffset={stickyOffset * -1 + bannerSize}
            stickyStyle={{
              paddingTop: `${stickyOffset + bannerSize}px`,
            }}
            onFixedToggle={stickStateChanged}
          />
        </div>
      </div>
    </ThinContainer>
  );
}
