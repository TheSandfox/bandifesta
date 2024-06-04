import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { HashRouter } from 'react-router-dom'
// import * as dotenv from 'dotenv';

// dotenv.config();
ReactDOM.createRoot(document.getElementById('root')).render(
	<HashRouter>
		<App/>
	</HashRouter>
)
