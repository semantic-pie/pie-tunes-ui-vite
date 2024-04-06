import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import './libs/swiped-events.min.js'

render(<App />, document.getElementById('app')!)
