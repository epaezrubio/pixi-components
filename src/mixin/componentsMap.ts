import type { DisplayObject } from '@pixi/display';

import type { Component } from '../components/Component';

export const componentsMap = new WeakMap<DisplayObject, Component[]>();
