import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Product, Review } from '../../shared/models';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getDefaultReview } from './reviews.aux';

@Component({
  selector: 'shoppers-point-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  @Input() product: Product | undefined;
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() model: Review = getDefaultReview();
  @Output() submitReview: EventEmitter<Review> = new EventEmitter<Review>();
  fields: FormlyFieldConfig[] = this.#getReviewFieldsConfig();
  activeId = 3;

  onRatingChanged(rate: number): void {
    this.form.patchValue({
      rating: { rate }
    });
  }

  onSubmitReview(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitReview.emit(this.form.value);
    this.form.reset();
  }

  #getReviewFieldsConfig() {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'd-none',
            fieldGroup: [
              {
                key: 'rating.rate',
                props: {
                  required: true
                }
              }
            ]
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col form-group',
            fieldGroup: [
              {
                key: 'message',
                type: 'textarea',
                props: {
                  id: 'review',
                  type: 'text',
                  placeholder: 'Your Review',
                  className: 'form-control',
                  required: true
                }
              }
            ]
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col form-group',
            fieldGroup: [
              {
                key: 'name',
                type: 'input',
                props: {
                  label: 'Your Name',
                  placeholder: 'John Doe',
                  className: 'form-control',
                  required: true
                }
              }
            ]
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col form-group',
            fieldGroup: [
              {
                key: 'email',
                type: 'input',
                props: {
                  label: 'E-mail',
                  placeholder: 'example@email.com',
                  className: 'form-control',
                  required: true
                }
              }
            ]
          }
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col btn-row',
            fieldGroup: [
              {
                type: 'button',
                props: {
                  text: 'Leave Your Review',
                  btnType: 'submit',
                  btnClass: 'btn-primary',
                  onClick: this.onSubmitReview.bind(this)
                }
              }
            ]
          }
        ]
      }
    ];
  }
}
