import Component from '@ember/component';
import ChildComponentSupport from 'ember-composability/mixins/child-component-support';
import MyParent from './my-parent';
import layout from '../templates/components/my-child';

export default Component.extend(ChildComponentSupport, {
  classNames: ['bordered-container', 'child'],
  layout,
  value: 3,
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  _parentComponentTypes: [MyParent]
});
