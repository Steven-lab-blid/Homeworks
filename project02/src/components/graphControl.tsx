import { useState } from 'react';

interface Props {
    onAddPerson: (name: string, age: number, city: string) => void;
    onAddCity: (name: string) => void;
    cities: string[];
    selectedCity: string;
    onCityChange: (city: string) => void;
}

export const GraphControls = ({ onAddPerson, onAddCity, cities, selectedCity, onCityChange }: Props) => {
    const [cityName, setCityName] = useState('');
    const [pName, setPName] = useState('');
    const [pAge, setPAge] = useState<number>(0);
    const [pCity, setPCity] = useState('');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>

            <div style={sectionStyle}>
                <h4>Nueva Ciudad</h4>
                <input value={cityName} onChange={e => setCityName(e.target.value)} placeholder="Nombre ciudad" />
                <button onClick={() => { onAddCity(cityName); setCityName(''); }}>Agregar</button>
            </div>

            <div style={sectionStyle}>
                <h4>Nueva Persona</h4>
                <input value={pName} onChange={e => setPName(e.target.value)} placeholder="Nombre" />
                <input type="number" onChange={e => setPAge(Number(e.target.value))} placeholder="Edad" />
                <select onChange={e => setPCity(e.target.value)} value={pCity}>
                    <option value="">Elegir ciudad...</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={() => onAddPerson(pName, pAge, pCity)}>Agregar</button>
            </div>

            <div style={{ ...sectionStyle, backgroundColor: '#e0f2fe' }}>
                <h4>Consultar personas de una Ciudad</h4>
                <select value={selectedCity} onChange={e => onCityChange(e.target.value)}>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
        </div>
    );
};

const sectionStyle = {
    padding: '15px',
    background: '#f6f6f7',
    borderRadius: '8px',
    border: '1.5px solid #114fa1',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px'
};