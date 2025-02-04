import { store } from './store'
import { Provider } from 'react-redux'

function App() {
  console.log(import.meta.env.VITE_EURIS_API_URL)
  return (
    <Provider store={store}>
      <div>Hello World</div>
    </Provider>
  )
}

export default App
