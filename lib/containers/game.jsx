GameApp = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const data = {};
    const handle_singleGame = Meteor.subscribe('singleGame', this.props.game_id);
    if (handle_singleGame.ready()) {
      console.log("--data.game reload--");
      data.game = Games.findOne({_id: this.props.game_id});
    }
    const handle_singleGameUsers = Meteor.subscribe('singleGameUsers', this.props.game_id);
    if (handle_singleGameUsers.ready()) {
      console.log("--data.users reload--", Meteor.users.find().fetch());
      data.users = Meteor.users.find().fetch();
    }

    console.log("getMeteorData - data : ", data);
    return data;
  },
  render() {
    return <div id="game" className="row">
      <div className="col-xs-12">
        <h1>
          {this.data.game ? "Game " + this.data.game.name : 'Loading game'}
        </h1>
        <small>
          <a href="/"><i className="fa fa-chevron-left"/> Go back</a>
        </small>
      </div>
      <div className="col-md-9 col-xs-12">
        {this._renderGame()}
      </div>
      <div className="col-md-3 col-xs-12">
        {this._renderUsers()}
      </div>
    </div>
  },
  _renderGame() {
    if (!this.data.game) {
      return
    }
    return <canvas></canvas>
  },
  _renderUsers() {
    if (!this.data.users) {
      return
    }
    let users = [];
    console.log("rerender :",this.data.game.users);
    // for(user_id in this.data.game.users) {
    //   var user = this.data.users.findOne(user_id)
    //   if (user) {
    //     users.push(<li key={"user-" + user_id}>{user.username}</li>)
    //   }
    // }

    return <ul>
      {users}
    </ul>
  }
});