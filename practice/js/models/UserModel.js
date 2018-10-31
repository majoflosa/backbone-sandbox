var app = app || {};

app.User = Backbone.Model.extend({
    defaults: {
        name: '',
        isMember: false
    },

    validate: function( attributes ) {
        if ( !attributes.name ) {
            return 'Name is required.';
        }
    },

    initialize: function() {
        this.on( 'invalid', function(model, error){
            alert( 'Action could not be completed: ', error );
        });
    },

    setName: function( name ) {
        this.set( 'name', name, {validate: true} );
    }
});