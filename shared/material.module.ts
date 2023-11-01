import { NgModule } from '@angular/core';

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSidenavModule,
        MatTableModule,
        MatMenuModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
    ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSidenavModule,
        MatTableModule,
        MatMenuModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
    ]
    
  })
  export class MaterialModule { }
  