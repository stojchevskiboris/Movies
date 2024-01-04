import { Component, DoCheck, ElementRef, Input, OnChanges, OnInit, ViewChild } from "@angular/core";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements DoCheck {
    @ViewChild('nbSupportedContent') nbSupportedContent: ElementRef
    @ViewChild('manageDropdown') manageDropdown: ElementRef
    @ViewChild('btn') btn: ElementRef

    constructor() { }
    ngDoCheck(): void { }

    collapseNavbar() {
        if (window.innerWidth < 768) {
            this.btn.nativeElement.click()
        }
        
    }
}



