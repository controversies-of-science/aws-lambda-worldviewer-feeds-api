# Controversies of Science API

The Controversies of Science site will need at least four managed resources:

- Controversy Cards
- Controversy Card Feeds
- Rankings
- Site Users

The controversy cards are adapted from the G+ collection [here](https://plus.google.com/collection/Yhn4Y).  Both the cards and the attached feeds are essentially social media postings, but the difference is that the feeds are subtopics for the larger card topics.

## State of the Project

The API has all of the functionality that I'm going to need.  Access is now restricted by IAM policy.

## Endpoints

### Create a New Feed

> curl -X POST https://wu7nsd6i3a.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp --data '{ "feedSlug": "test-feed", "feedName": "This is a Test", "feedCategory": "ongoing", "text": [ "one", "two", "three" ], "feedAuthor": "worldviewer", "images": { "pyramid": { "maxZoomLevel": 2, "TileSize": 512 }, "large": { "height": 2048, "width": 2048 } }, "discourseLevel": "narrative" }'

### Get a Specific Feed for a Particular Controversy

> curl https://wu7nsd6i3a.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp/test-feed

### Get All Feed Card Slugs for a Particular Controversy

> curl https://wu7nsd6i3a.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp

### Delete a Feed Card

> curl -X DELETE https://wu7nsd6i3a.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp/test-feed

### Update a Feed Card

> curl -X PUT https://wu7nsd6i3a.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp/test-feed --data '{ "feedSlug": "test-feed", "feedName": "This is an Updated Feed Card", "feedCategory": "ongoing", "text": [ "one", "two", "three" ], "feedAuthor": "worldviewer", "images": { "pyramid": { "maxZoomLevel": 2, "TileSize": 512 }, "large": { "height": 2048, "width": 2048 } }, "discourseLevel": "narrative" }'
