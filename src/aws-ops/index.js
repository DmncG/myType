const AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
})

export function allProjects () {
  return new Promise(resolve => {
    let docClient = new AWS.DynamoDB.DocumentClient()
    let params = {
      TableName: 'Projects'
    }
    docClient.scan(params, (err, data) => {
      if (err) console.error(err)
      else {
        resolve(data.Items)
      }
    })
  })
}

export function putOneProject (projectName) {
  let docClient = new AWS.DynamoDB.DocumentClient()

  let params = {

  }
}

export function deleteProjects (projects) {
  let docClient = new AWS.DynamoDB.DocumentClient()

  projects.forEach(project => {
    let params = {
      TableName: 'Projects',
      Key: {
        projectID: project
      }
    }
    docClient.delete(params, (err, data) => {
      if (err) console.error(err)
      else {
        return data
      }
    })
  })
}
