import Ember from 'ember';
import ParentComponentSupport from 'ember-composability/mixins/parent-component-support';
import layout from '../templates/components/my-parent';
import computed from 'ember-new-computed';

export default Ember.Component.extend(ParentComponentSupport, {
  classNames: ['bordered-container', 'parent'],
  layout,
  name: 'lolparent',

  totalValue: computed('composableChildren.@each.value', {
    get() {
      return this.get('composableChildren')
        .reduce((acc, val) => acc += val.get('value'), 0);
    }
  })
});
