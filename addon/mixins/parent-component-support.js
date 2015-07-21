import Ember from 'ember';

const { computed: { alias } } = Ember;

export default Ember.Mixin.create({
  _childComponents: null,

  init() {
    this._super(...arguments);
    this.set('_childComponents', Ember.A([]));
  },

  composableChildren: alias('_childComponents'),

  registerChildComponent(childComponent) {
    this.get('_childComponents').addObject(childComponent);
  },

  unregisterChildComponent(childComponent) {
    this.get('_childComponents').removeObject(childComponent);
  }
});
