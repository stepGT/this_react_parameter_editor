import React, { useState, useEffect } from 'react';
import { ParamInput } from './ParamInput';
import type { Model, Param } from '../../types';

interface ParamEditorProps {
  params: Param[];
  initialModel: Model;
  onChange?: (model: Model) => void;
}

export const ParamEditor: React.FC<ParamEditorProps> = ({ 
  params, 
  initialModel,
  onChange 
}) => {
  const [model, setModel] = useState<Model>(initialModel);

  useEffect(() => {
    const updatedParamValues = [...model.paramValues];
    
    params.forEach(param => {
      const exists = updatedParamValues.some(pv => pv.paramId === param.id);
      if (!exists) {
        updatedParamValues.push({
          paramId: param.id,
          value: getDefaultValue(param.type)
        });
      }
    });
    
    setModel({ ...model, paramValues: updatedParamValues });
  }, [params]);

  const getParamValue = (paramId: number): string => {
    const paramValue = model.paramValues.find(pv => pv.paramId === paramId);
    return paramValue?.value || '';
  };

  const handleParamChange = (paramId: number, value: string) => {
    const updatedParamValues = model.paramValues.map(pv => 
      pv.paramId === paramId ? { ...pv, value } : pv
    );

    if (!updatedParamValues.some(pv => pv.paramId === paramId)) {
      updatedParamValues.push({ paramId, value });
    }
    
    const newModel = { ...model, paramValues: updatedParamValues };
    setModel(newModel);
    onChange?.(newModel);
  };

  const getDefaultValue = (type: Param['type']): string => {
    switch(type) {
      case 'number': return '0';
      case 'select': return '';
      default: return '';
    }
  };

  return (
    <div className="param-editor">
      {params.map(param => (
        <ParamInput
          key={param.id}
          param={param}
          value={getParamValue(param.id)}
          onChange={(value) => handleParamChange(param.id, value)}
        />
      ))}
      
      <div className="model-view p-4 mt-3 border rounded">
        <h3>Текущая модель:</h3>
        <pre>{JSON.stringify(model, null, 2)}</pre>
      </div>
    </div>
  );
};