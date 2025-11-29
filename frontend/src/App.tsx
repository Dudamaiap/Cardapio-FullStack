import './App.css';
import { useFoodData } from './hooks/useFoodData';

function App() {
  const { data, isLoading, isError } = useFoodData();

  console.log('Dados recebidos:', data); // Adicione este log

  if (isLoading) {
    return <div>Carregando cardápio...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar o cardápio</div>;
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map((food) => (
          <div key={food.id} className="food-card">
            <img src={food.image} alt={food.title} />
            <h2>{food.title}</h2>
            <p>R$ {food.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;