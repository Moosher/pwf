import { Directive, ElementRef, HostListener } from '@angular/core';
import { VMasker } from 'vanilla-masker';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var require: any;
var VMasker = require('vanilla-masker');

@Directive({
  selector: '[DateMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DateMaskDirective,
    multi: true
  }]
})
export class DateMaskDirective implements ControlValueAccessor {

  _onTouched: any;
  _onChange: (_: any) => void;

  constructor(private el: ElementRef) { }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  @HostListener('keypress', ['$event'])
  onKeypress($event: any) {
    this.applyMask($event.target);
  }

  @HostListener('keydown', ['$event'])
  onKeydown($event: any) {
    this.applyMask($event.target);
  }

  @HostListener('input', ['$event'])
  onInput($event: any) {
    this.applyMask($event.target);
  }

  @HostListener('click', ['$event'])
  onClick($event: any) {
    this.applyMask($event.target);
  }

  @HostListener('paste', ['$event'])
  onPaste($event: any) {
    this.applyMask($event.target);
    this._onChange(this.toDate($event.clipboardData.getData('text')));
  }

  @HostListener('cut', ['$event'])
  onCut($event: any) {
    this.applyMask($event.target);
    this._onChange(this.toDate($event.target.value));
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    this.applyMask($event.target);
    this._onChange(this.toDate($event.target.value));
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    this.applyMask($event.target);
    this._onTouched();
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value;

    if (value) {
      this.applyMask(this.el.nativeElement);
    }
  }

  applyMask(element: HTMLInputElement) {
    let s = element.value.replace(/[_\W]+/g, '');
    //let n = s.length;
    let m = '99/99/9999';

    VMasker(element).maskPattern(m);
  }

  private toDate(value: string): Date {
    if (value && value.length == 10) {
      let from: number[] = value.split('/').map(item => Number.parseInt(item));

      if (from[0] == 0 || from[0] > 31 || from[1] == 0 || from[1] > 12) {
        return null;
      }

      return new Date(from[2], from[1] - 1, from[0]);
    }
    return null;
  }
}
