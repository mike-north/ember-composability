import Ember from 'ember';
import ParentComponentSupport from 'ember-composability/mixins/parent-component-support';
import layout from '../templates/components/my-parent';

const { Component, computed } = Ember;

export default Component.extend(ParentComponentSupport, {
  classNames: ['bordered-container', 'parent'],
  composableChildrenDebounceTime: 1,
  layout,
  name: 'lolparent',

  totalValue: computed('composableChildren.@each.value', function() {
    return this.get('composableChildren').reduce((acc, val) => acc += val.get('value'), 0);
  })
});
