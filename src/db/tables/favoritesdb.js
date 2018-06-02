const AWS = require('aws-sdk')

let paramsFavorites = {
  TableName: 'Favorites',
  KeySchema: [
    {AttributeName: 'favoriteID', KeyType: 'HASH'} // partition key
  ],
  AttributeDefinitions: [
    {AttributeName: 'favoriteID', AttributeType: 'S'}
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

module.exports = paramsFavorites
