import Ember from 'ember';
import ChildComponentSupport from 'ember-composability/mixins/child-component-support';
import MyParent from './my-parent';
import layout from '../templates/components/my-child';

const { Component } = Ember;

export default Component.extend(ChildComponentSupport, {
  classNames: ['bordered-container', 'child'],
  layout,
  value: 3,
  _parentComponentTypes: [MyParent]
});
