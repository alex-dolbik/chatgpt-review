const { Octokit } = require("@octokit/rest");

process.on('unhandledRejection', (err) => {
  console.error(err)
})

async function handlePullRequest(eventPayload) {
  console.log('Start "handlePullRequest"');

  // Extract relevant information from the event payload
  const { pull_request: pr, repository } = eventPayload;
  const { number, title, body, head, base } = pr;
  const { owner, repo } = repository;

  // Perform actions based on the PR information
  console.log(`New PR created: #${number}`);
  console.log(`Title: ${title}`);
  console.log(`Description: ${body}`);
  console.log(`Branch: ${head.ref}`);
  console.log(`Base branch: ${base.ref}`);
  console.log(`Repository: ${owner}/${repo}`);

  // Additional logic for interacting with ChatGPT or performing other actions

  // Example: Comment on the PR
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const comment = "Hello! This is a comment from the PR handler.";
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body: comment,
  });
}

function a() {
  console.log(process);
}

a();

module.exports = handlePullRequest;