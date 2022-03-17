# Recruitment task for [Jutro Medical](https://jutromedical.com/) company

This repository contains solution for the recruitment [task](./docs/task.pdf).

Project consists of 4 main services:

-   `proxy` - reverse proxy of applications
-   `client` - the Next.js application which serves simple frontend
-   `server` - the NestJS application which mainly serves `GraphQL` endpoint
-   `db` - the PostgreSQL database used by `server`

## How to run it?

Just run following command in the root directory of repository:

```bash
docker-compose -f "dev.docker-compose.yml" up --build
```

Then docker should download necessary stuff from the hub, build the images and run the containers.

Proxy is configured to serve everything under [http://localhost](http://localhost), so make sure that your `80` port is free.

**You have to wait until the frontend is ready to accept requests.** It takes a while to install all necessary `npm` packages. So if you see `Bad gateway` error - just wait a bit and try again. You can also check the logs of the `client` container.

Then, when solution is running, you can open [http://localhost/admin](http://localhost/admin) in your browser. You will see simple administration panel without any authentication, because it was not necessary for this task. In real life, I would secure it in some way.

![./docs/admin-panel.png](./docs/admin-panel.png)

To access `GraphQL` playground you can simply go to [http://localhost/api/graphql](http://localhost/api/graphql).

To test invitation mechanics, just click `Copy link` button and paste copied link in another browser card. Then you can refresh the `admin` page and see results. Also, you can change the party place and **time** to quickly test the invitation locking mechanisms.

## Backend

Backend uses `NestJS` framework and `Apollo GraphQL` for the `GraphQL` endpoint and playground.

## More...

I will add more info tomorrow, because I started to build this project so late, so not everything looks as good as I would like it to.

![./docs/meme.jpg](./docs/meme.jpg)
