import { INodeTypeData } from 'n8n-workflow';

import { TibberNode } from './nodes/Tibber/Tibber.node';
import { TibberApi } from './credentials/TibberApi.credentials';

// Export the nodes and credentials for n8n to find
export const nodeTypes: INodeTypeData = {
	TibberNode: {
		sourcePath: __filename,
		type: new TibberNode(),
	},
};

export const credentialTypes = {
	TibberApi: {
		sourcePath: __filename,
		type: new TibberApi(),
	},
};