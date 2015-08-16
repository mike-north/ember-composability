import Ember from 'ember';

const { assert, computed } = Ember;

export default Ember.Mixin.create({

  init() {
    this._super(...arguments);
    assert('Must define _parentComponentTypes', this.get('_parentComponentTypes'));
    this._registerWithParent();
  },

  willDestroyElement() {
    this._unregisterWithParent();
    this._super(...arguments);
  },

  composableParent: computed(function() {
    return this._componentToRegisterTo();
  }),

  _componentToRegisterTo() {
    let c = null;
    let parentTypes = this.get('_parentComponentTypes');
    for (let i = 0; i < parentTypes.length && !c; i++) {
      c = this.nearestOfType(parentTypes[i]);
    }
    return c;
  },

  shouldRegisterToParent(/*parentComponent*/) {
    return true;
  },

  _registerWithParent() {
    let parentComponent = this._componentToRegisterTo();
    if (parentComponent) {
      if (this.shouldRegisterToParent(parentComponent)) {
        parentComponent.registerChildComponent(this);
      }
      this.set('composableParent', parentComponent);
    }
  },

  _unregisterWithParent() {
    let parentComponent = this._componentToRegisterTo();
    if (parentComponent) {
      parentComponent.unregisterChildComponent(this);
    }
  }
});
