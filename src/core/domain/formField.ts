'use strict';

import { FormSection } from '@core/domain';

export class FormField {
  calculation: string;
  classificationTypeName: string;
  classificationTypeValues: string;
  controlNote: string;
  controlType: string;
  isIdentifying: boolean;
  isRequired: boolean;
  label: string;
  labelNote: string;
  name: string;
  nullFlavors: string;
  ordinal: number;
  section: FormSection;
  skipLogic: string;
  skipped: boolean;
  value: string;
  valueType: string;
}
