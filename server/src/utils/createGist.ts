import axios from 'axios'

export default async function createGist(content : any) {
    const githubApiUrl = 'https://api.github.com/gists';
    const headers = {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    };
    
    const data = {
      description: 'Exported Todo List',
      public: false,
      files: {
        'todo_list.md': {
          content: content,
        },
      },
    };
  
    try {
      const response = await axios.post(githubApiUrl, data, { headers });
      return response.data.html_url;
    } catch (error) {
      console.error('Error creating gist:', error);
      throw new Error('Failed to create gist');
    }
  }