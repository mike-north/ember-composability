# ember-composability

Composability-oriented tools for Ember.js apps

## Composable components

The `child-component-support` and `parent-component-support` mixins can be used for parents and children that need aware ness and/or access to each other

**Parent**

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

**Child**
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

Then, you can render parents and children together in block form

````handlebars
{{#my-parent}}
  {{my-child}}
  {{my-child}}
  {{my-child}}
{{/my-parent}}

````

parents can have access to child properties
**app/components/my-parent.js**
```javascript

total: computed('composableChildren.@each.value', {
  get() {

    let tot = 0;
    this.get('composableChildren').forEach(child => {
      tot += child.get('value');
    });
    return tot;
  }
})

```

and children can have access to parent properties
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
