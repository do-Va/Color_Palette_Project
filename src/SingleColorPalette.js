import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/styles';

const styles = {
  Palette: {
    height: '100vh',
    overflow: 'hidden',
    paddingBottom: '0.8rem',
  },
  colors: {
    height: '90%',
    overflow: 'hidden',
  },
  goBack: {
    height: '50%',
    width: '20%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.8px',
    opacity: 1,
    background: '#000',
    '& a': {
      color: '#fff',
      width: '100px',
      height: '30px',
      position: 'absolute',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      outline: 'none',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.3)',
      webkitBackdropFilter: 'blur(3px)',
      backdropFilter: 'blur(3px)',
      fontFize: '1rem',
      lineHeight: '30px',
      textTransform: 'uppercase',
      border: 'none',
      textDecoration: 'none',
    },
  },
};

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);

    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = {
      format: 'hex',
    };

    this.changeFormat = this.changeFormat.bind(this);
  }

  gatherShades(palette, colorFilterBy) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorFilterBy)
      );
    }
    // return all shades of given color
    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
