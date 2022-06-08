import type { DisplayObject } from 'pixi.js';

import type { Component } from '../components/Component';

/**
 * Not meant to be used by the library user.
 *
 * Holds the relationships between objects and their registered components.
 *
 * @private
 */
export const componentsMap = new WeakMap<DisplayObject, Component[]>();
