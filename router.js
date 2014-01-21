"use strict";

var $ = require('jquery')(window),
    Backbone = require('backbone');

Backbone.$ = $;

var PageSlider = require('./utils/pageslider'),
    HomeView = require('./views/Home'),
    ExpenseView = require('./views/Expense'),
    ReportsView = require('./views/Reports'),
    models = require('./models/memory/expense'),
    slider = new PageSlider($('body')),
    homeView = new HomeView();

module.exports = Backbone.Router.extend({

    routes: {
        "": "home",
        "expenses/:id": "expensesDetails",
        "employees/:id/reports": "reports"
    },

    home: function () {
        console.log("home");
        slider.slidePage(homeView.$el);
    },

    expensesDetails: function (id) {
        console.log("expensesDetails");
        var expense = new models.Expense({id: id});
        expense.fetch({
            success: function (data) {
                slider.slidePage(new ExpenseView({model: data}).$el);
            }
        });
    },

    reports: function (id) {
        console.log("reports");
        var employee = new models.Employee({id: id});
        employee.fetch({
            success: function (data) {
                slider.slidePage(new ReportsView({model: data}).$el);
            }
        });
    }

});
