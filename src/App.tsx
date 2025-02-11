import { store } from './store'
import { Provider } from 'react-redux'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className="lg:p-12 p-5 overflow-auto bg-gray-100 dark:bg-gray-700 ">
        <Dashboard />
      </main>
      <Footer />
    </Provider>
  )
}

export default App
