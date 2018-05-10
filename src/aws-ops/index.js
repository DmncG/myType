const AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
})

export function allFavorites () {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()
    let params = {
      TableName: 'Favorites'
    }
    docClient.scan(params, (err, data) => {
      if (err) console.error(err)
      else {
        resolve(data.Items)
      }
    })
  })
}

export function putOneFavorite (favorite) {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()
    let params = {
      TableName: 'Favorites',
      Item: {'favoriteID': favorite.id,
        'family': favorite.family
      }
    }

    docClient.put(params, (err, data) => {
      if (err) {
        console.error(`Unable to add item: ${JSON.stringify(err, undefined, 2)}`)
      } else {
        resolve(data)
      }
    })
  })
}

export function deleteOneFavorite (favorite) {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()
    let params = {
      TableName: 'Favorites',
      Key: {
        'favoriteID': favorite.id
      }
    }

    docClient.delete(params, (err, data) => {
      if (err) console.error(err)
      else {
        resolve(data)
      }
    })
  })
}
