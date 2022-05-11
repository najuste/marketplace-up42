# marketplace-up42

## Description
A demo app as a Marketplace of up42 data blocks.

An application has a single page displaying a various geo data blocks of simple pricing strategy
that can be added to the cart from where the user can check out by clicking 'Buy Now' without an actual purchace but only with actual credit calculations.

## Technology

Built with Vue2 + Typescript using Fetch API and LocalStorage API
Styled with plain CSS and Boostrap5
Tested with JUnit and Cypress (with Javascript)

## Design

For simplicity purposes and time concerns the app is built with few representational components, App component being the source or truth, getting and keeping fetched data and passing it to others.

As the app is consisting of a single view no router was set up and no extra view/page was created where ideally the logic from the App Component would go.

Items in the cart added as well as userCredits are stored in the localStorage and on (re)loading the page read from there to keep the state. For that reason the cart list contains only item id's, with the amount along it.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
