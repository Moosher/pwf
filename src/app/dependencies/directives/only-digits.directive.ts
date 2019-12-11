import { Directive, ElementRef, HostListener, forwardRef, Input } from '@angular/core';
import { VMasker } from 'vanilla-masker';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var require: any;
var VMasker = require('vanilla-masker');

@Directive({
  selector: '[OnlyDigitsMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OnlyDigitsMaskDirective),
    multi: true
  }]
})
export class OnlyDigitsMaskDirective implements ControlValueAccessor {
  @Input() limit: number;

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
    this._onChange(VMasker.toNumber($event.clipboardData.getData('text')));
  }

  @HostListener('cut', ['$event'])
  onCut($event: any) {
    this.applyMask($event.target);
    this._onChange(VMasker.toNumber($event.target.value));
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    this.applyMask($event.target);
    this._onChange(VMasker.toNumber($event.target.value));
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
    var s = element.value;
    var s = s.replace(/[_\W]+/g, '');
    var n = s.length;

    if (this.limit) {
      var m = "";
      for (let i = 0; i < this.limit; i++) {
        m += "9";
      }
    } else {
      var m = '99'
    }
    VMasker(element).maskPattern(m);
  }
}
