import { success, failure } from '../libs/response-lib';

const
	AWS = require('aws-sdk'), // eslint-disable-line import/no-extraneous-dependencies
	dynamoDb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({region:'us-west-1'});

export const create = (event, context, callback) => {
	const cardSlug = event.pathParameters.cardSlug;
	const timestamp = new Date().toISOString();
	const data = JSON.parse(event.body);

	// data.images should look like this ...
	// "images" : {
	// 	"pyramid" : {
	// 		"maxZoomLevel" : 2,
	// 		"TileSize" : 512
	// 	},
	// 	"large" : {
	// 		"height" : 2048,
	// 		"width" : 2048
	// 	}
	// }
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Item: {
			cardSlug, // partition key
			feedSlug: data.feedSlug, // sort key
			discourseLevel: data.discourseLevel,

			name: data.name,
			text: data.text, // array of paragraphs
			author: data.author,
			category: data.category,
			images: data.images, // nested object

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
