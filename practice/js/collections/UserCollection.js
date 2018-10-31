var app = app || {};

var UsersList = Backbone.Collection.extend({
    model: app.User
});

app.UsersList = new UsersList();