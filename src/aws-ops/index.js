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
      TableName: 'Favorites',
      Key: {
        'favoriteID': 12345
      }
    }
    docClient.get(params, (err, data) => {
      if (err) console.error(err)
      else {
        console.log('this is datafromfetchALL', data)
        resolve(data.Item.f)
      }
    })
  })
}

export function putOneFavorite (favorite) {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()
    let params = {
      TableName: 'Favorites',
      Key: {
        'favoriteID': 12345
      },
      UpdateExpression: 'SET #f = list_append(#f, :fam)',
      ExpressionAttributeNames: {
        '#f': 'f'
      },
      ExpressionAttributeValues: {
        ':fam': [{'fID': favorite.id, 'fam': favorite.family}]
      },
      ReturnValues: 'UPDATED_NEW'
      // Item: {'favoriteID': favorite.id,
      //   'family': favorite.family
      // }
    }

    docClient.update(params, (err, data) => {
      if (err) {
        console.error(`Unable to add item: ${JSON.stringify(err, undefined, 2)}`)
      } else {
        console.log('data from awsops', data)
        resolve(data)
      }
    })
  })
}

export function deleteOneFavorite (favoriteID, favoriteFamily, favoritesList) {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()
    let params = {
      TableName: 'Favorites',
      Key: {
        'favoriteID': 12345
      },
      UpdateExpression: `REMOVE f[${favoritesList.indexOf(favoriteFamily)}]`,
      ReturnValues: 'UPDATED_NEW'
      // ExpressionAttributeValues: {
      //   ':font': favoriteFamily
      // }
    }

    docClient.update(params, (err, data) => {
      if (err) console.error(err)
      else {
        resolve(data)
      }
    })
  })
}
