import React, { useState } from 'react';
import './App.css';
import { ParamEditor } from './components/ParamEditor/ParamEditor';
import type { Param, Model } from './types';

const initialParams: Param[] = [
  {
    id: 1,
    name: 'Наименование',
    type: 'string',
  },
  {
    id: 2,
    name: 'Цена',
    type: 'number',
  },
  {
    id: 3,
    name: 'Цвет',
    type: 'select',
    options: ['Красный', 'Синий', 'Зеленый', 'Черный'],
  },
  {
    id: 4,
    name: 'Размер',
    type: 'select',
    options: ['S', 'M', 'L', 'XL'],
  },
];

const initialModel: Model = {
  paramValues: [
    { paramId: 1, value: 'Товар 1' },
    { paramId: 2, value: '1000' },
    { paramId: 3, value: 'Красный' },
    { paramId: 4, value: 'S' },
  ],
};

const App: React.FC = () => {
  const [model, setModel] = useState<Model>(initialModel);
  const [currentModel, setCurrentModel] = useState<Model>(initialModel);

  const handleModelChange = (newModel: Model) => {
    setCurrentModel(newModel);
  };

  const handleSave = () => {
    setModel(currentModel);
    alert('Модель сохранена! Проверьте консоль для просмотра данных.');
    console.log('Сохраненная модель:', currentModel);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Редактор параметров модели</h1>
      </header>

      <main className="app-content">
        <div className="editor-section">
          <h2>Редактирование параметров</h2>
          <ParamEditor params={initialParams} initialModel={model} onChange={handleModelChange} />

          <div className="actions">
            <button onClick={handleSave} className="btn btn-primary">
              Сохранить изменения
            </button>
          </div>
        </div>

        <div className="info-section">
          <h2>Информация о параметрах</h2>
          <div className="params-info">
            <h3>Доступные параметры:</h3>
            <ul>
              {initialParams.map((param) => (
                <li key={param.id}>
                  <strong>{param.name}</strong> (ID: {param.id}, тип: {param.type})
                </li>
              ))}
            </ul>

            <h3>Текущие значения:</h3>
            <ul>
              {currentModel.paramValues.map((pv) => {
                const param = initialParams.find((p) => p.id === pv.paramId);
                return (
                  <li key={pv.paramId}>
                    <strong>{param?.name}:</strong> {pv.value}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
