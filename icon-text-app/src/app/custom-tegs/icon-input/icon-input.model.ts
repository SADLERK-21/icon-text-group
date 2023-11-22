import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { IconInputComponent } from "./icon-input.component";
import { FormsModule } from "@angular/forms";


@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        IconInputComponent
    ],
    exports: [
        IconInputComponent
    ]
})
export class IconInputModule { }