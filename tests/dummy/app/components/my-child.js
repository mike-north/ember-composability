import Ember from 'ember';
import ChildComponentSupport from 'ember-composability/mixins/child-component-support';
import MyParent from './my-parent';
import layout from '../templates/components/my-child';

export default Ember.Component.extend(ChildComponentSupport, {
  classNames: ['bordered-container', 'child'],
  layout,
  _parentComponentTypes: [MyParent]
});
