// Типы данных
export interface Param {
  id: number;
  name: string;
  type: 'string' | 'number' | 'select';
  options?: string[];
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
}
