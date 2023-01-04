import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/main',
	},
	{
		path: '/main',
		component: () => import('@/views/MainDs.vue'),
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});
export default router;
