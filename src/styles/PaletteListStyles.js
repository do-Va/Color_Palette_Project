export default {
  PaletteList: {
    marginTop: '1rem',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: '#222',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  nav: {
    display: 'flex',
    width: '100%',
    height: '50px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      background: '#eee',
      padding: '.2rem .7rem',
      borderRadius: '.3rem',
      transition: 'all .4s ease',
    },
    '& a:hover': {
      background: '#ddd',
    },
    '& a, a:active, a:visited,': {
      color: '#222',
    },
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
  },
};
