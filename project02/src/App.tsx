import { useState, useEffect, useMemo } from 'react';
import { ChallengeGraph } from './graphs/GraphLogic';
import { GraphVisualizer } from './graphs/GraphVisualizer';
import { GraphControls } from './components/graphControl';

function App() {
    
    const engine = useMemo(() => new ChallengeGraph(), []);
    const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] });
    const [selectedCity, setSelectedCity] = useState('Cali');
    const [cities, setCities] = useState<string[]>([]);

    const refresh = () => {
        setGraphData(engine.getVisualData());
        setCities(engine.getCities());
    };

    useEffect(() => {
    
        engine.addNode({ name: 'Cali', type: 'city' });
        engine.addNode({ name: 'Andres', age: 22, type: 'person' });
        engine.addEdge('Andres', 'Cali');
        refresh();
    }, []);

    const handleAddCity = (name: string) => {
        engine.addNode({ name, type: 'city' });
        refresh();
    };

    const handleAddPerson = (name: string, age: number, city: string) => {
        engine.addNode({ name, age, type: 'person' });
        if (city) engine.addEdge(name, city);
        refresh();
    };

    return (
        <div style={{ padding: '30px' }}>
            <h2 style={{ color: '#c7cfdb' }}>Challenge 10: Grafos (Ciudades, personas)</h2>
            <div style={{ display: 'flex', gap: '30px' }}>
                <GraphControls
                    cities={cities}
                    selectedCity={selectedCity}
                    onCityChange={setSelectedCity}
                    onAddCity={handleAddCity}
                    onAddPerson={handleAddPerson}
                />

                <div>
                    <div style={{ border: '2px solid #3380ff', borderRadius: '12px' }}>
                        <GraphVisualizer data={graphData} />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h3>Personas en {selectedCity}:</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {engine.getPeopleInCity(selectedCity).map(p => (
                                <span key={p.name} style={tagStyle}>{p.name} ({p.age})</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const tagStyle = {
    padding: '5px 12px',
    background: '#3380ff',
    color: 'white',
    borderRadius: '15px',
    fontSize: '14px'
};

export default App;