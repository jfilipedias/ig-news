## Technologies
- [Typescript](https://typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
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