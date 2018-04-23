const AWS = require('aws-sdk')
// const fontsdb = require('./tables/fontsdb')
const projectsdb = require('./tables/projectsdb')
AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
})

let dynamodb = new AWS.DynamoDB()
let docClient = new AWS.DynamoDB.DocumentClient()

let createProjects = () => {
  dynamodb.createTable(projectsdb, function (err, data) {
    if (err) {
      console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
    }
  })
}

// create sample data

let createSample = () => {
  let categories = ['serif', 'sans-serif']
  let variants = ['bold', 'italic', 'regular']

  let getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  for (let i = 1; i <= 5; i++) {
    let params = {
      TableName: 'Projects',
      Item: {
        'projectID': i,
        'fonts': {'family': 'Montserrat',
          'category': categories[getRandomIntInclusive(0, categories.length - 1)],
          'variants': variants[getRandomIntInclusive(0, variants.length - 1)] }
      }
    }

    docClient.put(params, (err, data) => {
      if (err) console.error(err)
      else {
        return data
      }
    })
  }
}
createProjects()
createSample()
/*
let tableExists = () => {
  let params = {TableName: 'Projects'}

  dynamodb.deleteTable(params, (err, data) => {
    if (err) {
      console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2))
    }
  })

  dynamodb.listTables({Limit: 10}, (err, data) => {
    if (err) {
      console.log('ERROR', err.code)
      return null
    } else {
      console.log('the table names are: ', data)
      return data
    }
  })
}
*/
