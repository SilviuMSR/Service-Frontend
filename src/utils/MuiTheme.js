import { createMuiTheme } from '@material-ui/core/styles'
import { main } from '@material-ui/core/colors'

const primaryColor = '#E46B01'
const primaryColorHover = '#d66400'
const secondaryColor = '#fc4a1a'

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
            containedPrimary: {
                backgroundColor: primaryColor,
                '&:hover': {
                    backgroundColor: primaryColorHover
                }
            },
            flatPrimary: {
                color: primaryColorHover
            }
        },
        MuiCheckbox: {
            colorPrimary: {
                '&$checked': {
                    color: primaryColor,
                }
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