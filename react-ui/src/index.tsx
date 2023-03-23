import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { todoListReducer } from './store/reducers/todo-list';

const httpLink = createHttpLink({
    uri: "http://localhost:4000/"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
    cache: cache
});

const rootReducer = combineReducers({ todoList: todoListReducer });

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
