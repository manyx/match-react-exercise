import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./photo-preview.component.scss'],
  templateUrl: './photo-preview.component.html'
})
export class PhotoPreviewComponent {
  @Input() size = '35px';

  private _photoURL: string;
  @Input() set photoURL(value) {
    this._photoURL = value;
    this.cdr.markForCheck();
  }

  get photoURL(): string {
    return this._photoURL;
  }

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }
}
