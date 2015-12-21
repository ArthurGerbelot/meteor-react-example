var gamesRoutes = FlowRouter.group({
  // prefix: '/',
  // name: 'games-routes',
  triggersEnter: [function(context, redirect) {
    console.log('Running into game groupe');
    console.log(' - context : ', context);
    console.log(' - redirect : ', redirect);
  }]
});

gamesRoutes.route('/', {
  action: function(params, queryParams) {
    console.log("You are on the home listing page");
    ReactLayout.render(MainLayout, {
      content() {
        return <HomeApp />;
      }
    });
  }
});
gamesRoutes.route('/game/:game_id', {
  action: function(params, queryParams) {
    console.log("You are on game page :", params.game_id);
    ReactLayout.render(MainLayout, {
      content() {
        return <GameApp game_id={params.game_id}/>;
      }
    });
  }
});