import Ember from 'ember';
import resolver from './helpers/resolver';

import {
  setResolver
} from 'ember-qunit';

Ember.ENV.RAISE_ON_DEPRECATION = true;

setResolver(resolver);
