import { Application } from 'probot' // eslint-disable-line no-unused-vars
import SmeeClient from 'smee-client'
import bodyParser from 'body-parser'
import App from '@octokit/app'
import request from '@octokit/request'

export = (app: Application) => {
  const router = app.route('/dn')
  // create application/json parser
  const jsonParser = bodyParser.json()

  const smee = new SmeeClient({
    source: 'https://smee.io/gnNKGUGRxPpZaTs',
    target: 'http://localhost:3000/dn/events',
    logger: console
  })
  smee.start()

  router.post('/events', jsonParser, async (req, res) => {
    const installationId = await getInstallationId()
    const githubApi = await app.auth(installationId)
    const comments = await githubApi.issues.listComments({ owner: 'B3zo0', repo: 'grapqhl-todo-app-typescript', issue_number: 4 })
    const comment = comments.data.find(c => c.user.login === 'deploy-notifier[bot]')
    if (comment) {
      githubApi.issues.updateComment({ comment_id: comment.id, body: 'Updated', owner: 'B3zo0', repo: 'grapqhl-todo-app-typescript' })
    } else {
      githubApi.issues.createComment({
        body: JSON.stringify(req.body),
        issue_number: 4,
        owner: 'B3zo0',
        repo: 'grapqhl-todo-app-typescript'
      })
    }
  })
}

const getInstallationId = async () => {
  const app = new App({ id: +process.env.APP_ID!, privateKey: process.env.PRIVATE_KEY! })
  const jwt = app.getSignedJsonWebToken()

  // Example of using authenticated app to GET an individual installation
  // https://developer.github.com/v3/apps/#find-repository-installation
  const { data } = await request('GET /repos/:owner/:repo/installation', {
    owner: 'B3zo0',
    repo: 'grapqhl-todo-app-typescript',
    headers: {
      authorization: `Bearer ${jwt}`,
      accept: 'application/vnd.github.machine-man-preview+json'
    }
  })

  return data.id as number
}
