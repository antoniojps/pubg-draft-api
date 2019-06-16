# Serverless Now CLI API

Bootstrap a serveless lambda functions API project to deploy at now.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Node
- Now CLI

### Installing

1. Clone

```
git clone https://github.com/antoniojps/now-serverless-template.git
cd now-serverless-template
```

2. Start developing

```
now dev
```

Your functions are now running at `http://localhost:3000/api/hello.js`!

## Deployment

To understand how to deploy read the Now CLI documentation: [Node.js](https://zeit.co/docs/v2/deployments/basics/).

```
now --target production
```

## Configuration

The base configuration is at `now.json`, notices now to use the version 2 of now, which is cheaper and prefered, it also instructs now to build all the files within the api folder with the `@now/node` modules to be installed.

```json
{
  "version": 2,
  "name": "change-this",
  "builds": [{ "src": "api/**/*.js", "use": "@now/node" }],
  "alias": ["change-this"]
}
```

## Authors

- **António Santos** - [antoniosantos.me](https://antoniosantos.me)
