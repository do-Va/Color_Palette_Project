import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import {
  Drawer,
  Typography,
  Divider,
  IconButton,
  Button,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      colors: seedColors[0].colors,
    };

    this.addNewColor = this.addNewColor.bind(this);
    this.addNewPalette = this.addNewPalette.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  clearColors() {
    this.setState({ colors: [] });
  }

  addRandomColor() {
    const allColors = this.props.palettes.map(palette => palette.colors).flat();

    let rand;
    let randomColor;
    let isDuplicateColor = true;

    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = this.state.colors.some(
        color => color.name === randomColor.name
      );
    }

    this.setState({ colors: [...this.state.colors, randomColor] });
  }

  addNewPalette(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  addNewColor(newColor) {
    this.setState({
      colors: [...this.state.colors, newColor],
    });
  }

  removeColor(name) {
    const newColor = this.state.colors.filter(color => color.name !== name);

    this.setState({
      colors: newColor,
    });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          handleChange={this.handleChange}
          addNewPalette={this.addNewPalette}
          palettes={palettes}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.addRandomColor}
                disabled={paletteIsFull}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              colors={colors}
              handleChange={this.handleChange}
              addNewColor={this.addNewColor}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
