import type { ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class ResourceGuruOAuth2Api implements ICredentialType {
    name: string;
    displayName: string;
    extends: string[];
    documentationUrl: string;
    properties: INodeProperties[];
}
