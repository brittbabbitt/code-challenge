import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { JobsStore } from '@stores/jobs-store.store';

import { JobContainerComponent } from './job-container.component';

describe('JobContainerComponent', () => {

  let component: JobContainerComponent;
  let fixture: ComponentFixture<JobContainerComponent>;
  let store: JobsStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobContainerComponent, HttpClientModule],
      providers: [JobsStore]
    })
    .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(JobContainerComponent);
    store = fixture.debugElement.injector.get(JobsStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setNewJobsByMonth', () => {

    it('should call setNewJobsByMonth with params only once', () => {
      const compSpy = spyOn(component, 'setNewJobsByMonth');
      component.setNewJobsByMonth('JAN');
      expect(compSpy).toHaveBeenCalledOnceWith('JAN');
    });

    it('should call the JobsStore setNewJobsByMonth', () => {
      const storeSpy = spyOn(store, 'setNewJobsByMonth');
      component.setNewJobsByMonth('JAN');
      expect(storeSpy).toHaveBeenCalled();
    });

  });

  describe('ngOnInit', () => {

    it('should call the JobsStore getJobDescriptions', () => {
      const storeSpy = spyOn(store, 'getJobDescriptions');
      component.ngOnInit();
      expect(storeSpy).toHaveBeenCalled();
    });

    it('should call setInitMonthlyNames', () => {
      const initMonthlyNamesSpy = spyOn<any>(component, 'setInitMonthlyNames');
      component.ngOnInit();
      expect(initMonthlyNamesSpy).toHaveBeenCalled();
    });

    it('should call addMonthlyDescriptions', () => {
      const monthlyDescriptionsSpy = spyOn<any>(component, 'addMonthlyDescriptions');
      component.ngOnInit();
      expect(monthlyDescriptionsSpy).toHaveBeenCalled();
    });

  });

});
