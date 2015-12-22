
// if (Meteor.isClient) {
//   var Surface = ReactCanvas.Surface;
//   var Image = ReactCanvas.Image;
//   var Text = ReactCanvas.Text;
// }
var count = 0;
var draw = (game) => {
  console.log("draw");



  var c = document.getElementById( "canvas" );
  var ctx= c.getContext("2d");

  ctx.clearRect(0,0,200,200);

  var text = 'Hello kiwi!';
  ctx.font = "30pt Verdana";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  var textPxLength = ctx.measureText(text);
  ctx.fillStyle = "darkgreen";
  ctx.fillText(count,25,50);

};

GameApp = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const data = {};
    const handle_singleGame = Meteor.subscribe('singleGame', this.props.game_id);
    if (handle_singleGame.ready()) {
      console.log("--data.game reload--");
      data.game = Games.findOne({_id: this.props.game_id});

      console.log(data.game);
      var users_id = [];
      for (user_id in data.game.users) {
        users_id.push(user_id);
      }
      const handle_singleGameUsers = Meteor.subscribe('singleGameUsers', users_id);
      if (handle_singleGameUsers.ready()) {
        data.users = Meteor.users//.find({}).fetch();
      }
    }
    // const handle_singleGameUsers = Meteor.subscribe('singleGameUsers', this.props.game_id);
    // if (handle_singleGameUsers.ready()) {
    //   console.log("--data.users reload--", Meteor.users.find().fetch());
    //   data.users = Meteor.users.find().fetch();
    // }

    console.log("getMeteorData - data : ", data);
    return data;
  },
  getInitialState() {
    return {
      redraw_canvas: true
    }
  },
  componentDidMount() {
    let self = this;

    setInterval(() => {
      let redraw_canvas = self.state.redraw_canvas;
      if (redraw_canvas) {
        self.setState({
          redraw_canvas: false
        });
        draw(self.data.game);
      }
    }, 100);
  },
  _isClicked: function() {
    count++;
    this.setState({
      redraw_canvas: true
    });
  },
  render() {
    var html = (<div id="game" className="row">
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
    </div>);

    console.log("After creating html");

    return html;
  },
  _renderGame() {
    console.log("RenderGame: isServer : " + Meteor.isServer + " | isClient : " + Meteor.isClient);
    // if (Meteor.isServer)
    //   return;

    var surfaceWidth = 100; //typeof window !== 'undefined' && window.innerWidth / 2;
    var surfaceHeight = 100; //surfaceWidth / 2; //window.innerHeight;
// console.log("Surface : ", Surface, (
//       <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
//         <Image style={imageStyle} src='http://www.menucool.com/slider/jsImgSlider/images/image-slider-1.jpg' />
//       </Surface>
//     ));
    return (
      <canvas id="canvas" ref="canvas" width={surfaceWidth} height={surfaceHeight} onClick={this._isClicked}>
      </canvas>
    );
  },
  _renderUsers() {
    if (!this.data.users) {
      return
    }
    let users = [];
    console.log("rerender :", this.data.game.users);
    console.log("users :", this.data.users);
    for(user_id in this.data.game.users) {
      var user = this.data.users.findOne({_id: user_id})
      console.log(user_id, " -> user :",  user);
      if (user) {
        users.push(<li key={"user-" + user_id}>{user.username}</li>)
      }
    }

    return <ul>
      {users}
    </ul>
  }
});