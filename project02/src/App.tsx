import { Search } from './components/search';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ color: '#005088', fontSize: '2.5rem' }}>Challenge 11</h1>
        <p>Search with Trie and TopK with Heaps</p>
      </header>
      <Search />
    </div>
  );
}

export default App;