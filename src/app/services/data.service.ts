import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class DataService {
    item: any;
    constructor() { }

    setItem(value: any): void {
        this.item = value;
    }
}