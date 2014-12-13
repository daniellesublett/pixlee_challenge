var PlayerView = Backbone.View.extend({
  tagName: 'table',
  template: null,
  currentPage : 1,
  perPage: 10,

  initialize: function() {
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(this.collection, "change", this.render);
    this.template = _.template( $('#player-table').html() );
    this.listenTo(this.collection, "sort", this.updateTable);
  },

  paginate: function(){
    return this.collection.slice((this.currentPage-1) *this.perPage, this.currentPage * this.perPage);
  },

  nextPage: function(){
    this.currentPage = this.currentPage+1;
    this.render();
  },

  previousPage: function(){
    this.currentPage = this.currentPage-1;
    this.render();
  },

  sort: function(){
    alert("this should sort shit");

  },

  events: {
    "click #next-page" : "nextPage",
    "click #previous-page" : "previousPage",
    "click th" : "headerClick"
  },

  render: function() {
    this.$el.html(this.template({
      players: this.paginate(),
      headers: this.collection.headers,
      playerTemplate: _.template( $('#player-row').html() )

    }) );

    return this;
  },

  headerClick: function(e){
    var $el = $(e.currentTarget),
        ns = $el.attr('column'),
        cs = this.collection.sortAttribute;
    this.collection.sortPlayers(ns);
  },
});