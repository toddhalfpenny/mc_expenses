var $ = require('jquery')(window),
    Backbone = require('backbone'),
    template = require("../templates/ExpenseList.hbs");

Backbone.$ = $;

// H E L P E R S 
var Handlebars = require("hbsfy/runtime");
Handlebars.registerHelper("toPounds", function(value) {
  var poundsPence = (value / 100).toFixed(2);
  return poundsPence.toString()
});

Handlebars.registerHelper("prettyDate", function(secs) {
  var d = new Date(secs * 1000);
  return d.toDateString()
});

module.exports = Backbone.View.extend({

    initialize: function () {
        this.render();
        this.collection.on("reset", this.render, this);
    },

    render: function () {
        console.log(this.collection.toJSON());
        this.$el.html(template(this.collection.toJSON()));
        console.log("ExpenseList end render");
        return this;
    }

});