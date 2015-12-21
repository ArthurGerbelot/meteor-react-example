Meteor.publish('games', () => {
  return Games.find({});
});

Meteor.publish('singleGame', _id => {
  return Games.find({_id});
});
Meteor.publish('singleGameUsers', _id => {
  let game = Games.findOne({_id});
  if (!game) {
    return null;
  }
  let users_id = [];
  for(user_id in game.users) {
    users_id.push(user_id);
  }
  console.log("Publish is for ", this.user_id);
  console.log("Publish game update : ", Meteor.users.find({_id:{'$in': users_id}}).fetch());
  return Meteor.users.find({_id:{'$in': users_id}});
});