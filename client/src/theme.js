import {createTheme} from '@mui/material';

const theme = createTheme({
    palette: {
        primary:
        {
            main: "#000000"
        },
        customLightGrey:
        {
            main: "#F6F8FA"
        },
        customGrey:
        {
            main: "#E0E0E0"
        },
        birthday:
        {
            main: "#CCE5EB"
        },
        christmas:
        {
            main: "#F57E7E"
        },
        valentines:
        {
            main: "#CF6DDE"
        }
        // customBlue:
        // {
        //     main: "F6F8FA"
        // },
    },
    typography: {
        fontFamily: "'Rubik', 'Roboto', sans-serif",
        h6: {
            fontFamily: "'Rubik', 'Roboto', sans-serif",
            fontWeight: 300
        },
        body1: {
            fontFamily: "'Roboto', sans-serif"
        },
        body2: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 300
        },
        body3: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 200

        }
    }

})
export default theme;