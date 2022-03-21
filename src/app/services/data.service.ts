import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class DataService {
    isDarkMode: boolean=false;

    darkModeChange: Subject<boolean> = new Subject<boolean>();

    constructor()  {
        this.darkModeChange.subscribe((value) => {
            this.isDarkMode = value
        });
    }

    toggleDarkMode() {
        this.darkModeChange.next(!this.isDarkMode);
    }
}