import { module, test } from 'qunit';
import { visit, currentURL, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /index', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    // Block form, parent with children yielded
    assert.equal(currentURL(), '/');
    assert.equal(
      findAll('.block-children .num-child-components')[0].innerText,
      '3',
      'Correct number of child components registered with parent'
    );
    assert.equal(
      findAll('.block-children .child .parent-name')[0].innerText.trim(),
      'lolparent',
      'Child component can access parent properties'
    );

    // Child alone
    assert.equal(
      findAll('.child-alone')[0].innerText.trim(),
      'child',
      'Child component renders alone'
    );
    assert.equal(
      findAll('.child-alone .child .parent-name')[0].innerText.trim(),
      '',
      'Child component parent properties are empty'
    );
  });
});
