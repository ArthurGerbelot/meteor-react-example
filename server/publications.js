Meteor.publish('games', () => {
  return Games.find({});
});

Meteor.publish('singleGame', _id => {
  return Game.find({_id});
});