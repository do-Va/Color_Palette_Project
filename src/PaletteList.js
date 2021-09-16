import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.goToPalette = this.goToPalette.bind(this);
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    const { palettes, classes, deletePalette } = this.props;

    return (
      <div className={classes.PaletteList}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} className="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  key={palette.id}
                  goToPalette={this.goToPalette}
                  handleDelete={deletePalette}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
