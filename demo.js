var Todo = Backbone.Model.extend({
    // default todo attribute values
    defaults: {
        title: '',
        completed: false
    },
    initialize: function() {
        this.on( 'change:title', function(){ 
            console.log('title changed!') 
            // if ( this.validationError ) console.log('validation error: ', this.validationError);
        });
        this.on( 'invalid', function(model, error){
            console.log('An error has occurred on model "' + model.attributes.title + '": ' + error );
            console.log( 'model: ', model );
            return false;
        });
    },
    validate: function(attributes) {
        if ( !attributes.title ) {
            console.log('A title is required!');
            // console.log('validation error: ', this.validationError);
            return 'No title was provided.';
        }
    }
});

var todo1 = new Todo();
console.log( todo1.attributes );
console.log( 'title: ', todo1.get('title') );
console.log( 'completed: ', todo1.get('completed') );

var todo2 = new Todo({ title: 'my title', completed: true });
console.log( todo2.attributes );
console.log( 'title: ', todo2.get('title') );
console.log( 'completed: ', todo2.get('completed') );
console.log( todo2.toJSON() );

var todo3 = new Todo({ title: 'Set through instantiation' });
console.log('Todo3 title: ' + todo3.get('title'));

// todo3.on( 'change:title', function(){ console.log('title changed!') });

todo3.set('title', 'Title set through set() method' );
console.log( todo3.get('title') );


todo3.set({
    title: 'A new title', 
    completed: true
});
console.log( todo3.toJSON() );

todo3.set({title: ''}, {validate: true});
// console.log(todo3.get('validationError') );
// todo3.unset('title', {validate: true});
console.log( todo3.get('title') );


var TodoView = Backbone.View.extend({
    el: '#app',

    todoTemplate: _.template( $('#app-template').html() ),

    events: {
        'click #app-button': 'handleButtonClick'
    },

    initialize: function( options ) {
        this.options = options || {};

        this.$input = this.$('#app-input');
        this.$button = this.$('#app-button');
        this.$todoTitle = this.$('#todo-title');
    },

    render: function() {
        this.$todoTitle.html( this.todoTemplate( this.model.attributes ) );
        return this;
    },

    handleButtonClick: function() {
        var todoTitle = this.$input.val();
        this.model.set({title: todoTitle}, {validate: true});
        this.render();
        console.log( 'model: ', this.model );
    }
});

var todoView = new TodoView({model: todo3});
console.log( 'todo view: ', todoView.el );