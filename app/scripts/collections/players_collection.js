var PlayersCollection = Backbone.Collection.extend({
    model: Player,
    url: "app/nba_player_per_game_data_1951_2015.csv",

   parse: function (csv) {
        //convert csv in an array of objects
        return $.csv.toObjects(csv);
    },
    headers: {},
    fetch: function (options) {
        this.fetchHeaders();
        options = options || {};
        options.dataType = "text";
        return Backbone.Collection.prototype.fetch.call(this, options);
    },
    fetchHeaders: function(){
        var self = this;
        $.ajax({
            url:"app/per_game_column_descriptions.csv",
            dataType: "text",
        }).done(function(csv){
            var rowArrays = $.csv.toArrays(csv);
            var columnNames = {
            };
            for (var i = 1; i<rowArrays.length; i++){
                var key = rowArrays[i][0];
                var value = rowArrays[i][1];
                columnNames[key] = value;
            }
            self.headers = columnNames;
        });
    },
});


