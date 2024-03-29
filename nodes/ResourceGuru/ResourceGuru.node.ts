import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ResourceGuru implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Resource Guru',
		name: 'resourceGuru',
		icon: 'file:resourceguru.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get and Set information in Resource Guru',
		defaults: {
			name: 'Resource Guru',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'resourceGuruOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: `={{"https://api.resourceguruapp.com/v1/" + $credentials["accountId"]}}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			qs: {
				limit: 0,
			},
		},
		//
		properties: [
			// Resources and operations will go here
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Client',
						value: 'client',
					},
				],
				default: 'project',
			},
			// Operations will go here
			// Projects
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['project'],
					},
				},
				options: [
					{
						name: 'Archive',
						value: 'archive',
						action: 'Archive a project',
						description: 'Archive a Project',
						routing: {
							request: {
								method: 'PUT',
								url: '=/projects/{{$parameter.projectId}}',
								body: {
									archived: true,
								},
							},
						},
					},
					{
						name: 'Create',
						value: 'create',
						action: 'Create a project',
						description: 'Create a Project',
						routing: {
							request: {
								method: 'POST',
								url: '/projects',
								body: {
									name: '={{$parameter.name}}',
									project_code: '={{$parameter.projectCode}}',
									client_id: '={{$parameter.projectClientId}}',
									notes: '={{$parameter.notes}}',
								},
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get all projects',
						description: 'Get All Projects',
						routing: {
							request: {
								method: 'GET',
								url: '/projects',
								qs: {
									includeArchived: '1',
								},
							},
						},
					},
					{
						name: 'Get Active',
						value: 'getActive',
						action: 'Get active projects',
						description: 'Get Active Projects',
						routing: {
							request: {
								method: 'GET',
								url: '/projects',
							},
						},
					},
					{
						name: 'Get Archived',
						value: 'getArchived',
						action: 'Get archived projects',
						description: 'Get Archived Projects',
						routing: {
							request: {
								method: 'GET',
								url: '/projects/archived',
							},
						},
					},
					{
						name: 'Unarchive',
						value: 'unarchive',
						action: 'Unarchive a project',
						description: 'Unarchive a Project',
						routing: {
							request: {
								method: 'PUT',
								url: '=/projects/{{$parameter.projectId}}',
								body: {
									archived: false,
								},
							},
						},
					},
				],
				default: 'getActive',
			},

			// Clients
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['client'],
					},
				},
				options: [
					{
						name: 'Archive',
						value: 'archive',
						action: 'Archive a client',
						description: 'Archive a Client',
						routing: {
							request: {
								method: 'PUT',
								url: '={{"/clients/" + $parameter.clientId}}',
								body: {
									archived: true,
								},
							},
						},
					},
					{
						name: 'Create',
						value: 'create',
						action: 'Create a client',
						description: 'Create a Client',
						routing: {
							request: {
								method: 'POST',
								url: '/clients',
								body: {
									name: '={{$parameter.name}}',
									notes: '={{$parameter.notes}}',
								},
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get all clients',
						description: 'Get All Clients',
						routing: {
							request: {
								method: 'GET',
								url: '/clients',
								qs: {
									includeArchived: '1',
								},
							},
						},
					},
					{
						name: 'Get Active',
						value: 'getActive',
						action: 'Get active clients',
						description: 'Get Active Clients',
						routing: {
							request: {
								method: 'GET',
								url: '/clients',
							},
						},
					},
					{
						name: 'Get Archived',
						value: 'getArchived',
						action: 'Get archived clients',
						description: 'Get Archived Clients',
						routing: {
							request: {
								method: 'GET',
								url: '/clients/archived',
							},
						},
					},
					{
						name: 'Unarchive',
						value: 'unarchive',
						action: 'Unarchive a client',
						description: 'Unarchive a Client',
						routing: {
							request: {
								method: 'PUT',
								url: '=/clients/{{$parameter.clientId}}',
								body: {
									archived: false,
								},
							},
						},
					},
				],
				default: 'getActive',
			},

			// Optional/additional fields will go here
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				required: true,
				placeholder: 'Project ID',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['archive', 'unarchive'],
					},
				},
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				placeholder: 'Name',
				displayOptions: {
					show: {
						resource: ['project', 'client'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Project Code',
				name: 'projectCode',
				type: 'string',
				placeholder: 'Project Code',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'number',
				required: true,
				placeholder: 'Client ID',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['archive', 'unarchive'],
					},
				},
				default: '',
			},
			{
				displayName: 'Client ID',
				name: 'projectClientId',
				type: 'number',
				required: true,
				placeholder: 'Client ID',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create'],
					},
				},
				default: '',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				placeholder: 'Notes',
				displayOptions: {
					show: {
						resource: ['project', 'client'],
						operation: ['create'],
					},
				},
				default: '',
			},
			//
			//
		],
	};
}
