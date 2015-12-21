HomeApp = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const handle = Meteor.subscribe('games');
    const data = {};
    if(handle.ready()) {
      data.games = Games.find({}, {sort: {name: 1}}).fetch();
    }

    return data;
  },
  render() {
    console.log("Render Home - ", this.props);
    return <div id="home">
      <h1>Home page</h1>

      <h3>Games</h3>
      {this._renderGames()}
    </div>
  },

  _renderGames: function() {
    if (!this.data.games) {
      return <div>Loading</div>
    }

    return <ul>
      {this.data.games.map(game => {
        return <li key={'game-' + game._id}>
          {game.name}
        </li>
      })}
    </ul>
  }
});