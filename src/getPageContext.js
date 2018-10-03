/* eslint-disable no-underscore-dangle */

import {SheetsRegistry} from 'jss';
import {createMuiTheme, createGenerateClassName} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

// A theme with custom primary and secondary color. It's optional.


const theme = createMuiTheme({
    palette: {
        primary: {
            "50": "#f0f3ff",
            "100": "#EBE5FF",
            "200": "#AB93FF",
            "300": "#8968FF",
            "400": "#6F47FF",
            "500": "#5627FF",
            "600": "#4F23FF",
            "700": "#451DFF",
            "800": "#3C17FF",
            "900": "#2B0EFF",
            A100: "#FFFFFF",
            A200: "#F7F6FF",
            A300: "#fafafa",
            A400: "#f0f3ff",
            A700: "#B2AAFF",
            A900: "#0000ca",
            contrastDefaultColor: "light"
        }, // Purple and green play nicely together.
        secondary: {
            "50": "#FFFAEC",
            "100": "#FFF2CF",
            "200": "#FFEAAF",
            "300": "#FEE28F",
            "400": "#FEDB77",
            "500": "#FED55F",
            "600": "#FED057",
            "700": "#FECA4D",
            "800": "#FEC443",
            "900": "#FDBA32",
            A100: "#FFFFFF",
            A200: "#FFFFFF",
            A400: "#FFF3DB",
            A700: "#FFEAC2",
            A900: "#C8A42D",
            contrastDefaultColor: "light"
        },
        error: {
            "50": "#fce4ec",
            "100": "#ffc6ef",
            "200": "#ffc6ef",
            "300": "#ffc6ef",
            "400": "#ffc6ef",
            "500": "#d782d9",
            "600": "#d782d9",
            "700": "#d782d9",
            "800": "#d782d9",
            "900": "#d782d9",
            A100: "#ffc6ef",
            A200: "#da92f3",
            A400: "#da92f3",
            A700: "#b076f3",
            contrastDefaultColor: "dark"
        },
        shadows: [
            "none", "1px 1px 1px 1px rgba(30, 30, 50,0.2),1px 1px 1px 1px rgba(30, 30, 50,0.14),1px 1" +
            "px 1px 1px rgba(30, 30, 50,0.12)",
            "0px 1px 5px 0px rgba(30, 30, 50,0.2),0px 2px 2px 0px rgba(30, 30, 50,0.14),0px 3" +
            "px 1px -2px rgba(30, 30, 50,0.12)",
            "0px 1px 8px 0px rgba(30, 30, 50,0.2),0px 3px 4px 0px rgba(30, 30, 50,0.14),0px 3" +
            "px 3px -2px rgba(30, 30, 50,0.12)",
            "0px 2px 4px -1px rgba(30, 30, 50,0.2),0px 4px 5px 0px rgba(30, 30, 50,0.14),0px " +
            "1px 10px 0px rgba(30, 30, 50,0.12)",
            "0px 3px 5px -1px rgba(30, 30, 50,0.2),0px 5px 8px 0px rgba(30, 30, 50,0.14),0px " +
            "1px 14px 0px rgba(30, 30, 50,0.12)",
            "0px 3px 5px -1px rgba(30, 30, 50,0.2),0px 6px 10px 0px rgba(30, 30, 50,0.14),0px" +
            " 1px 18px 0px rgba(30, 30, 50,0.12)",
            "0px 4px 5px -2px rgba(30, 30, 50,0.2),0px 7px 10px 1px rgba(30, 30, 50,0.14),0px" +
            " 2px 16px 1px rgba(30, 30, 50,0.12)",
            "0px 5px 5px -3px rgba(30, 30, 50,0.2),0px 8px 10px 1px rgba(30, 30, 50,0.14),0px" +
            " 3px 14px 2px rgba(30, 30, 50,0.12)",
            "0px 5px 6px -3px rgba(30, 30, 50,0.2),0px 9px 12px 1px rgba(30, 30, 50,0.14),0px" +
            " 3px 16px 2px rgba(30, 30, 50,0.12)",
            "0px 6px 6px -3px rgba(30, 30, 50,0.2),0px 10px 14px 1px rgba(30, 30, 50,0.14),0p" +
            "x 4px 18px 3px rgba(30, 30, 50,0.12)",
            "0px 6px 7px -4px rgba(30, 30, 50,0.2),0px 11px 15px 1px rgba(30, 30, 50,0.14),0p" +
            "x 4px 20px 3px rgba(30, 30, 50,0.12)",
            "0px 7px 8px -4px rgba(30, 30, 50,0.2),0px 12px 17px 2px rgba(30, 30, 50,0.14),0p" +
            "x 5px 22px 4px rgba(30, 30, 50,0.12)",
            "0px 7px 8px -4px rgba(30, 30, 50,0.2),0px 13px 19px 2px rgba(30, 30, 50,0.14),0p" +
            "x 5px 24px 4px rgba(30, 30, 50,0.12)",
            "0px 7px 9px -4px rgba(30, 30, 50,0.2),0px 14px 21px 2px rgba(30, 30, 50,0.14),0p" +
            "x 5px 26px 4px rgba(30, 30, 50,0.12)",
            "0px 8px 9px -5px rgba(30, 30, 50,0.2),0px 15px 22px 2px rgba(30, 30, 50,0.14),0p" +
            "x 6px 28px 5px rgba(30, 30, 50,0.12)",
            "0px 8px 10px -5px rgba(30, 30, 50,0.2),0px 16px 24px 2px rgba(30, 30, 50,0.14),0" +
            "px 6px 30px 5px rgba(30, 30, 50,0.12)",
            "0px 8px 11px -5px rgba(30, 30, 50,0.2),0px 17px 26px 2px rgba(30, 30, 50,0.14),0" +
            "px 6px 32px 5px rgba(30, 30, 50,0.12)",
            "0px 9px 11px -5px rgba(30, 30, 50,0.2),0px 18px 28px 2px rgba(30, 30, 50,0.14),0" +
            "px 7px 34px 6px rgba(30, 30, 50,0.12)",
            "0px 9px 12px -6px rgba(30, 30, 50,0.2),0px 19px 29px 2px rgba(30, 30, 50,0.14),0" +
            "px 7px 36px 6px rgba(30, 30, 50,0.12)",
            "0px 10px 13px -6px rgba(30, 30, 50,0.2),0px 20px 31px 3px rgba(30, 30, 50,0.14)," +
            "0px 8px 38px 7px rgba(30, 30, 50,0.12)",
            "0px 10px 13px -6px rgba(30, 30, 50,0.2),0px 21px 33px 3px rgba(30, 30, 50,0.14)," +
            "0px 8px 40px 7px rgba(30, 30, 50,0.12)",
            "0px 10px 14px -6px rgba(30, 30, 50,0.2),0px 22px 35px 3px rgba(30, 30, 50,0.14)," +
            "0px 8px 42px 7px rgba(30, 30, 50,0.12)",
            "0px 11px 14px -7px rgba(30, 30, 50,0.2),0px 23px 36px 3px rgba(30, 30, 50,0.14)," +
            "0px 9px 44px 8px rgba(30, 30, 50,0.12)",
            "0px 11px 15px -7px rgba(30, 30, 50,0.2),0px 24px 38px 3px rgba(30, 30, 50,0.14)," +
            "0px 9px 46px 8px rgba(30, 30, 50,0.12)"
        ]
    },
    typography: {
        fontFamily: '"Nunito Sans", sans-serif, "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        display2: {
            fontSize: "1.75rem",
            fontWeight: 300,
            fontFamily: '"Poppins", sans-serif, "Helvetica", "Arial", sans-serif',
            lineHeight: "1.20588em",
            marginLeft: "-.04em",
            color: "rgba(30, 30, 50,0.54)"
        },
        display1: {
            fontSize: "1.6rem",
            fontWeight: 600,
            fontFamily: '"Poppins", sans-serif, "Helvetica", "Arial", sans-serif',
            lineHeight: "1.20588em",
            marginLeft: "-.04em",
            color: "rgba(30, 30, 50,0.74)"
        },
        headline: {
            fontSize: "1.5rem",
            fontWeight: 700,
            fontFamily: '"Nunito Sans", sans-serif, "Helvetica", "Arial", sans-serif',
            lineHeight: "1.35417em",
            color: "rgba(30, 30, 50,0.54)"
        },
        title: {
            fontSize: "1.3125rem",
            fontWeight: 300,
            fontFamily: '"Nunito Sans", sans-serif, "Helvetica", "Arial", sans-serif',
            lineHeight: "1.16667em",
            color: "rgba(30, 30, 50,0.54)"
        },
        subheading: {
            fontSize: "1.125rem",
            fontWeight: 700,
            fontFamily: '"Nunito Sans", sans-serif,  "Helvetica", "Arial", sans-serif',
            lineHeight: "2.0em",
            color: "rgba(30, 30, 50, 0.9)"
        },
        body2: {
            fontSize: "0.975rem",
            fontWeight: 500,
            fontFamily: '"Nunito Sans", sans-serif, "Helvetica", "Arial", sans-serif',
            lineHeight: "1.71429em",
            color: "rgba(30, 30, 50,0.87)"
        },
        body1: {
            fontSize: "0.975rem",
            fontWeight: 300,
            fontFamily: '"Nunito Sans", sans-serif, "Helvetica", "Arial", sans-serif',
            lineHeight: "1.46429em",
            color: "rgba(30, 30, 50,0.87)"
        },
        caption: {
            fontSize: "0.87rem",
            fontWeight: 300,
            fontFamily: '"Nunito Sans", sans-serif, "Helvetica", "Arial", sans-serif',
            lineHeight: "1.375em",
            color: "rgba(30, 30, 50,0.54)"
        },
        button: {
            fontSize: 14,
            textTransform: "uppercase",
            fontWeight: 500,
            fontFamily: '"Nunito Sans", sans-serif, "Helvetica", "Arial", serif'
        }
    }
});

function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName()
    };
}

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext();
    }

    // Reuse context on the client-side.
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createPageContext();
    }

    return global.__INIT_MATERIAL_UI__;
}