import { success, failure } from '../libs/response-lib';

const
	AWS = require('aws-sdk'), // eslint-disable-line import/no-extraneous-dependencies
	dynamoDb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({region:'us-west-1'});

export const update = (event, context, callback) => {
	const slug = event.pathParameters.slug;
	const timestamp = new Date().toISOString();
	const data = JSON.parse(event.body);

	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Item: {
			slug: data.slug, // partition key

			name: data.name,
			text: data.text, // array of paragraphs
			summary: data.summary,
			author: data.author,
			original: data.original,
			category: data.category,

			timestamp,
			posted: data.posted
		},
	};

	dynamoDb.put(params, (dbError) => {
		if (dbError) {
			console.error(dbError);
			callback(null, failure(dbError));
		} else {
			callback(null, success(params.Item));
		}
	});
};
