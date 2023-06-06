const core = require('@actions/core');
const github = require('@actions/github');

process.on('unhandledRejection', (err) => {
  console.error(err)
})

const main = async () => {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/
    // const owner = core.getInput('owner', { required: true });
    // const repo = core.getInput('repo', { required: true });
    // const pr_number = core.getInput('pr_number', { required: true });
    // const token = core.getInput('token', { required: true });
    const { owner, repo, pr_number, token } = process.env;

    /**
     * Now we need to create an instance of Octokit which will use to call
     * GitHub's REST API endpoints.
     * We will pass the token as an argument to the constructor. This token
     * will be used to authenticate our requests.
     * You can find all the information about how to use Octokit here:
     * https://octokit.github.io/rest.js/v18
     **/
    const octokit = new github.getOctokit(token);

    /**
     * We need to fetch the list of files that were changes in the Pull Request
     * and store them in a variable.
     * We use octokit.paginate() to automatically loop over all the pages of the
     * results.
     * Reference: https://octokit.github.io/rest.js/v18#pulls-list-files
     */
    const { data: changedFiles } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: pr_number,
    });


    console.log({ changedFiles })


    /**
     * Contains the sum of all the additions, deletions, and changes
     * in all the files in the Pull Request.
     **/
    let diffData = {
      additions: 0,
      deletions: 0,
      changes: 0
    };

    // Reference for how to use Array.reduce():
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    diffData = changedFiles.reduce((acc, file) => {
      acc.additions += file.additions;
      acc.deletions += file.deletions;
      acc.changes += file.changes;
      return acc;
    }, diffData);

    /**
     * Loop over all the files changed in the PR and add labels according
     * to files types.
     **/
    for (const file of changedFiles) {
      /**
       * Add labels according to file types.
       */
      const fileExtension = file.filename.split('.').pop();
      switch(fileExtension) {
        case 'md':
          await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: pr_number,
            labels: ['markdown'],
          });
        case 'js':
          await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: pr_number,
            labels: ['javascript'],
          });
        case 'yml':
          await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: pr_number,
            labels: ['yaml'],
          });
        case 'yaml':
          await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: pr_number,
            labels: ['yaml'],
          });
      }
    }

    /**
     * Create a comment on the PR with the information we compiled from the
     * list of changed files.
     */
    // await octokit.rest.issues.createComment({
    //   owner,
    //   repo,
    //   issue_number: pr_number,
    //   body: `
    //     Pull Request #${pr_number} has been updated with: \n
    //     - ${diffData.changes} changes \n
    //     - ${diffData.additions} additions \n
    //     - ${diffData.deletions} deletions \n
    //   `
    // });

    await addChatGPTComments();
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function addChatGPTComments() {
  const feedback = `
  1::: Consider using more descriptive names for the function and its parameters.
  3-4::: Avoid duplicate conditional checks. Combine them into a single condition with appropriate branching logic.
  6-10::: Utilize template literals for console.log statements to improve readability and simplify the code.
`;

  const comments = feedback.split('\n')
    .filter(Boolean)
    .map(item => {
      const [lines, text] = item.split(':::');
      if (!lines || !text) {
        console.log('Ignored feedback line', item);
        return null;
      }
      const [line] = lines?.trim().split('-');
      const comment = text.trim();

      return { comment, line: +line };
    })
    .filter(Boolean)

  // comments should be added one-by-one
  for (let i = 0; i < comments.length; i++) {
    const { line, comment } = comments[i];
    await addCommentToFileLine({
      line,
      file: 'index.js',
      comment,
    })
  }
}

async function addCommentToFileLine({ comment, file, line }) {
  //
  // await Promise.all(comments.map(async ({ line, comment }) => {
  //   return await addCommentToFileLine({
  //     line,
  //     file: 'index.js',
  //     comment,
  //   })
  // }));
  
  const { owner, repo, pr_number: pullRequestNumber, token } = process.env;

  const octokit = github.getOctokit(token);

  try {
    const { data: pullRequest } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: pullRequestNumber
    });

    const { data: comments } = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number: pullRequestNumber
    });

    const fileComments = comments.filter(comment => comment.path === file);
    const position = fileComments.length > 0 ? fileComments[fileComments.length - 1].position + 1 : 1;

    await octokit.rest.pulls.createReviewComment({
      owner,
      repo,
      pull_number: pullRequestNumber,
      body: comment,
      commit_id: pullRequest.head.sha,
      path: file,
      position,
      line
    });

    console.log('Comment added successfully!');
  } catch (error) {
    console.error('Error adding comment:', error);
  }
}


// Call the main function to run the action
main();