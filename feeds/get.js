import { success, failure } from '../libs/response-lib';

const
	AWS = require('aws-sdk'), // eslint-disable-line import/no-extraneous-dependencies
	dynamoDb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({region:'us-west-1'});

export const get = (event, context, callback) => {
	const slug = event.pathParameters.slug;

	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Key: {
			slug
		}
	};

	dynamoDb.get(params, (dbError, result) => {
		if (dbError) {
			console.error(dbError);
			callback(null, failure(dbError));
		}

		callback(null, success(result.Item));
	});
};
