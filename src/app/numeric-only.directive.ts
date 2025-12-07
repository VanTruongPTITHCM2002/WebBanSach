import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]',
  standalone: true
})
export class NumericOnlyDirective {

constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace', 'Tab', 'Enter', 'Escape', 'Delete',
      'ArrowLeft', 'ArrowRight'
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    const isNumeric = /[0-9]/.test(event.key);

    if (!isNumeric) {
      event.preventDefault();
      return;
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData?.getData('text/plain') || '';
    const filteredValue = pastedInput.replace(/[^0-9]/g, '');
    document.execCommand('insertText', false, filteredValue);
  }

}
