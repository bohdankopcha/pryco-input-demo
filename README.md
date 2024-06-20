# Amulet Frontend

![CI Badge](https://github.com/0xamulet/frontend/actions/workflows/cicd.yaml/badge.svg)

## Prerequisites

In order to install private dependencies from the github NPM repo, you need to have a github personal access token.

To create a personal access token, go to [this page](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic).
After that, you can use the token to install private dependencies.

### Security

It is best to have this token stored somewhere securely, and copy it when you need to use it.

Be aware that this token is stored in your shell history if you use it in a command. If you are using a shell like `zsh` or `bash`, you can prefix commands with a **space** to exclude them from history, like this:

```sh
 NODE_AUTH_TOKEN=${MY_TOKEN} npm install
```

## Installation

See prerequisites above, for authentication steps.
If you have the auth token exported, you can simply do:

```sh
npm install --legacy-peer-deps
```

## Development

```sh
npm run dev
```

## Docker

This is for local testing of docker build/run.
Be sure to define `NODE_AUTH_TOKEN` environment variable before running the build step (see prerequisites), as well as other env vars (check `ARG` variables inside the [Dockerfile](Dockerfile)).

```sh
# if you have build args in a .env.local, you can use this oneliner:
docker build -t amulet-frontend --build-arg AMULET_GITHUB_TOKEN=${NODE_AUTH_TOKEN} $(cat .env.local | sed 's@^@--build-arg @g' | paste -s -d " ") .

# run the container
docker run -p 3000:80 amulet-frontend
```

## Routes list

<!-- ROUTES_START -->
```
/
/create-vault/
/create-vault/[txHash]
/dashboard/
/divest/[address]
/divest/success/[hash]
/home/
/management-dashboard/analytics/
/management-dashboard/analytics/overview/
/management-dashboard/analytics/settings/
/management-dashboard/home/
/management-dashboard/strategies/
/management-dashboard/vaults/
/portfolio/
/vault-discovery/
/vault-discovery/[address]
```
<!-- ROUTES_END -->