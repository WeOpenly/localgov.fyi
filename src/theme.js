/* eslint-disable no-underscore-dangle */

import { createMuiTheme } from '@material-ui/core/styles';
// A theme with custom primary and secondary color. It's optional.


const theme = createMuiTheme({
    palette: {
        primary: {
            "main": "#5627FF",
        "50": "#f9fafc",
        "100": "#EBE5FF",
        "200": "#AB93FF",
        "300": "#8968FF",
        "400": "#6F47FF",
        "500": "#5627FF",
        "600": "#4F23FF",
        "700": "#451DFF",
        "800": "#3C17FF",
        "900": "#2B0EFF",
            A900: "#0000ca",
            contrastDefaultColor: "light"
        }, // Purple and green play nicely together.
        secondary: {
            "main": "#B345E6",
            "50": "#EDE6D4",
            "100": "#E3DBC2",
            "200": "#E3A6FF",
            "300": "#DC91FF",
            "400": "#C36CEB",
            "500": "#B345E6",
            contrastDefaultColor: "light"
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
        fontFamily: '"Nunito Sans", -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        h3: {
            fontSize: "1.75rem",
            fontWeight: 300,
            fontFamily: '"Poppins", -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "1.20588em",
            marginLeft: "-.04em",
            color: "rgba(30, 30, 50,0.54)"
        },
        "MuiTypography-h4":{
            fontSize: "1.6rem",
            fontWeight: 600,
            fontFamily: '"Poppins", -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "1.20588em",
            marginLeft: "-.04em",
            color: "rgba(30, 30, 50,0.94)"
        },
        h4: {
            fontSize: "1.6rem",
            fontWeight: 600,
            fontFamily: '"Poppins", -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "1.20588em",
            marginLeft: "-.04em",
            color: "rgba(30, 30, 50,0.94)"
        },

        h5: {
            fontSize: "1.5rem",
            fontWeight: 700,
            fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "1.35417em",
            color: "rgba(30, 30, 50,0.84)"
        },
        smHeadline: {
        fontSize: "1rem",
                fontWeight: 300,
                fontFamily: '"Poppins", -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
                lineHeight: "1.20588em",
                marginLeft: "-.04em",
                color: "rgba(30, 30, 50,0.54)"
        },
        h6: {
            fontSize: "1.3125rem",
            fontWeight: 300,
            fontFamily: '"Poppins",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "0.967em",
            color: "rgba(30, 30, 50,0.84)"
        },
        subtitle1: {
            fontSize: "1.125rem",
            fontWeight: 500,
            fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "2.0em",
            color: "rgba(30, 30, 50, 0.68)"
        },
        body1: {
            fontSize: "0.999rem",
            fontWeight: 300,
            fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "1.46429em",
            color: "rgba(30, 30, 50,0.99)"
        },
        body3: {
            fontSize: "0.995rem",
            fontWeight: 700,
            fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "1.76429em",
            color: "rgba(30, 30, 50,0.87)"
        },
        body2: {
            fontSize: "0.975rem",
            fontWeight: 300,
            fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "1.46429em",
            color: "rgba(30, 30, 50,0.87)"
        },
        caption: {
            fontSize: "0.87rem",
            fontWeight: 300,
            fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            lineHeight: "1.375em",
            color: "rgba(30, 30, 50,0.54)"
        },
        button: {
            fontSize: "0.82rem",
            textTransform: "uppercase",
            letterSpaceing: '4px',
            fontWeight: 700,
            fontFamily: '"Nunito Sans", -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': 'Nunito Sans',
            },
        },
    },
});

export default theme;