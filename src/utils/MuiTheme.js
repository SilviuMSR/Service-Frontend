import { createMuiTheme } from '@material-ui/core/styles'
import { main } from '@material-ui/core/colors'

const primaryColor = '#3e3f42'
const primaryColorHover = '#6b6c6f'
const secondaryColor = '#1665d8'
const whiteColor = '#ffffff'
const mainTextColor = '#ffffff'
const blueColor = '#1665d8'
const greenColor = '#34aa44'
const redColor = '#e6492d'

const primaryButtonColor = '#1976D2 '
const secondarButtonColor = '#f6f7f9'

const MuiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor
    },
    overrides: {
        MuiInput: {
            underline: {
                '&:after': {
                    borderBottom: '2px solid ' + primaryColor
                }
            }
        },
        MuiOutlinedInput: {
            root: {
                '& $notchedOutline': {
                    borderColor: '#e2e5ed'
                },
                '&$focused $notchedOutline': {
                    borderColor: '#1976d2',
                },
                '&$disabled': {
                    '& $notchedOutline': {
                        borderColor: '#e2e5ed'
                    }
                }
            }
        },
        MuiPaper: {
            elevation1: {
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)',
                },
            },
        },
        MuiCollapse: {
            entered: {
                borderBottom: '1px solid rgba(0,0,0,0.1)'
            }
        },
        MuiFormLabel: {
            root: {
                "&$focused": {
                    color: 'black'
                }
            }
        },
        MuiButton: {
            root: {
                height: 40
            },
            contained: {
                boxShadow: 'unset'
            },
            containedPrimary: {
                color: whiteColor,
                backgroundColor: primaryButtonColor,
                '&:hover': {
                    backgroundColor: greenColor,
                    opacity: 0.50
                }
            },
            flatSecondary: {
                color: '#3e3f42',
                backgroundColor: secondarButtonColor,
                boxShadow: '0 0.5px 0.5px 0 rgba(22, 29, 37, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                border: 'solid 0.5px #d8dce6',
                padding: 9,
                fontSize: 12,
                '&:hover': {
                    backgroundColor: '#d8dce6',
                    opacity: 0.75
                }
            },
            flatPrimary: {
                color: whiteColor,
                backgroundColor: primaryButtonColor,
                padding: '0px 9px',
                fontSize: 12,
                '&:hover': {
                    backgroundColor: primaryColor,
                    opacity: 0.50
                },
            },
            label: {
                fontSize: 14
            }
        },
        MuiCheckbox: {
            colorPrimary: {
                '&$checked': {
                    color: primaryColor,
                }
            }
        },
        MuiCardContent: {
            root: {
                '&:last-child': {
                    paddingBottom: 4
                },
                padding: 6
            }
        },
        MuiAppBar: {
            // colorPrimary: {
            //     backgroundColor: '#f5f5f5'
            // }
        },
        MuiIconButton: {
            colorSecondary: {
                color: secondaryColor
            },
            colorPrimary: {
                color: primaryColorHover
            }
        },
        MuiSvgIcon: {
            colorPrimary: {
                color: primaryColor
            },
            colorSecondary: {
                color: secondaryColor
            }
        },
        MuiListItem: {
            root: {
                paddingRight: '5px',
                paddingLeft: '18px'
            }
        },
        MuiListSubheader: {
            sticky: {
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e0e0e0'
            }
        },
        MuiExpansionPanel: {
            root: {
                marginTop: '5px'
            },
            expanded: {
                marginBottom: '0px',
                marginTop: '5px'
            }
        },
        MuiTab: {
            root: {
                minHeight: '63px',
                fontSize: '15px !important',
                paddingTop: '6px',

            }
        }
    }
})
export default MuiTheme