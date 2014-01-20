var Backbone = require('backbone'),
    $ = require('jquery')(window),
    Backbone = require('backbone'),
    ExpenseListView = require('./ExpenseList'),
    models = require('../models/memory/expense'),
    template = require("../templates/Home.hbs");

Backbone.$ = $;



module.exports = Backbone.View.extend({

    initialize: function () {
        console.log("home initialize");
        this.expenseList = new models.ExpenseCollection();
        //this.employeeList = new models.EmployeeCollection();
        this.render();
    },

    render: function () {
        this.$el.html(template());
        console.log('before render');

        this.listView = new ExpenseListView({collection: this.expenseList, el: $(".scroller", this.el)});
        this.expenseList.fetch({reset: true, data: {name: ""}});

        //this.listView = new EmployeeListView({collection: this.employeeList, el: $(".scroller", this.el)});
        //this.employeeList.fetch({reset: true, data: {name: ""}});
        console.log('after render');
        return this;
    },

    events: {
        "keyup .search-key": "search",
        "keypress .search-key": "onkeypress"
    },

    search: function (event) {
        var key = $('.search-key').val();
        //this.employeeList.fetch({reset: true, data: {name: key}});
    },

    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    }

});