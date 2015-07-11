import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

let application;

module('Acceptance | index', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /index', assert => {
  visit('/');

  andThen(function() {
    // Block form, parent with children yielded
    assert.equal(currentURL(), '/');
    assert.equal(find('.block-children .num-child-components')[0].innerText, '3', 'Correct number of child components registered with parent');
    assert.equal(find('.block-children .child .parent-name')[0].innerText.trim(), 'lolparent', 'Child component can access parent properties');

    // Child alone
    assert.equal(find('.child-alone')[0].innerText.trim(), 'child', 'Child component renders alone');
    assert.equal(find('.child-alone .child .parent-name')[0].innerText.trim(), '', 'Child component parent properties are empty');
  });
});
