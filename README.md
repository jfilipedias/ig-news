## Technologies
- [Typescript](https://typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
- [Fauna](https://fauna.com/)

## Getting started

Install the dependencies:
```bash
yarn
```

You must to setup some environment variables to be set. You can see the list of required variables in the [.env.example](./.env.example) file.

You can run the application with the following command:
```bash
yarn start
```

Also, you must install the [Stripe CLI](https://stripe.com/docs/stripe-cli) to test the checkout integration. With the CLI setup in your environment you can run the following command:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks
```