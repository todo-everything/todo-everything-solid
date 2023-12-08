/* @refresh reload */
import {render} from 'solid-js/web'

// TODO: Only import on dev
import 'solid-devtools'

import './root.css'
import AppMain from './AppMain'

const root = document.getElementById('root')

render(() => <AppMain />, root!)
