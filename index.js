module.exports = {
	nodes: [
		{
			packageName: 'n8n-nodes-tibber',
			nodeClass: 'Tibber',
			sourcePath: './dist/src/nodes/Tibber/Tibber.node.js',
		},
	],
	credentials: [
		{
			packageName: 'n8n-nodes-tibber',
			credentialClass: 'TibberApi',
			sourcePath: './dist/src/credentials/TibberApi.credentials.js',
		},
	],
};
