import Component from '@ember/component';
import { computed } from '@ember/object';
import ParentComponentSupport from 'ember-composability/mixins/parent-component-support';
import layout from '../templates/components/my-parent';

export default Component.extend(ParentComponentSupport, {
  classNames: ['bordered-container', 'parent'],
  composableChildrenDebounceTime: 1,
  layout,
  name: 'lolparent',

  totalValue: computed('composableChildren.@each.value', function() {
    return this.get('composableChildren').reduce((acc, val) => acc += val.get('value'), 0);
  })
});
