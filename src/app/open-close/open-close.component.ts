import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Consts } from './constants';

@Component({
  selector: 'app-open-close',
  templateUrl: './open-close.component.html',
  styleUrls: ['./open-close.component.css']
})
export class OpenCloseComponent implements OnInit {
  frm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.frm = new FormGroup({
      data: new FormArray([])
    });
    this.initControl();
  }
  initControl() {
    const datacontrol = this.frm.controls.data as FormArray;
    for (const item of Consts.data_days) {
      datacontrol.push(
        new FormGroup({
          day_of_week: new FormControl(item.day_of_week),
          is_open: new FormControl(item.is_open),
          times: new FormArray([])
        })
      );
    }
    console.log(this.frm);
  }

  getLabel(i: number) {
    return Consts.data_days.find(item => item.day_of_week === i)['label'];
  }
  changeIsOpen(event) {
    console.log(event);
  }
}
