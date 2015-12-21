HomeApp = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const handle = Meteor.subscribe('games');
    const data = {};
    if(handle.ready()) {
      data.games = Games.find({}, {sort: {name: 1}}).fetch();
    }
    data.currentUser = Meteor.user();
    return data;
  },
  getInitialState() {
    return {
      newGameName: null
    }
  },

  onInputChange(event) {
    this.setState({
      newGameName: event.target.value
    })
  },
  onSubmit(event) {
    event.preventDefault();
    Meteor.call('/game/create', this.state.newGameName, function(err, game_id) {
      if (err) {
        console.log("Error:", err);
      }
      if (!err && game_id) {
        location = '/game/' + game_id;
      }
    });
    this.setState({
      newGameName: ''
    })
  },
  onJoinGame(game_id) {
    Meteor.call('/game/join', game_id, function(err, game_id) {
      if (err) {
        console.log("Error:", err);
      }
      if (!err && game_id) {
        location = '/game/' + game_id;
      }
    });
  },

  render() {
    return <div id="home" className="row">
      <h1 className="col-xs-12">Home page</h1>
      <div className="col-md-6 col-md-offset-3 col-xs-12">
        <div className="card">
          <h3>Games</h3>
          {this._renderGames()}
          {this._renderForm()}
        </div>
      </div>
    </div>
  },

  _renderGames() {
    var  self = this;
    if (!this.data.games) {
      return <div>Loading</div>
    }

    return <ul>
      {this.data.games.map(game => {
        let is_can_join =  true;
        if (!this.data.currentUser || game.users && game.users[this.data.currentUser._id]) {
          is_can_join = false;
        }
        return <li key={'game-' + game._id}>
          {game.name}
          <a className="action" href={'/game/' + game._id}>
            <i className="fa fa-eye"/> View
          </a>
          {is_can_join ? <a className="action" onClick={()=>{ self.onJoinGame(game._id) }}>
            <i className="fa fa-sign-in"/> Join
          </a> : ''}
        </li>
      })}
    </ul>
  },
  _renderForm() {
    let is_logged = !!this.data.currentUser;
    let placeholder = is_logged ? "Game label" : "You have to be logged to create a game";

    return <form className="input-group" onSubmit={this.onSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        disabled={!is_logged} ref="input"
        value={is_logged ? this.state.newGameName : ''}
        onChange={this.onInputChange} />

      <span className="input-group-btn">
        <button className={"btn btn-primary " + (is_logged ? '' : 'disabled')} type="submit">
          <i className={is_logged ? "fa fa-plus" : "fa fa-times"} />Create
        </button>
      </span>
    </form>
  }
});