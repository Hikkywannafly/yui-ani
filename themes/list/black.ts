import { createTheme } from "../types";

const tokens = {
    white: {
        c50: "#ffffff",
        c100: "#f2f2f2",
        c200: "#e6e6e6",
        c300: "#d9d9d9",
        c400: "#cccccc",
        c500: "#bfbfbf",
        c600: "#b3b3b3",
        c700: "#a6a6a6",
        c800: "#999999",
        c900: "#8c8c8c"
    },
    black: {
        c50: "#737373",
        c100: "#666666",
        c200: "#595959",
        c300: "#4d4d4d",
        c400: "#404040",
        c500: "#333333",
        c600: "#262626",
        c700: "#1a1a1a",
        c800: "#0d0d0d",
        c900: "#000000"
    }
};

export default createTheme({
    name: "black",
    extend: {
        colors: {
            themePreview: {
                primary: tokens.black.c200,
                secondary: tokens.white.c50
            },

            pill: {
                background: tokens.black.c300,
                backgroundHover: tokens.black.c200,
                highlight: tokens.black.c200,

                activeBackground: tokens.black.c300,
            },

            global: {
                accentA: tokens.black.c200,
                accentB: tokens.black.c300
            },

            lightBar: {
                light: tokens.black.c400
            },

            buttons: {
                toggle: tokens.black.c300,
                toggleDisabled: tokens.white.c500,

                secondary: tokens.white.c700,
                secondaryHover: tokens.white.c700,
                purple: tokens.black.c500,
                purpleHover: tokens.black.c400,
                cancel: tokens.white.c500,
                cancelHover: tokens.white.c300
            },

            background: {
                main: tokens.black.c900,
                secondary: tokens.black.c600,
                secondaryHover: tokens.black.c400,
                accentA: tokens.black.c500,
                accentB: tokens.black.c500
            },

            modal: {
                background: tokens.black.c800,
            },

            type: {
                logo: tokens.black.c100,
                text: tokens.white.c50,
                dimmed: tokens.white.c50,
                divider: tokens.white.c500,
                secondary: tokens.white.c100,
                link: tokens.black.c100,
                linkHover: tokens.black.c50
            },

            search: {
                background: tokens.black.c500,
                hoverBackground: tokens.black.c600,
                focused: tokens.black.c400,
                placeholder: tokens.black.c100,
                icon: tokens.black.c100
            },

            mediaCard: {
                hoverBackground: tokens.black.c600,
                hoverAccent: tokens.white.c50,
                hoverShadow: tokens.black.c900,
                shadow: tokens.black.c700,
                barColor: tokens.white.c200,
                barFillColor: tokens.black.c100,
                badge: tokens.black.c700,
                badgeText: tokens.white.c100
            },

            largeCard: {
                background: tokens.black.c600,
                icon: tokens.black.c400
            },

            dropdown: {
                background: tokens.black.c600,
                altBackground: tokens.black.c700,
                hoverBackground: tokens.black.c500,
                text: tokens.white.c50,
                secondary: tokens.black.c100,
                border: tokens.black.c400,
                contentBackground: tokens.black.c500
            },

            authentication: {
                border: tokens.black.c300,
                inputBg: tokens.black.c600,
                inputBgHover: tokens.black.c500,
                wordBackground: tokens.black.c500,
                copyText: tokens.black.c100,
                copyTextHover: tokens.white.c50
            },

            settings: {
                sidebar: {
                    activeLink: tokens.black.c600,
                    badge: tokens.black.c900,

                    type: {
                        secondary: tokens.black.c200,
                        inactive: tokens.white.c50,
                        icon: tokens.white.c50,
                        iconActivated: tokens.black.c200,
                        activated: tokens.black.c50
                    }
                },

                card: {
                    border: tokens.black.c400,
                    background: tokens.black.c400,
                    altBackground: tokens.black.c400
                },

                saveBar: {
                    background: tokens.black.c800
                }
            },

            utils: {
                divider: tokens.white.c300
            },

            errors: {
                card: tokens.black.c800,
                border: tokens.white.c500,

                type: {
                    secondary: tokens.white.c100
                }
            },

            about: {
                circle: tokens.white.c500,
                circleText: tokens.white.c50
            },

            editBadge: {
                bg: tokens.white.c500,
                bgHover: tokens.white.c400,
                text: tokens.white.c50
            },

            progress: {
                background: tokens.white.c50,
                preloaded: tokens.white.c50,
                filled: tokens.black.c200
            },

            video: {
                buttonBackground: tokens.white.c200,

                autoPlay: {
                    background: tokens.white.c700,
                    hover: tokens.white.c500
                },

                scraping: {
                    card: tokens.black.c700,
                    loading: tokens.black.c200,
                    noresult: tokens.white.c100
                },

                audio: {
                    set: tokens.black.c200
                },

                context: {
                    background: tokens.white.c900,
                    light: tokens.white.c50,
                    border: tokens.white.c600,
                    hoverColor: tokens.white.c600,
                    buttonFocus: tokens.white.c500,
                    flagBg: tokens.white.c500,
                    inputBg: tokens.white.c600,
                    buttonOverInputHover: tokens.white.c500,
                    inputPlaceholder: tokens.white.c200,
                    cardBorder: tokens.white.c700,
                    slider: tokens.white.c50,
                    sliderFilled: tokens.black.c200,

                    buttons: {
                        list: tokens.white.c700,
                        active: tokens.white.c900
                    },

                    closeHover: tokens.white.c800,

                    type: {
                        secondary: tokens.white.c200,
                        accent: tokens.black.c200
                    }
                }
            }
        }
    }
});