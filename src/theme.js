import { createTheme } from "@material-ui/core"

export const darkTheme = createTheme({
    palette:{
        type: 'dark',
        primary:{
            main:'#207b69',
            dark:'#207b69',
            light: '#207b69',
        },
        secondary:{
            main:"#c84347",
            light:"#c84347",
            dark:"#c84347"
        },
        background:{
            default:'#0f152b',
            paper: '#141823'
        }
        
    },
    typography:{
        fontFamily: "'Quicksand', sans-serif"
    }
})