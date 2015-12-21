Meteor.publish('games', () => {
  return Games.find({});
});

Meteor.publish('singleGame', _id => {
  return Games.find({_id});
});