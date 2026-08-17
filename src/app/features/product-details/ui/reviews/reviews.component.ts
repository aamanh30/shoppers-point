import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Product, Review } from '@shoppers-point/shared-ui';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { getDefaultReview } from './reviews.aux';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { getReviewFieldsConfig } from './review-fields';

@Component({
  selector: 'shoppers-point-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    NgbNavModule,
    SharedModule,
    FormlyModule,
    ReactiveFormsModule,
  ],
})
export class ReviewsComponent {
  product = input<Product | undefined>();
  model = input<Review>(getDefaultReview());
  submitReview = output<Review>();
  form: UntypedFormGroup = new UntypedFormGroup({});
  fields: FormlyFieldConfig[] = getReviewFieldsConfig(
    this.onSubmitReview.bind(this)
  );
  activeId = 1;

  onRatingChanged(rate: number): void {
    this.form.patchValue({
      rating: { rate },
    });
  }

  onSubmitReview(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitReview.emit(this.form.value);
    this.form.reset();
  }
}
