/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="vite/client" />
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
// declare module '*';
declare module '*.json';
declare module '*.glsl' {
	const value: string;
	export default value;
}
