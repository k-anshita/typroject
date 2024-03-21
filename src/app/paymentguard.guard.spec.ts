import { TestBed } from '@angular/core/testing';

import { PaymentguardGuard } from './paymentguard.guard';

describe('PaymentguardGuard', () => {
  let guard: PaymentguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaymentguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
