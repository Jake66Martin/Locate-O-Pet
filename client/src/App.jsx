/*******************************************************************
 * Carleton Bootcamp - 2024
 * Copyright 2024 Sonja Gorin, Jacob Martin, Gustavo Miller
 * License: free and unencumbered software
 * Assignment # 20 - React Portfolio
 * 
 * Filename: app.jsx
 * Date : 1/22/2024 9:05:01 PM
 *******************************************************************/
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import NavigationBar from './components/Navigator/navigation';
import { setContext } from '@apollo/client/link/context';

// import { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl';

// mapboxgl.accessToken = 'pk.eyJ1IjoiZ3NvbmphIiwiYSI6ImNscm9kZ3RheDFoMGoybG9mZGZiNGphOG4ifQ.xYb4Ch19HGpuJpK2BXQ3tg';

const httpLink = createHttpLink({ uri: '/graphql', });

const authLink = setContext((_, { headers }) => {
     const token = localStorage.getItem('id_token');
     return {
          headers: { ...headers, authorization: token ? `Bearer ${token}` : '', },
     };
});

const client = new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache(), });

export default function App() {
    return (
        <ApolloProvider client={client}>
            <div>
            <NavigationBar />
                <main>
                    <Outlet />
                </main>
            </div>
        </ApolloProvider>
   );
}
