import { createPinia, defineStore } from 'pinia';
const store = createPinia();

export const useStore = defineStore('main', {
	state: () => {
		return {
			myAge: 18,
		};
	},
	getters: {},
	actions: {
		changeAge() {
			this.myAge++;
		},
	},
});

export default store;
