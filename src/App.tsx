import { store } from './store'
import { Provider } from 'react-redux'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <Home />
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </Provider>
  )
}

export default App
