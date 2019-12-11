import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSolicitarProdutosComponent } from './dialog-solicitar-produtos.component';

describe('DialogSolicitarProdutosComponent', () => {
  let component: DialogSolicitarProdutosComponent;
  let fixture: ComponentFixture<DialogSolicitarProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSolicitarProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSolicitarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
