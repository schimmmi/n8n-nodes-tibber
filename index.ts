module.exports = {
	nodes: [
		{
			packageName: 'n8n-nodes-tibber',
			nodeClass: 'TibberNode',
			sourcePath: './dist/nodes/Tibber/Tibber.node.js',
		},
	],
	credentials: [
		{
			packageName: 'n8n-nodes-tibber',
			credentialClass: 'TibberApi',
			sourcePath: './dist/credentials/TibberApi.credentials.js',
		},
	],
};