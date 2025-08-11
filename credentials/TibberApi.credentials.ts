import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TibberApi implements ICredentialType {
	name = 'tibberApi';
	displayName = 'Tibber API';
	documentationUrl = 'https://developer.tibber.com/docs/overview';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			default: '',
			required: true,
			description: 'The Tibber API access token obtained from https://developer.tibber.com/',
		},
	];
}