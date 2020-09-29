/**
 * @license
 * Copyright (c) 2020 Eduardo Echeverria. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class ElementaTextInput extends HTMLElement {
  public static get is(): string {
    return 'elementa-text-input';
  }

  public static get observedAttributes(): string[] {
    return [
      'error',
      'helper-text-bottom',
      'helper-text-top',
      'more-options-label',
      'more-options-value',
      'placeholder',
      'question',
      'value'
    ];
  }

  private template = `
    <style>
      :host{
        display: block;
      }

      :host([error]) input {
        border-color: red;
      }

      label {
        display: block;
      }

      input {
        line-height: 36px;
        width: 100%;
      }
    </style>
    <input type="text" />
  `;

  private inputElement: HTMLInputElement;

  public get name(): string {
    return this.getAttribute('name');
  }

  public get value(): string {
    return this.getAttribute('value');
  }

  public constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = this.template;

    this.inputElement = this.shadowRoot.querySelector('input') as HTMLInputElement;
    this.inputElement.addEventListener('change', (e) => this.inputChanged(e));
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
    namespace: string,
  ): void {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'error') {
      this.setError(newValue);
      return;
    }

    if (name === 'helper-text-bottom') {
      this.setHelperTextBottom(newValue);
      return;
    }

    if (name === 'helper-text-top') {
      this.setHelperTextTop(newValue);
      return;
    }

    if (name === 'more-options-label') {
      this.setMoreOptions(newValue);
      return;
    }

    if (name === 'more-options-value') {
      this.setMoreOptionsValue(newValue);
      return;
    }

    if (name === 'placeholder') {
      this.setPlaceholder(newValue);
    }

    if (name === 'question') {
      this.setQuestion(newValue);
      return;
    }

    if (name === 'value') {
      this.inputElement.value = newValue;
      return;
    }
  }

  // private connectedCallback(): void { }

  private setQuestion(question: string): void {
    let questionElement: HTMLElement = this.shadowRoot.querySelector('[question]');

    if (!question) {
      if (questionElement) {
        this.shadowRoot.removeChild(questionElement);
      }

      return;
    }

    if (questionElement) {
      questionElement.textContent = question;
      return;
    }

    questionElement = document.createElement('LABEL');
    questionElement.setAttributeNode(document.createAttribute('question'));
    questionElement.textContent = question;
    const helperTextElement: HTMLElement = this.shadowRoot.querySelector('[helper-text][top]');
    this.shadowRoot.insertBefore(questionElement, helperTextElement ?? this.inputElement);
  }

  private setHelperTextBottom(helperText: string): void {
    let helperTextElement: HTMLElement = this.shadowRoot.querySelector('[helper-text][bottom]');

    if (!helperText) {
      if (helperTextElement) {
        this.shadowRoot.removeChild(helperTextElement);
      }

      return;
    }

    if (helperTextElement) {
      helperTextElement.textContent = helperText;
      return;
    }

    helperTextElement = document.createElement('DIV');
    helperTextElement.setAttributeNode(document.createAttribute('helper-text'));
    helperTextElement.setAttributeNode(document.createAttribute('bottom'));
    helperTextElement.textContent = helperText;
    this.shadowRoot.appendChild(helperTextElement);
  }

  private setHelperTextTop(helperText: string): void {
    let helperTextElement: HTMLElement = this.shadowRoot.querySelector('[helper-text][top]');

    if (!helperText) {
      if (helperTextElement) {
        this.shadowRoot.removeChild(helperTextElement);
      }

      return;
    }

    if (helperTextElement) {
      helperTextElement.textContent = helperText;
      return;
    }

    helperTextElement = document.createElement('DIV');
    helperTextElement.setAttributeNode(document.createAttribute('helper-text'));
    helperTextElement.setAttributeNode(document.createAttribute('top'));
    helperTextElement.textContent = helperText;
    this.shadowRoot.insertBefore(helperTextElement, this.inputElement);
  }

  private setMoreOptions(moreOptionsLabel: string): void {
    let moreOptionsElement: HTMLElement = this.shadowRoot.querySelector('[more-options]');
    const moreOptionsValueElement: HTMLElement = this.shadowRoot.querySelector('[more-options-value]');

    if (!moreOptionsLabel) {
      if (moreOptionsElement) {
        this.shadowRoot.removeChild(moreOptionsElement);
      }

      if (moreOptionsValueElement) {
        this.shadowRoot.removeChild(moreOptionsValueElement);
      }

      return;
    }

    if (moreOptionsElement) {
      this.setMoreOptionsValue(this.getAttribute('more-options-value'));
      return;
    }

    moreOptionsElement = document.createElement('BUTTON');
    moreOptionsElement.setAttributeNode(document.createAttribute('more-options'));
    moreOptionsElement.textContent = moreOptionsLabel;
    this.shadowRoot.appendChild(moreOptionsElement);
    this.setMoreOptionsValue(this.getAttribute('more-options-value'));
  }

  private setMoreOptionsValue(value: string): void {
    let moreOptionsValueElement: HTMLElement = this.shadowRoot.querySelector('[more-options-value]');

    if (!value) {
      if (moreOptionsValueElement) {
        this.shadowRoot.removeChild(moreOptionsValueElement);
      }

      return;
    }

    if (moreOptionsValueElement) {
      moreOptionsValueElement.textContent = value ?? '';
      return;
    }

    moreOptionsValueElement = document.createElement('DIV');
    moreOptionsValueElement.setAttributeNode(document.createAttribute('more-options-value'));
    moreOptionsValueElement.textContent = value ?? '';
    this.shadowRoot.appendChild(moreOptionsValueElement);
  }

  private setPlaceholder(placeholder: string): void {
    if (!placeholder) {
      if (this.inputElement.hasAttribute('placeholder')) {
        this.inputElement.removeAttribute('placeholder');
      }

      return;
    }

    this.inputElement.setAttribute('placeholder', placeholder);
  }

  private setError(error: string): void {
    let errorElement: HTMLElement = this.shadowRoot.querySelector('label[error]');

    if (!error) {
      if (errorElement) {
        this.shadowRoot.removeChild(errorElement);
      }

      return;
    }

    if (errorElement) {
      errorElement.innerText = error;
      return;
    }

    errorElement = document.createElement('LABEL');
    errorElement.setAttributeNode(document.createAttribute('error'));
    errorElement.textContent = error;
    const questionElement: HTMLElement = this.shadowRoot.querySelector('[question]');
    const helperTextElement: HTMLElement = this.shadowRoot.querySelector('[helper-text][top]');
    this.shadowRoot.insertBefore(errorElement, questionElement ?? helperTextElement ?? this.inputElement);
  }

  private inputChanged(e: Event): boolean {
    this.setAttribute('value', this.inputElement.value);
    this.dispatchEvent(new Event('change'));
    return true;
  }
}

window.customElements.define(ElementaTextInput.is, ElementaTextInput);
