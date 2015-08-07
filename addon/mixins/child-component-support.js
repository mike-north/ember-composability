import Ember from 'ember';

const { computed, assert, get } = Ember;

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
    let c = null;
    let parentTypes = this.get('_parentComponentTypes');
    for (let i = 0; i < parentTypes.length && !c; i++) {
      c = this.nearestOfType(parentTypes[i]);
    }
    return c;
  }).readOnly(),

  shouldRegisterToParent(/*parentComponent*/) {
    return true;
  },

  _registerWithParent() {
    let parentComponent = get(this, 'composableParent');
    if (parentComponent && this.shouldRegisterToParent(parentComponent)) {
      parentComponent.registerChildComponent(this);
    }
  },

  _unregisterWithParent() {
    let parentComponent = get(this, 'composableParent');
    if (parentComponent) {
      parentComponent.unregisterChildComponent(this);
    }
  }
});
