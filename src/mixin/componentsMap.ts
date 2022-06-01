import type { DisplayObject } from 'pixi.js';

import type { Component } from '@/components/Component';

export const componentsMap = new WeakMap<DisplayObject, Component[]>();
