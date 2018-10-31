var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#app',

    userTemplate: _.template( $('#user-template').html() ),

    events: {
        'click #add-user': 'handleAddUser'
    },

    initialize: function() {
        this.$userField = this.$('#user-field');
        this.$addUser = this.$('#add-user');
        this.$usersList = this.$('#users-list');

        this.listenTo(app.UsersList, 'add', this.addUser);
    },

    render: function() {
        // this.$el.append( this.userTemplate(this.model.attributes) );
        // console.log()
    },

    handleAddUser: function() {
        var userName = this.$userField.val();
        var newUser = new app.User({name: userName});

        app.UsersList.add( newUser );
        console.log( app.UsersList.models );

    },

    addUser: function( newUser ) {
        var user = new app.UserView({ model: newUser });
        this.$usersList.append( user.render().el );
        this.$userField.val('');
    }
});