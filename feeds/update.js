import { success, failure } from '../libs/response-lib';

const
	AWS = require('aws-sdk'), // eslint-disable-line import/no-extraneous-dependencies
	dynamoDb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({region:'us-west-1'});

export const update = (event, context, callback) => {
	const
		cardSlug = event.pathParameters.cardSlug,
		feedSlug = event.pathParameters.feedSlug,
		timestamp = new Date().toISOString(),
		data = JSON.parse(event.body);

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
			feedSlug, // sort key

			feedName: data.feedName,
			feedCategories: data.feedCategories, // array
			text: data.text, // array of paragraphs
			feedAuthors: data.feedAuthors, // array
			images: data.images, // nested object
			discourseLevel: data.discourseLevel,
			publishDate: data.publishDate,
			updateDate: data.updateDate,

			timestamp,
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
