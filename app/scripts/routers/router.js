 var Router = Backbone.Router.extend({
  routes:{
    "": "playerChart"
  },
  playerChart: function(){
    var playerCollection = new PlayersCollection();
    window.playerCollection = playerCollection;
    var myView = new PlayerView({
      collection:playerCollection
    });
    $('#player-chart').html(myView.render().$el)
    myView.collection.fetch({
      reset: true
    });
  },

});

var router = new Router();
Backbone.history.start();