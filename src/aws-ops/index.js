const AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
})

export function allFavorites (username) {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()
    let params = {
      TableName: 'Favorites',
      Key: {
        'favoriteID': username.username
      }
    }
    docClient.get(params, (err, data) => {
      if (err) console.error(err)
      else {
        console.log('this is datafromfetchALL', data)
        resolve(data)
      }
    })
  })
}

export function putOneFavorite (favorite) {
  console.log('userCredawsops', favorite.userCred)
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()
    let params = {
      TableName: 'Favorites',
      Key: {
        'favoriteID': favorite.userCred
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

export function deleteOneFavorite (favoriteID, favoriteFamily, favoritesList, username) {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()
    let params = {
      TableName: 'Favorites',
      Key: {
        'favoriteID': username
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

export function createUser (username) {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()

    let params = {
      TableName: 'Favorites',
      Item: {
        'favoriteID': username,
        'f': []
      }
    }
    docClient.put(params, (err, data) => {
      if (err) console.error(err)
      else {
        resolve(data)
      }
    })
  })
}

export function getOneUser (username) {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()

    let params = {
      TableName: 'Favorites',
      Key: {
        'favoriteID': username
      }
    }

    docClient.get(params, (err, data) => {
      if (err) console.error(err)
      else {
        resolve(data)
      }
    })
  })
}
