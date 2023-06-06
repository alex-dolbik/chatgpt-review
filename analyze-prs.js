const axios = require('axios');
const { mean, sum } = require('lodash');

const days = 30;
// const repos = ['ni-comps-react', 'xsite-ui', 'rapido', 'product-rts'];
const repos = ['ni-comps-react '];
const personalAccessToken = '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'; // Replace with your personal access token
const repositoryOwner = 'Natural-Intelligence'; // Replace with your repository owner

const fetchRepoPRs = async ({ repositoryName }) => {
  let calls = 0;
  const today = new Date().toISOString().split('T')[0];
  // const from = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  // const to = new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  // const apiUrl = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/pulls?state=all&sort=created&direction=desc&since=${from}&until=${to}&per_page=100`;
  const apiUrl = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/pulls?state=all&sort=created&direction=desc&per_page=10`;

  let repoPRs = {};
  let page = 1;
  try {
    while (page < 100) {
      calls++;

      const response = await axios.get(`${apiUrl}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${personalAccessToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });
      const { data: prsList } = await response;
      const monthAgoDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const data = prsList.filter(item => item.created_at > monthAgoDate)

      // Process the fetched PR data here
      // console.log(data);

      if (data && data.length > 0) {
        // Process each PR
        await Promise.all(data.map(async pr => {
          const filesUrl = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/pulls/${pr.number}/files`;
          calls++;
          const { data: prFilesResponse } = await axios.get(filesUrl, {
            headers: {
              Authorization: `Bearer ${personalAccessToken}`,
              Accept: 'application/vnd.github.v3.patch'
            }
          });

          // Process the PR patch here
          console.log(`Changed files for PR #${pr.number}:`);
          // console.log(prFilesResponse);
          const prPatch = prFilesResponse.reduce((acc, item) => acc + item.patch, '');
          repoPRs[pr.number] = prPatch.length;
        }))

        console.log(`Calls made: ${calls}`);
        console.log(`Last PR date: ${data[data.length - 1].created_at}`);

        // Move to the next page
        page++;
      } else {
        break; // No more pages to fetch
      }
    }
  } catch (error) {
    console.log('Error:', error);
  }

  return repoPRs;
};


(async () => {
  const result = await Promise.all(repos.map(async repositoryName => {
    const data = await fetchRepoPRs({ repositoryName })
    return {
      repositoryName,
      data,
    };
  }));

  // console.log(JSON.stringify(result));

  const avgPrSizePerRepo = result.map(item => {
    const avgPrLength = mean(Object.values(item.data));
    const totalPrLength = sum(Object.values(item.data));
    const avgPrTokensLength = avgPrLength / 2.24;
    const totalPrTokensLength = totalPrLength / 2.24;
    const totalPRs = Object.values(item.data).length;

    return {
      repositoryName: item.repositoryName,
      avgPrLength,
      avgPrTokensLength,
      avgPrice: `$${((avgPrTokensLength / 1000) * 0.002).toFixed(5)}`,
      totalPrLength,
      totalPrTokensLength,
      totalPrice: `$${((totalPrTokensLength / 1000) * 0.002).toFixed(5)}`,
      totalPRs,
    };
  });

  console.log(JSON.stringify(avgPrSizePerRepo));
})();
