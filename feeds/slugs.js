import { success, failure } from '../libs/response-lib';

const
	AWS = require('aws-sdk'), // eslint-disable-line import/no-extraneous-dependencies
	dynamoDb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({region:'us-west-1'});

export const get = (event, context, callback) => {
	const cardSlug = event.pathParameters.cardSlug;

	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		ScanFilter: {
			cardSlug: {
				ComparisonOperator: 'EQ',
				AttributeValueList: [cardSlug]
			}
		},
		Select: 'SPECIFIC_ATTRIBUTES',
		AttributesToGet: [ 'feedSlug', 'feedName', 'discourseLevel' ]
	};

	dynamoDb.scan(params, (dbError, result) => {
		if (dbError) {
			console.error(dbError);
			callback(null, failure(dbError));
		}

		let feedArray = [];

		for (let feed of result.Items) {
			feedArray.push({
				slug: feed['feedSlug'],
				title: feed['feedName'],
				level: feed['discourseLevel']
			});
		}

		callback(null, success(feedArray));
	});
};
