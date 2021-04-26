'use strict';

import { Form, FormField, FormFieldValue, } from '@core/domain';
import { IAppStoreProvider } from '@core/boundaries';

export function validateFormField(formField: FormField, value: FormFieldValue): string {
  if (!formField.isRequired) {
    return '';
  }

  if (!value.valueString) {
    return 'required';
  }

  return '';
}

function validateUpdatedFields(
  form: Form,
  updatedValues: { [id: string]: FormFieldValue },
): void {
  for (const [key, value] of Object.entries(updatedValues)) {
    const formField: FormField = form.getFormFieldBy(value.name);

    if (!formField) {
      throw new Error(`updateFormFieldUseCase-formFieldNotFound :: formFieldName:${value.name}`);
    }

    value.errorMessage = validateFormField(formField, value);
  }
}

function evaluateCalculation(calculation: string): { calculation: Function; paramNames: string[] } {
  let formula: string = calculation;

  // Calculation example: '[][my-code][a]+[b]+[b]'
  const names: string[] = calculation
    .match(/\[([A-Za-z0-9_-]+?)\]/g) // Gets all the names, surrounded by brackets: ['[my-code]','[a]','[b]','[b]']
    .filter((element, index, array) => array.indexOf(element) === index) // Removes duplicates: // Gets all the names, surrounded by brackets: ['[my-code]','[a]','[b]']
    .map(
      (nameWithBrackets) => {
        const name: string = nameWithBrackets.replace(/(\[|\])/g, '');
        formula = formula.replace(nameWithBrackets, `parseFloat(params['${name}'])`);
        return name;
      }
    ) // Removes brackets: ['my-code','a','b'] while it sets the params in the formula

  // When creating the final calculation function, we are not using eval().
  // Instead we use the Function constructor in a way that we create a closure around it so it does not have access to the global variables.
  // This to reduce exposure to malicious scripts: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
  return {
    calculation: Function(`'use strict';return(function(params){return ${formula};})`)(),
    paramNames: names,
  };
}

function updateCalculatedFields(
  form: Form,
  values: { [id: string]: FormFieldValue },
  updatedValues: { [id: string]: FormFieldValue },
): void {

  for (const [key, calculatedField] of Object.entries(form.calculatedFields)) {
    //const formField: FormField =
    const calculationDetails: { calculation: Function; paramNames: string[] } = evaluateCalculation(calculatedField.calculation);
    const params: { [id: string]: number } = {};

    // [TODO] - Fix floating point issues
    calculationDetails.paramNames.forEach((name: string) => params[name] = parseFloat(updatedValues[name] ? updatedValues[name].valueString : values[name].valueString));
    const calculatedValue: string = calculationDetails.calculation(params).toString();

    if (calculatedField.value !== calculatedValue) {
      const updatedValue: FormFieldValue = values[key].clone();
      updatedValue.valueString = calculatedValue;
      updatedValues[key] = updatedValue;
    }
  }
}

/**
 * 1. User provides values for one or more fields;
 * 2. The system sets the edit-form-state to updating-values;
 * 3. The system validates the values;
 * 4. The system updates the calculated fields;
 * The system runs the skip logic;
 * . The system pushes the changes to the API;
 * 7. The system updates the application state and sets the edit-form-state to ready;
*/
// 1. User provides values for one or more fields;
export async function updateFormFieldUseCase(
  appStoreProvider: IAppStoreProvider,
  form: Form,
  formFieldValues: { [id: string]: FormFieldValue },
  updatedFormFieldValues: { [id: string]: FormFieldValue },
): Promise<void> {
  // 2. The sets the edit-form-state to updating-values;
  appStoreProvider.updatingFormValues()
    // 3. The system validates the values;
    .then((): void => validateUpdatedFields(form, updatedFormFieldValues))
    // 4. The system updates the calculated fields
    .then(() => updateCalculatedFields(form, formFieldValues, updatedFormFieldValues))
    // 7. The system updates the application state and sets the edit-form-state to ready;
    .then(() => appStoreProvider.updateValues(updatedFormFieldValues));

    return Promise.resolve();
}
