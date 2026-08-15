import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList,
  Renderer2
} from '@angular/core';
import { NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';
import { AccordionComponent } from 'ngx-bootstrap/accordion';

@Directive({
    selector: '[confusedDeveloperSharedExpandCollapseAll]',
    standalone: false
})
export class ExpandCollapseAllDirective implements AfterViewInit {
  @ContentChildren(NgbAccordionDirective)
  ngbAccordions: QueryList<NgbAccordionDirective> | undefined;

  @ContentChildren(AccordionComponent) accordions:
    | QueryList<AccordionComponent>
    | undefined;
  constructor(private elemRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const accodions = [
      ...(this.ngbAccordions?.toArray() ?? []),
      ...(this.accordions?.toArray() ?? [])
    ];
    if (!accodions.length) {
      throw new Error('No accordions found');
    }
    const spanElement = this.#createElement('span', '', '', undefined);

    this.renderer.appendChild(
      spanElement,
      this.#createElement(
        'button',
        'expand all',
        'btn primary',
        this.expandAll.bind(this)
      )
    );

    this.renderer.appendChild(
      spanElement,
      this.#createElement(
        'button',
        'collapse all',
        'btn secondary',
        this.collapseAll.bind(this)
      )
    );

    this.renderer.insertBefore(
      this.elemRef.nativeElement.parentNode,
      spanElement,
      this.elemRef.nativeElement
    );
  }

  expandAll(): void {
    this.accordions?.toArray().forEach(accordion => {
      accordion['groups'].forEach(group => (group.isOpen = true));
    });
    this.ngbAccordions
      ?.toArray()
      .forEach(ngbAccordion => ngbAccordion.expandAll());
  }

  collapseAll(): void {
    this.accordions?.toArray().forEach(accordion => {
      accordion['groups'].forEach(group => (group.isOpen = false));
    });
    this.ngbAccordions
      ?.toArray()
      .forEach(ngbAccordion => ngbAccordion.collapseAll());
  }

  #createElement(
    elementType: string,
    textContent = '',
    classList = '',
    onClick: ((event: Event) => void) | undefined
  ): HTMLElement {
    const element = this.renderer.createElement(elementType);
    if (classList) element.classList.add(...classList.split(' '));
    if (textContent) element.textContent = textContent;
    if (element instanceof HTMLButtonElement) element.type = 'button';
    if (onClick) element.onclick = onClick;

    return element;
  }
}
