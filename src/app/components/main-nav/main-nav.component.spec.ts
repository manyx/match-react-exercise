import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MainNavComponent } from '@components/main-nav/main-nav.component';
import { StateService } from '@core/services/state.service';
import { UserService } from '@core/services/users.service';
import { ToastrServiceStub } from '@core/tests/services/mock-toastr-service.service';
import { MaterialModule } from '@shared/material.module';
import { configureTestSuite } from 'ng-bullet';
import { ToastrService } from 'ngx-toastr';

/* I only added this unit test as an example */

describe('MainNavComponet', () => {
    let component: MainNavComponent;
    let fixture: ComponentFixture<MainNavComponent>;
    let debugElement: DebugElement;
    let stateService: StateService;
    let usersService: UserService;
    let toastrService: ToastrService;
    let route: ActivatedRoute;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule,
                RouterTestingModule,
                FormsModule,
                HttpClientTestingModule,
                FlexLayoutModule,
                MaterialModule,
                NoopAnimationsModule
            ],
            declarations: [
                MainNavComponent
            ],
            providers: [
                {provide: ToastrService, useClass: ToastrServiceStub},
                {provide: UserService},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideComponent(MainNavComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default
                }
            });
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(MainNavComponent);
        stateService = TestBed.inject(StateService);
        usersService = TestBed.inject(UserService);
        toastrService = TestBed.inject(ToastrService);
        route = TestBed.inject(ActivatedRoute);
        debugElement = fixture.debugElement;
        component = debugElement.componentInstance;
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render the maintenance component if the current path is "under-maintenance"', async () => {
        component.user = {
            id: '1',
            name: 'test',
            email: 'test@test.com',
            photo_url: 'https://scontent.fotp3-2.fna.fbcdn.net/v/t1.6435-9/130769724_10222596772642410_1074526184963484338_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=gOOwmqmfdsMAX-zG2_k&_nc_ht=scontent.fotp3-2.fna&oh=e21bc2133b8b872bcfda771c570617c8&oe=60D25DFE',
            pass: 'test'
        };
        fixture.detectChanges();
        const mainMenu = debugElement.query(By.css('.main-menu'));
        expect(mainMenu).not.toEqual(null);
    });
});
