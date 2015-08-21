# ember-composability

[![Build Status](https://travis-ci.org/mike-north/ember-composability.svg?branch=master)](https://travis-ci.org/mike-north/ember-composability)
[![Dependency Status](https://david-dm.org/mike-north/ember-composability.svg)](https://david-dm.org/mike-north/ember-composability)
[![devDependency Status](https://david-dm.org/mike-north/ember-composability/dev-status.svg)](https://david-dm.org/mike-north/ember-composability#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/mike-north/ember-composability/badges/gpa.svg)](https://codeclimate.com/github/mike-north/ember-composability)
[![npm version](https://badge.fury.io/js/ember-composability.svg)](http://badge.fury.io/js/ember-composability)
[![Ember Observer Score](http://emberobserver.com/badges/ember-composability.svg)](http://emberobserver.com/addons/ember-composability)

Composability-oriented tools for Ember.js apps

## Composable components

The `child-component-support` and `parent-component-support` mixins can be used for parents and children that need aware ness and/or access to each other

For example, you may want to expressively declare some parent/child components like this

````handlebars
{{#my-parent}}
  {{my-child}}
  {{my-child}}
  {{my-child}}
{{/my-parent}}

````

#### Parent

**app/components/my-parent.js**

````js
import Ember from 'ember';
import ParentComponentSupport from 'ember-composability/mixins/parent-component-support';
import layout from '../templates/components/my-parent';

export default Ember.Component.extend(ParentComponentSupport, {
  name: 'mike',
  layout
});

````

parents can have access to child properties, via the `composableChildren` property

**app/components/my-parent.js**

```javascript

  totalValue: computed('composableChildren.@each.value', {
    get() {
      return this.get('composableChildren')
        .reduce((acc, val) => acc += val.get('value'), 0);
    }
  })

```

#### Child

**app/components/my-child.js**

````js
import Ember from 'ember';
import ChildComponentSupport from 'ember-composability/mixins/child-component-support';
import MyParent from './my-parent';
import layout from '../templates/components/my-child';

export default Ember.Component.extend(ChildComponentSupport, {
  value: 3,
  layout,
  _parentComponentTypes: [MyParent]
});

````

children can have access to parent properties via the `composableParent` property

**app/templates/components/my-child.hbs**

```handlebars
  {{composableParent.name}}

```


## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

![Analytics](https://ga-beacon.appspot.com/UA-66610985-1/mike-north/ember-composability/readme)
