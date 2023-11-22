import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'icon-input',
  templateUrl: './icon-input.component.html',
  styleUrls: ['./icon-input.component.scss']
})
export class IconInputComponent implements OnInit {
  @Input() public title: string = '';
  @Input() public type: IconInputType = IconInputType.Text
  @Input() public isDisabled: boolean = false;
  @Input() public isValid: boolean = true;
  @Input() public text: string = '';
  @Output() public textChange = new EventEmitter<string>();

  public maxLenght: number = this.type === IconInputType.Text ? 255 : 10;

  constructor() { }

  ngOnInit(): void {
  }

  public get conditionStyle(): string {
    if (this.isDisabled) {
      return 'background-color: #444444; color: #6d6d6d; border: 2px solid #444444;';
    } else if (!this.isValid) {
      return 'border: 2px solid #ad0101;';
    }
    return '';
  }

}

export enum IconInputType {
  Text = 'text',
  Email = 'email',
  Number = 'number',
  Password = 'password'
}

export interface iconInputValidObject {
  isValid: boolean;
  validErorMessage: string;
}