'use strict';

export class FormFieldValue {
  approvingMonitorId: number;
  errorMessage: string;
  name: string;
  skipped = false;
  valueString: string;

  clone(): FormFieldValue {
    const clone: FormFieldValue = new FormFieldValue();
    clone.approvingMonitorId = this.approvingMonitorId;
    clone.errorMessage = this.errorMessage;
    clone.name = this.name;
    clone.skipped = this.skipped;
    clone.valueString = this.valueString;

    return clone;
  }
}
