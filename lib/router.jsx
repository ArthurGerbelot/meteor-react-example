var gamesRoutes = FlowRouter.group({
  triggersEnter: []
});

FlowRouter.route('/', {
  name: 'home',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content() {
        return <HomeApp />;
      }
    });
  }
});
FlowRouter.route('/game/:game_id', {
  name: 'game',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content() {
        return <GameApp game_id={params.game_id}/>;
      }
    });
  }
});
FlowRouter.route('/play/:game_id', {
  name: 'play',
  action: (param, queryParams) => {
    BlazeLayout.render('play');
  }
})