var draw = function(ctx, game) {
  console.log("Draw : ", game);

  ctx.clearRect(0,0,1000,1000)

  let user = Meteor.user();
  let is_player = false;

  ctx.fillStyle = "#FF0000";
  for (id in game.users) {
    ctx.fillRect(game.users[id].x, game.users[id].y, 25, 25);
    if (user && user._id === id) {
      is_player = true;
    }
  }

  console.log("is player : ", is_player);
  if (is_player) {
    ctx.fillStyle = "#AAAAAA";

    var border = 5;
    var space = 10;
    var size = 20;
    ctx.fillRect(border+space+size, border, size, size)
    ctx.fillRect(border+2*space+2*size, border+space+size, size, size)
    ctx.fillRect(border+space+size, border+2*space+2*size, size, size)
    ctx.fillRect(border, border+size+space, size, size)
  }
}

Template.play.onCreated(function () {
  var instance = this;

  let game_id = FlowRouter.getParam('game_id');
  instance.ctx = new ReactiveVar(null);

  instance.autorun(() => {
    console.log("--Autorun --");
    instance.subscribe('singleGame', game_id);

    let game = Games.findOne({_id: game_id});

    if (instance.ctx.get() && game) {
      draw(instance.ctx.get(), game);
    }
  })
});

Template.play.helpers({
  getWidth() {
    return window.innerWidth - 10
  },
  getHeight() {
    return window.innerHeight - 10
  }
});

Template.play.events({
  'click #canvas': function(e) {
    var x = e.clientX;
    var y = e.clientY;

    var border = 5;
    var space = 10;
    var size = 20;

    var step = 15;
    var limit = 200;

    let game_id = FlowRouter.getParam('game_id');
    let user = Meteor.user();
    let game = Games.findOne({_id: game_id});
    let pos = game.users[user._id];
    console.log(pos);

    if (x >= border+space+size && y >= border && x <= border+space+size + size && y <= border + size) {
      pos.y = (pos.y >= step) ? pos.y - step : 0;
    }
    else if (x >= border+2*space+2*size && y >= border+space+size && x <= border+2*space+2*size + size && y <= border+space+size + size) {
      pos.x = (pos.x <= limit - step) ? pos.x + step : limit;
    }
    else if (x >= border+space+size && y >= border+2*space+2*size && x <= border+space+size + size && y <= border+2*space+2*size + size) {
      pos.y = (pos.y <= limit - step) ? pos.y + step : limit;
    }
    else if (x >= border && y >= border+size+space && x <= border + size && y <= border+size+space + size) {
      pos.x = (pos.x >= step) ? pos.x - step : 0;
    }
    else {
      return; // No click
    }
    Meteor.call('/game/update-pos/', game_id, pos);
  }
});

Template.play.rendered = function() {
  var instance = this;

  // On rendered, get ctx
  if (!instance.ctx.get()) {
    let c = document.getElementById("canvas");
    instance.ctx.set(c && c.getContext("2d"));

    // If Canvas isn't ready. Try later
    let interval_id = setInterval(() => {
      let c = document.getElementById("canvas");
      instance.ctx.set(c && c.getContext("2d"));

      // When ctx is ready, clear interval
      if (instance.ctx.get()) {
        clearInterval(interval_id);
      }
    }, 100);
  }
}