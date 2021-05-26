import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject, Input,
    OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../interfaces';
import { UserService } from '../../core/services/users.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent implements OnInit {
    form: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        pass: ['', [Validators.required]],
    });
    user: IUser;

    constructor(
        private cdr: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<LoginModalComponent>,
        private fb: FormBuilder,
        private usersService: UserService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {

    }

    close(): void {
        this.dialogRef.close();
    }

    login(): void {
        if (this.form.value.pass && this.form.value.email) {
            this.dialogRef.close(
                this.form.value
            );
        } else {
            this.toastr.warning('Please fill email and password fields!');
        }
    }
}
