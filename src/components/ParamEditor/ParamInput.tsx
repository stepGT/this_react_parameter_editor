import type { Param } from '../../types';

interface ParamInputProps {
  param: Param;
  value: string;
  onChange: (value: string) => void;
}

export const ParamInput: React.FC<ParamInputProps> = ({ param, value, onChange }) => {
  const renderInput = () => {
    switch (param.type) {
      case 'string':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Введите ${param.name}`}
            className="param-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-200"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Введите ${param.name}`}
            className="param-input w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-200"
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="param-select w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Выберите значение</option>
            {param.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="param-item">
      <label className="param-label">{param.name}:</label>
      {renderInput()}
    </div>
  );
};
