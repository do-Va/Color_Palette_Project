import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

import './ColorBox.css';

function darker(props) {
  return chroma(props.background).luminance() >= 0.4 ? '#222' : '#fff';
}

function lighter(props) {
  return chroma(props.background).luminance() <= 0.25 ? '#fff' : '#222';
}

const styles = {
  ColorBox: {
    height: props => (props.showingFullPalette ? '25%' : '50%'),
    width: '20%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.8px',
    '&:hover button': {
      opacity: 1,
    },
  },
  copyText: {
    color: props => darker(props),
  },
  colorName: {
    color: props => lighter(props),
  },
  seeMore: {
    color: props => darker(props),
    background: 'rgba(255, 255, 255, 0.3)',
    webkitBackdropFilter: 'blur(3px)',
    backdropFilter: 'blur(3px)',
    position: 'absolute',
    border: 'none',
    right: '0',
    bottom: '0',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    color: props => darker(props),
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
    opacity: 0,
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    padding: '10px',
    left: '0',
    bottom: '0',
    color: '#000',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  copyOverlay: {
    opacity: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },
  showOverLay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: '10',
    position: 'absolute',
  },
  copyMessage: {
    position: 'fixed',
    inset: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    transform: 'scale(0.1)',
    opacity: '0',
    color: '#fff',
    '& h1': {
      fontWeight: '400',
      textShadow: '0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.5)',
      background: 'rgba(255, 255, 255, 0.2)',
      width: '100%',
      textAlign: 'center',
      textTransform: 'uppercase',
      padding: '1rem',
      marginBottom: '1rem',
    },
    '& p': {
      fontSize: '2rem',
      fontWeight: '100',
      textTransform: 'uppercase',
    },
  },
  showMessage: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: '10',
    transition: 'all 0.4s ease-in-out 0.3s',
  },
};

class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };

    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { name, background, moreUrl, showingFullPalette, classes } =
      this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            style={{ background }}
            className={`${classes.copyOverlay} ${
              copied && classes.showOverLay
            }`}
          />
          <div
            className={`${classes.copyMessage} ${
              copied && classes.showMessage
            }`}
          >
            <h1>copied!</h1>
            <p className={classes.copyText}>{this.props.background}</p>
          </div>

          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
