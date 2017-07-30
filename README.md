# Controversies of Science API

The Controversies of Science site will need at least four managed resources:

- Controversy Cards
- Controversy Card Feeds
- Rankings
- Site Users

The controversy cards are adapted from the G+ collection [here](https://plus.google.com/collection/Yhn4Y).  Both the cards and the attached feeds are essentially social media postings, but the difference is that the feeds are subtopics for the larger card topics.

## State of the Project

The API has all of the functionality that I'm going to need, but I'm still adding in validations and security.

## Endpoints

### Create a New Feed

> curl -X POST https://nz2t3hld20.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp --data '{ "feedSlug": "test-feed", "name": "This is a Test",  "category": "ongoing", "text": [ "one", "two", "three" ], "posted": "https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/HrBYGqWXFwY", "author": "worldviewer", "images": { "pyramid": { "maxZoomLevel": 2, "TileSize": 512 }, "large": { "height": 2048, "width": 2048 } } }'

### Get a Specific Feed for a Particular Controversy

> curl https://nz2t3hld20.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp/test-feed

### Get All Feed Card Slugs for a Particular Controversy

> curl https://nz2t3hld20.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp

### Delete a Feed Card

> curl -X DELETE https://nz2t3hld20.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp/test-feed

### Update a Feed Card

> curl -X PUT https://nz2t3hld20.execute-api.us-west-1.amazonaws.com/prod/feeds/halton-arp/test-feed --data '{ "name": "This is an Updated Name for this Feed Card",  "category": "ongoing", "text": [ "one", "two", "three" ], "posted": "https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/HrBYGqWXFwY", "author": "worldviewer", "images": { "pyramid": { "maxZoomLevel": 2, "TileSize": 512 }, "large": { "height": 2048, "width": 2048 } } }'
