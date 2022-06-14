# ig.news

<p align="center">
  <img alt="Developer" src="https://img.shields.io/badge/developer-jfilipedias-blue">
  <img alt="GitHub" src="https://img.shields.io/github/license/jfilipedias/feedget">
</p>
<br>

ig.news is a platform that delivers news and article about [ReactJS](https://reactjs.org/) through a monthly subscription. 

This project was build to study the [ReactJS](https://reactjs.org/) library with the [Next.js](https://nextjs.org/). All the authentication and payment was implemented using de Next.js [API Routes](https://nextjs.org/docs/api-routes/introduction).

Was used [Fauna](https://fauna.com/) database to handle with serverless features of Next.js and [Stripe](https://stripe.com/) api to handle the subscriptions payments.

<div align="center">
  <img alt="ig.news" title="ig.news" src=".github/assets/cover.svg" />
</div>

## Technologies
- [ReactJS](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Typescript](https://typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Fauna](https://fauna.com/)
- [Stripe](https://stripe.com/)
- [Prismic CMS](https://prismic.io/)

## Getting started

Install the dependencies:
```bash
yarn
```

You must to setup some environment variables to be set. You can see the list of required variables in the [.env.example](./.env.example) file.

Also, you must install the [Stripe CLI](https://stripe.com/docs/stripe-cli) to test the checkout integration. With the CLI setup in your environment you can run the following command:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks
```

The command above will listen for webhooks from Stripe and forward them to the `/api/webhooks` endpoint. Therefore the stripe CLI will return a signing secret that is used on `STRIPE_WEBHOOK_SECRET` environment variable.

After all setups, you can run the application with the following command:

```bash
yarn dev
```

To edit the prismic CMS content you can run a local SliceMachine instance:

```bash
yarn slicemachine
```
## License
This project is licensed under the MIT. Consult the [LICENSE](LICENSE) for more information.
