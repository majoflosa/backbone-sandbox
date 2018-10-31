var app = app || {};

app.UserView = Backbone.View.extend({
    tagName: 'div',
    className: 'list-item',
    template: _.template( $('#user-template').html() ),

    render: function() {
        this.$el.html( this.template(this.model.attributes) );
        return this;
    }
});