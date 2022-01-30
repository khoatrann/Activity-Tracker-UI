import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor() { }

    callMe(): void {
        console.log("from data service");
    }
}