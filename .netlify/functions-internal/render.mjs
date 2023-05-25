import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["blue-tag-vibrant.png","blue-tag.png","favicon.png","gray-tag.png","green-tag-vibrant.png","green-tag.png","jeep-bg.jpg","jeeps-logo.png","navbar-jeep.png","navbar_icon.png","oblation.png","red-tag-vibrant.png","red-tag.png","yellow-tag-vibrant.png","yellow-tag.png"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.5a79e2a4.js","imports":["_app/immutable/entry/start.5a79e2a4.js","_app/immutable/chunks/index.6a3274fc.js","_app/immutable/chunks/singletons.7aceefbf.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.37665519.js","imports":["_app/immutable/entry/app.37665519.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.6a3274fc.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js'),
			() => import('../server/nodes/3.js'),
			() => import('../server/nodes/4.js'),
			() => import('../server/nodes/5.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/aboutPage",
				pattern: /^\/aboutPage\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/faqPage",
				pattern: /^\/faqPage\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/loginPage",
				pattern: /^\/loginPage\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
