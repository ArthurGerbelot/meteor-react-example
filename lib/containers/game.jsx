GameApp = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const handle = Meteor.subscribe('singleGame', this.props.game_id);
    const data = {};
    if (handle.ready()) {
      data.game = Games.findOne({_id: this.props.game_id});
    }
    return data;
  },
  render() {
    return <div id="game">
      <h1>{this.data.game ? "Game " + this.data.game.name : 'Loading game'}</h1>
      <small>
        <a href="/">Go back</a>
      </small>
    </div>
  },
  _renderGame() {
    if (!this.data.game) {
      return
    }
    return <canvas></canvas>
  }
});