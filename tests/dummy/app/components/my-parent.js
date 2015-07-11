import Ember from 'ember';
import ParentComponentSupport from 'ember-composability/mixins/parent-component-support';
import layout from '../templates/components/my-parent';

export default Ember.Component.extend(ParentComponentSupport, {
  classNames: ['bordered-container', 'parent'],
  layout,
  name: 'lolparent'
});
