const AWS = require('aws-sdk')

let paramsProjects = {
  TableName: 'Projects',
  KeySchema: [
    {AttributeName: 'projectID', KeyType: 'HASH'} // partition key
  ],
  AttributeDefinitions: [
    {AttributeName: 'projectID', AttributeType: 'N'}
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

module.exports = paramsProjects
