var app = app || {};

app.AppView = Backbone.View.extend({

    el: '#todoapp',

    statsTemplate: _.template( $('#stats-template').html() ),

    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
    },

    initialize: function() {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');

        // bind relevant events on TodosCollection
        this.listenTo( app.TodosCollection, 'add', this.addOne );
        this.listenTo( app.TodosCollection, 'reset', this.addAll );
        this.listenTo( app.TodosCollection, 'change:completed', this.filterOne );
        this.listenTo( app.TodosCollection, 'filter', this.filterAll );
        this.listenTo( app.TodosCollection, 'all', this.render );

        app.TodosCollection.fetch();
    },

    render: function() {
        var completed = app.TodosCollection.completed().length;
        var remaining = app.TodosCollection.remaining().length;

        if ( app.TodosCollection.length ) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html( this.statsTemplate({
                completed: completed,
                remaining: remaining
            }) );

            this.$('#filters li a')
                .removeClass('selected')
                .filter('[href="#/' + (app.TodoFilter || '') + '"]')
                .addClass('selected');
        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    },

    // add a single todo item to the list by creating a view for it
    addOne: function( todo ) {
        var view = new app.TodoView({model: todo});
        $('#todo-list').append( view.render().el );
    },

    // add all items in the TodosCollection at once
    addAll: function() {
        this.$('#todo-list').html('');
        // arguments seem in inverted order???
        app.TodosCollection.each( this.addOne, this );
    },

    filterOne: function( todo ) {
        todo.trigger('visible');
    },

    filterAll: function() {
        app.TodosCollection.each(this.filterOne, this);
    },

    // generate the attributes for a new Todo item
    newAttributes: function() {
        return {
            title: this.$input.val().trim(),
            order: app.TodosCollection.nextOrder(),
            completed: false
        };
    },

    createOnEnter: function( event ) {
        if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) return;

        app.TodosCollection.create( this.newAttributes() );
        this.$input.val('');
    },

    clearCompleted: function() {
        _.invoke( app.TodosCollection.completed(), 'destroy' );
        return false;
    },

    toggleAllComplete: function() {
        var completed = this.allCheckbox.checked;

        app.TodosCollection.each( function(todo) {
            todo.save({ 'completed': completed });
        });
    }

});