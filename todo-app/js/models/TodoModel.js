var app = app || {};

app.TodoModel = Backbone.Model.extend({

    defaults: {
        title: '',
        completed: false
    },

    // completed status is set and simultaneously persisted
    toggle: function() {
        this.save({ completed: !this.get('completed') });
    }

});