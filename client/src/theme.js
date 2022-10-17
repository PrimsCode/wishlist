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
        }
        // customBlue:
        // {
        //     main: "F6F8FA"
        // },
    },
    typography: {
        fontFamily: "'Rubik', 'Roboto', sans-serif"
    }

})
export default theme;