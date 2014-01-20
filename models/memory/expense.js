var Backbone = require('backbone'),
    $ = require('jquery')(window),

    expenses = [
        {"id": 1, "name": "Lunch with customer", "datetime": 1389875400, "value": 1210, "approved": false},
        {"id": 2, "name": "Fuel", "datetime": 1390251872, "value": 4001, "approved": true},
        {"id": 3, "name": "Train (railcard)", "datetime": 1390039470, "value": 1300, "approved": false}
    ],

    findById = function (id) {
        var deferred = $.Deferred(),
            expense = null,
            l = expenses.length,
            i;
        for (i = 0; i < l; i = i + 1) {
            if (expenses[i].id === id) {
                expense = expenses[i];
                break;
            }
        }
        deferred.resolve(expense);
        return deferred.promise();
    },

    findByName = function (searchKey) {
        var deferred = $.Deferred(),
            results = expenses.filter(function (element) {
                var fullName = element.firstName + " " + element.lastName;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
        console.log(JSON.stringify(results));
        deferred.resolve(results);
        return deferred.promise();
    },

    findByManager = function (managerId) {
        var deferred = $.Deferred(),
            results = expenses.filter(function (element) {
                return managerId === element.managerId;
            });
        deferred.resolve(results);
        return deferred.promise();
    },


    Expense = Backbone.Model.extend({

        initialize: function () {
            this.reports = new ReportsCollection();
            this.reports.parent = this;
        },

        sync: function (method, model, options) {
            if (method === "read") {
                findById(parseInt(this.id)).done(function (data) {
                    options.success(data);
                });
            }
        }

    }),

    ExpenseCollection = Backbone.Collection.extend({

        model: Expense,

        sync: function (method, model, options) {
            if (method === "read") {
                findByName(options.data.name).done(function (data) {
                    options.success(data);
                });
            }
        }

    }),

    ReportsCollection = Backbone.Collection.extend({

        model: Expense,

        sync: function (method, model, options) {
            if (method === "read") {
                findByManager(this.parent.id).done(function (data) {
                    options.success(data);
                });
            }
        }

    });


Backbone.$ = $;

module.exports = {
    Expense: Expense,
    ExpenseCollection: ExpenseCollection,
    ReportsCollection: ReportsCollection
};

