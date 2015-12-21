GameApp = React.createClass({
  render() {
    console.log("Render Game - ", this.props);
    return <h1>Game page #{this.props.game_id}</h1>
  }
});