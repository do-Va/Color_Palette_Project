export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh',
  },

  logo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '22px',
    background: '#eceff1',
    fontFamily: 'Roboto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: '#222',
    },
  },

  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',

    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus':
      {
        background: 'green',
        outline: 'none',
        border: '2px solid green',
        boxShadow: 'none',
        width: '13px',
        height: '13px',
        marginTop: '-3px',
      },

    '& .rc-slider-track': {
      backgroundColor: 'transparent',
    },

    '& .rc-slider-rail': {
      height: '8px',
    },
  },

  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
  },
};
