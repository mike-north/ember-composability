import { A } from '@ember/array';
import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { debounce } from '@ember/runloop';
import OrderedSet from '@ember/ordered-set';

export default Mixin.create({
  _childComponents: null,
  composableChildrenDebounceTime: 0,

  init() {
    this._super(...arguments);
    this.set('_childComponents', new OrderedSet());
  },

  composableChildren: computed(function() {
    return this.getComposableChildren();
  }).readOnly(),

  getComposableChildren() {
    let comps = this.get('_childComponents');
    return new A(comps && comps.size ? this.get('_childComponents').list : []);
  },

  _fireComposableChildrenChanged() {
    if (typeof this.notifyPropertyChange === 'function') {
      this.notifyPropertyChange('composableChildren');
    }
    else if (typeof this.propertyDidChange === 'function') {
      // Deprecated in ember 3.1
      this.propertyDidChange('composableChildren');
    }
    else {
      throw new Error('Unable to call notifyPropertyChange');
    }
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
