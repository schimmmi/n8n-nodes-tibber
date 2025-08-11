import {
	IExecuteFunctions,
    NodeConnectionType,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { GraphQLClient } from 'graphql-request';

export class TibberNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tibber',
		name: 'tibber',
		icon: 'file:tibber.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Tibber API',
		defaults: {
			name: 'Tibber',
		},
		// n8n node connection types
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'tibberApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Home',
						value: 'home',
					},
				],
				default: 'home',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'home',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get home data',
						action: 'Get home data',
					},
					{
						name: 'Get Consumption',
						value: 'getConsumption',
						description: 'Get consumption data',
						action: 'Get consumption data',
					},
					{
						name: 'Get Price',
						value: 'getPrice',
						description: 'Get price information',
						action: 'Get price information',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Home ID',
				name: 'homeId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'home',
						],
						operation: [
							'getConsumption',
							'getPrice',
						],
					},
				},
				description: 'The ID of the home to get data for',
			},
			{
				displayName: 'Resolution',
				name: 'resolution',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'home',
						],
						operation: [
							'getConsumption',
						],
					},
				},
				options: [
					{
						name: 'Hourly',
						value: 'HOURLY',
					},
					{
						name: 'Daily',
						value: 'DAILY',
					},
					{
						name: 'Weekly',
						value: 'WEEKLY',
					},
					{
						name: 'Monthly',
						value: 'MONTHLY',
					},
					{
						name: 'Annual',
						value: 'ANNUAL',
					},
				],
				default: 'HOURLY',
				description: 'The resolution of consumption data',
			},
			{
				displayName: 'Last N Hours',
				name: 'lastHours',
				type: 'number',
				displayOptions: {
					show: {
						resource: [
							'home',
						],
						operation: [
							'getConsumption',
						],
						resolution: [
							'HOURLY',
						],
					},
				},
				default: 24,
				description: 'Get consumption data for the last N hours',
			},
			{
				displayName: 'Last N Days',
				name: 'lastDays',
				type: 'number',
				displayOptions: {
					show: {
						resource: [
							'home',
						],
						operation: [
							'getConsumption',
						],
						resolution: [
							'DAILY',
						],
					},
				},
				default: 7,
				description: 'Get consumption data for the last N days',
			},
			{
				displayName: 'Last N Weeks',
				name: 'lastWeeks',
				type: 'number',
				displayOptions: {
					show: {
						resource: [
							'home',
						],
						operation: [
							'getConsumption',
						],
						resolution: [
							'WEEKLY',
						],
					},
				},
				default: 4,
				description: 'Get consumption data for the last N weeks',
			},
			{
				displayName: 'Last N Months',
				name: 'lastMonths',
				type: 'number',
				displayOptions: {
					show: {
						resource: [
							'home',
						],
						operation: [
							'getConsumption',
						],
						resolution: [
							'MONTHLY',
						],
					},
				},
				default: 12,
				description: 'Get consumption data for the last N months',
			},
			{
				displayName: 'Last N Years',
				name: 'lastYears',
				type: 'number',
				displayOptions: {
					show: {
						resource: [
							'home',
						],
						operation: [
							'getConsumption',
						],
						resolution: [
							'ANNUAL',
						],
					},
				},
				default: 3,
				description: 'Get consumption data for the last N years',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		
		// Get credentials
		const credentials = await this.getCredentials('tibberApi');
		const apiToken = credentials.apiToken as string;
		
        // type-only import works under CJS, it erases at runtime
        import type { GraphQLClient as GraphQLClientType } from 'graphql-request';

        // later, after dynamic import:
        const { GraphQLClient, gql } = await import('graphql-request');
        const client: GraphQLClientType = new GraphQLClient(endpoint, { headers: { Authorization: `Bearer ${apiToken}` } });
		try {
			// Execute operations based on resource and operation
			if (resource === 'home') {
				if (operation === 'get') {
					// Get homes data
					const query = `
						{
							viewer {
								homes {
									id
									address {
										address1
										address2
										address3
										city
										postalCode
										country
										latitude
										longitude
									}
									appNickname
									size
									type
									primaryHeatingSource
									hasVentilationSystem
									timeZone
									meteringPointData {
										consumptionEan
										gridCompany
										gridAreaCode
										priceAreaCode
										productionEan
									}
									owner {
										id
										firstName
										lastName
										contactInfo {
											email
											mobile
										}
									}
									features {
										realTimeConsumptionEnabled
									}
									currentSubscription {
										id
										status
										validFrom
										validTo
										statusReason
									}
								}
							}
						}
					`;

					interface TibberHomeResponse {
						viewer: {
							homes: Array<{
								id: string;
								address: {
									address1: string;
									address2?: string;
									address3?: string;
									city: string;
									postalCode: string;
									country: string;
									latitude: number;
									longitude: number;
								};
								appNickname?: string;
								size?: number;
								type?: string;
								primaryHeatingSource?: string;
								hasVentilationSystem?: boolean;
								timeZone: string;
								meteringPointData: {
									consumptionEan: string;
									gridCompany: string;
									gridAreaCode: string;
									priceAreaCode: string;
									productionEan?: string;
								};
								owner: {
									id: string;
									firstName: string;
									lastName: string;
									contactInfo: {
										email: string;
										mobile?: string;
									};
								};
								features: {
									realTimeConsumptionEnabled: boolean;
								};
								currentSubscription: {
									id: string;
									status: string;
									validFrom: string;
									validTo?: string;
									statusReason?: string;
								};
							}>;
						};
					}

					const response = await client.request<TibberHomeResponse>(query);
					
					// Return all homes data
					for (const home of response.viewer.homes) {
						returnData.push({
							json: home,
							pairedItem: 0,
						});
					}
				} else if (operation === 'getConsumption') {
					const homeId = this.getNodeParameter('homeId', 0) as string;
					const resolution = this.getNodeParameter('resolution', 0) as string;
					
					let lastN: number;
					let lastField = 'hours'; // Default value
					
					// Set the appropriate last field based on resolution
					if (resolution === 'HOURLY') {
						lastN = this.getNodeParameter('lastHours', 0) as number;
						lastField = 'hours';
					} else if (resolution === 'DAILY') {
						lastN = this.getNodeParameter('lastDays', 0) as number;
						lastField = 'days';
					} else if (resolution === 'WEEKLY') {
						lastN = this.getNodeParameter('lastWeeks', 0) as number;
						lastField = 'weeks';
					} else if (resolution === 'MONTHLY') {
						lastN = this.getNodeParameter('lastMonths', 0) as number;
						lastField = 'months';
					} else if (resolution === 'ANNUAL') {
						lastN = this.getNodeParameter('lastYears', 0) as number;
						lastField = 'years';
					} else {
						// Fallback
						lastN = 24;
					}
					
					const query = `
						{
							viewer {
								home(id: "${homeId}") {
									consumption(resolution: ${resolution}, last: ${lastN}) {
										nodes {
											from
											to
											cost
											unitPrice
											unitPriceVAT
											consumption
											consumptionUnit
										}
									}
								}
							}
						}
					`;
					
					interface TibberConsumptionResponse {
						viewer: {
							home: {
								consumption: {
									nodes: Array<{
										from: string;
										to: string;
										cost: number;
										unitPrice: number;
										unitPriceVAT: number;
										consumption: number;
										consumptionUnit: string;
									}>;
								};
							} | null;
						};
					}
					
					const response = await client.request<TibberConsumptionResponse>(query);
					
					if (response.viewer.home) {
						const consumptionData = {
							homeId,
							resolution,
							[`last${lastField.charAt(0).toUpperCase() + lastField.slice(1)}`]: lastN,
							consumption: response.viewer.home.consumption.nodes,
						};
						
						returnData.push({
							json: consumptionData,
							pairedItem: 0,
						});
					} else {
						throw new NodeOperationError(this.getNode(), `Home with ID ${homeId} not found`);
					}
				} else if (operation === 'getPrice') {
					const homeId = this.getNodeParameter('homeId', 0) as string;
					
					const query = `
						{
							viewer {
								home(id: "${homeId}") {
									currentSubscription {
										priceInfo {
											current {
												total
												energy
												tax
												startsAt
												level
												currency
											}
											today {
												total
												energy
												tax
												startsAt
												level
												currency
											}
											tomorrow {
												total
												energy
												tax
												startsAt
												level
												currency
											}
										}
									}
								}
							}
						}
					`;
					
					interface PriceInfo {
						total: number;
						energy: number;
						tax: number;
						startsAt: string;
						level: string;
						currency: string;
					}
					
					interface TibberPriceResponse {
						viewer: {
							home: {
								currentSubscription: {
									priceInfo: {
										current: PriceInfo;
										today: PriceInfo[];
										tomorrow?: PriceInfo[];
									};
								};
							} | null;
						};
					}
					
					const response = await client.request<TibberPriceResponse>(query);
					
					if (response.viewer.home) {
						const priceData = {
							homeId,
							priceInfo: response.viewer.home.currentSubscription.priceInfo,
						};
						
						returnData.push({
							json: priceData,
							pairedItem: 0,
						});
					} else {
						throw new NodeOperationError(this.getNode(), `Home with ID ${homeId} not found`);
					}
				}
			}
			
			return [returnData];
		} catch (error) {
			// Handle GraphQL errors
			if (error instanceof Error) {
				const errorObject = error as Error & { response?: { errors?: Array<{ message: string }> } };
				if (errorObject.response?.errors?.[0]?.message) {
					throw new NodeOperationError(
						this.getNode(),
						`Tibber API error: ${errorObject.response.errors[0].message}`
					);
				}
				throw new NodeOperationError(this.getNode(), errorObject.message);
			}
			throw new NodeOperationError(this.getNode(), 'An unknown error occurred');
		}
	}
}