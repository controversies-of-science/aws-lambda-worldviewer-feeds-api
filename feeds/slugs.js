import { success, failure } from '../libs/response-lib';

const
	AWS = require('aws-sdk'), // eslint-disable-line import/no-extraneous-dependencies
	dynamoDb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({region:'us-west-1'});

export const get = (event, context, callback) => {
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Select: 'SPECIFIC_ATTRIBUTES',
		AttributesToGet: [ 'slug' ]
	};

	dynamoDb.scan(params, (dbError, result) => {
		if (dbError) {
			console.error(dbError);
			callback(null, failure(dbError));
		}

		let slugsArray = [];

		for (let slug of result.Items) {
			slugsArray.push(slug['slug']);
		}

		callback(null, success(slugsArray));
	});
};
