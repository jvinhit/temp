import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Consts } from './constants';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-open-close',
    templateUrl: './open-close.component.html',
    styleUrls: ['./open-close.component.css']
})
export class OpenCloseComponent implements OnInit {
    frm: FormGroup;
    dataTimes = Consts.dataTimes;
    constructor() {}

    ngOnInit() {
        this.frm = new FormGroup({
            data: new FormArray([])
        });
        this.initControl();
    }
    initControl() {
        const dataControl = this.frm.controls.data as FormArray;
        for (const item of Consts.dataConfig) {
            const __item = new FormGroup({
                day_of_week: new FormControl(item.day_of_week),
                is_open: new FormControl(item.is_open),
                is_open_all_day: new FormControl(item.is_open_all_day),
                times: new FormArray([])
            });
            dataControl.push(__item);
        }
    }

    getLabelDay(i: number): string {
        return Consts.dataConfig.find(item => item.day_of_week === i)['label'];
    }

    changeIsOpen(event: MatSlideToggleChange, i: number) {
        const { checked } = event;
        const dataControls = this.frm.controls.data as FormArray;
        const timeControls = dataControls.at(i).get('times') as FormArray;
        if (checked) {
            timeControls.push(this.openCloseGroup);
        } else {
            timeControls.controls.forEach((item, index) => {
                timeControls.removeAt(index);
            });
            dataControls
                .at(i)
                .get('is_open_all_day')
                .setValue(false);
        }
    }

    getTimeControls(form) {
        return form.controls.times.controls;
    }

    get openCloseGroup(): FormGroup {
        return new FormGroup({
            open_at: new FormControl(''),
            close_at: new FormControl('')
        });
    }

    openSelected(event: MatAutocompleteSelectedEvent, i: number, k: number) {
        const { value } = event.option;
        const ioaControl = (this.frm.controls.data as FormArray).at(i).get('is_open_all_day');
        ioaControl.setValue(value && value === Consts.dataTimes[0].value);
    }

    isOpenAllDay(i, k): boolean {
        const ioaControl = (this.frm.controls.data as FormArray).at(i).get('is_open_all_day');
        return ioaControl.value;
    }

    addTimeItem(parentIndex, childIndex) {
        ((this.frm.controls.data as FormArray).at(parentIndex).get('times') as FormArray).push(this.openCloseGroup);
    }

    deleteTimeItem(parentIndex, childIndex) {
        ((this.frm.controls.data as FormArray).at(parentIndex).get('times') as FormArray).removeAt(childIndex);
    }
    showAddButton(i, k, iicontrol) {
        // /!isOpenAllDay(i, k) && openAt.value && closeAt.value
        const openAtValue = iicontrol.get('open_at').value;
        const closeAtValue = iicontrol.get('close_at').value;

        return !this.isOpenAllDay(i, k) && openAtValue && closeAtValue;
    }
}
