var app = app || {};

app.LibraryView = Backbone.View.extend({

    el: '#books',

    events: {
        'click #add': 'addBook'
    },

    initialize: function( initialBooks ) {
        this.collection = new app.Library( initialBooks );
        this.render();

        this.listenTo( this.collection, 'add', this.renderBook );
    },

    render: function() {
        this.collection.each(function( item ) {
            this.renderBook( item );
        }, this);
    },

    renderBook: function( item ) {
        var bookView = new app.BookView({ model: item });
        this.$el.append( bookView.render().el );
    },

    addBook: function( e ) {
        e.preventDefault();

        var formatData = {};

        $('#addBook div').children('input').each(function(i, el) {
            // el.id is the id attribute of the input, which matches a key in the book model
            if ( $(el).val() !== '' ) formatData[el.id] = $(el).val();
        });
        this.collection.add(new app.Book(formatData) );
    }

});
