import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMovie } from '../../interfaces';

@Component({
  selector: 'app-user-picture-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  @Input() movie: IMovie;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PhotoModalComponent>,
  ) {
  }

  ngOnDestroy() {
  }

  ngOnInit() {

  }

  close(): void {
    this.dialogRef.close();
  }
}
