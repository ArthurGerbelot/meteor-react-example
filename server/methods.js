Meteor.methods({
  '/game/create': function (name) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (! name) {
      throw new Meteor.Error("name-required");
    }

    let users = {};
    users[Meteor.userId()] = {x: 0, y: 0};
    return Games.insert({
      name: name,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      users: users
    });
  },
  '/game/join': function (game_id) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (! game_id) {
      throw new Meteor.Error("game_id required");
    }
    let game =  Games.findOne({_id: game_id});
    if (!game) {
      throw new Meteor.Error("No game found");
    }
    if (game.users[Meteor.userId()]) {
      throw new Meteor.Error("You're already on the game");
    }
    let users = game.users
    users[Meteor.userId()] = {x: 0, y:0};

    Games.update({_id: game_id}, {
      '$set': {users: users}
    });
    return game_id;
  },
  '/game/update-pos/': function (game_id, pos) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (! game_id) {
      throw new Meteor.Error("game_id required");
    }
    if (! pos) {
      throw new Meteor.Error("pos required");
    }
    let game =  Games.findOne({_id: game_id});
    if (!game) {
      throw new Meteor.Error("No game found");
    }
    if (!game.users[Meteor.userId()]) {
      throw new Meteor.Error("You're not on the game");
    }
    let users = game.users
    users[Meteor.userId()] = pos;

    Games.update({_id: game_id}, {
      '$set': {users: users}
    });
    return game_id;
  }
});