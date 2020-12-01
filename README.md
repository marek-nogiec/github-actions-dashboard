# Github Multi-Repo Actions Dashboard
Very quick project to see Runs statuses from different GitHub repos.

## Usage

Create `.env` file in root dir with two variables:
- `REACT_APP_GITHUB_TOKEN` - with GitHub token with `repo` and `workflows` scope (you can create one [here](https://github.com/settings/tokens))
- `REACT_APP_REPOS` - comma separated list of repos to include in the dashboard, e.g. `REACT_APP_REPOS="owner/name,second-owner/another-name"`

Install dependencies and run project
- `yarn` 
- `yarn start`

Browser should open automatically on `http://localhost:3000`
