import Ember from 'ember';

const { A, computed, run: { debounce } } = Ember;

export default Ember.Mixin.create({
  _childComponents: null,
  composableChildrenDebounceTime: 0,

  init() {
    this._super(...arguments);
    this.set('_childComponents', new Ember.OrderedSet());
  },

  composableChildren: computed(function() {
    return this.getComposableChildren();
  }).readOnly(),

  getComposableChildren() {
    const comps = this.get('_childComponents');
    return new A(comps && comps.size ? this.get('_childComponents').list : []);
  },

  _fireComposableChildrenChanged() {
    this.propertyDidChange('composableChildren');
  },

  _notifyComposableChildrenChanged() {
    if (this.get('composableChildrenDebounceTime')) {
      debounce(this, this._fireComposableChildrenChanged, this.get('composableChildrenDebounceTime'));
    } else {
      this._fireComposableChildrenChanged();
    }
  },

  registerChildComponent(childComponent) {
    this.get('_childComponents').add(childComponent);
    this._notifyComposableChildrenChanged();
  },

  unregisterChildComponent(childComponent) {
    this.get('_childComponents').delete(childComponent);
    this._notifyComposableChildrenChanged();
  }
});
