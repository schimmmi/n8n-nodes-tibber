// Add missing type declarations

// For graphql-request
declare module 'graphql-request' {
  export class GraphQLClient {
    constructor(url: string, options?: any);
    request<T = any>(query: string, variables?: any): Promise<T>;
    setHeaders(headers: Record<string, string>): this;
  }
}

// For n8n-workflow missing types
declare module 'n8n-workflow' {
  export type NodeConnectionType = 'main';
  
  // Core interfaces
  export interface INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
  }
  
  export interface INodeTypeDescription {
    displayName: string;
    name: string;
    icon?: string;
    group: string[];
    version: number;
    subtitle?: string;
    description?: string;
    defaults: {
      name: string;
    };
    inputs: string[];
    outputs: string[];
    credentials?: INodeCredentialDescription[];
    properties: INodeProperties[];
  }
  
  export interface INodeCredentialDescription {
    name: string;
    required?: boolean;
  }
  
  export interface INodeProperties {
    displayName: string;
    name: string;
    type: string;
    default?: any;
    description?: string;
    required?: boolean;
    noDataExpression?: boolean;
    displayOptions?: IDisplayOptions;
    options?: Array<INodePropertyOptions>;
  }
  
  export interface INodePropertyOptions {
    name: string;
    value: string | number | boolean;
    description?: string;
    action?: string;
  }
  
  export interface IDisplayOptions {
    show?: {
      [key: string]: any[];
    };
    hide?: {
      [key: string]: any[];
    };
  }
  
  export interface INodeExecutionData {
    json: any;
    pairedItem?: number;
  }
  
  export interface IExecuteFunctions {
    getCredentials(type: string): Promise<ICredentialDataDecryptedObject>;
    getInputData(): INodeExecutionData[];
    getNode(): INode;
    getNodeParameter(parameterName: string, itemIndex: number): any;
  }
  
  export interface INode {
    name: string;
    type: string;
    parameters: any;
  }
  
  export interface ICredentialDataDecryptedObject {
    [key: string]: any;
  }
  
  export class NodeOperationError extends Error {
    constructor(node: INode, message: string);
  }
  
  // Credential interfaces
  export interface ICredentialType {
    name: string;
    displayName: string;
    documentationUrl?: string;
    properties: INodeProperties[];
  }
  
  // Node type data for registration
  export interface INodeTypeData {
    [key: string]: {
      sourcePath: string;
      type: INodeType;
    };
  }
}

// For missing DOM types in Node.js environment
interface HeadersInit {
  [key: string]: string;
}