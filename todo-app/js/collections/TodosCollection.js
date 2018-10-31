var app = app || {};

var TodosCollection = Backbone.Collection.extend({
    model: app.TodoModel,

    // save all todo items under the "todos-backbone" namespace
    localStorage: new Backbone.LocalStorage('todo-collection'),

    // filter down the list of all todo items that are completed
    completed: function() {
        return this.filter( function(todo) {
            return todo.get('completed');
        });
    },

    // filter down the list to only todo items that are not finished
    remaining: function() {
        return this.without.apply(this, this.completed() );
    },

    // keep the todos in order
    nextOrder: function() {
        if ( !this.length ) return 1;
        return this.last().get('order') + 1;
    },

    // todos are sorted by their original insertion order
    comparator: function( todo ) {
        return todo.get('order');
    }
});

app.TodosCollection = new TodosCollection();