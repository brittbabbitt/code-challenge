import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import TESTDATA from '@components/mockData.test';

import { JobTableComponent } from './job-table.component';

describe('JobTableComponent', () => {
  let component: JobTableComponent;
  let fixture: ComponentFixture<JobTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Select Bar notification', () => {

    it('should show if there is no monthlyInputTableData available', () => {
      const selectBar = fixture.debugElement.query(By.css('#selectBar'));
      expect(selectBar).toBeTruthy();
    })

    it('should not show if there is monthlyInputTableData available', () => {
      component.monthlyInputTableData = TESTDATA.jobsByMonth;
      fixture.detectChanges();

      const selectBar = fixture.debugElement.query(By.css('#selectBar'));
      expect(selectBar).toBeFalsy();
    })
  })

  describe('Table Headers', () => {

    beforeEach(() => {
      component.monthlyInputTableData = TESTDATA.jobsByMonth;
      fixture.detectChanges();
    });

    it('should have a header of #', () => {
      const tableHeader = fixture.debugElement.queryAll(By.css('[scope="col"]'));
      const element = tableHeader[0].nativeElement;
      expect(element.innerText).toBe('#');
    })

    it('should have a header of Title', () => {
      const tableHeader = fixture.debugElement.queryAll(By.css('[scope="col"]'));
      const element = tableHeader[1].nativeElement;
      expect(element.innerText).toBe('Title');
    })

    it('should have a header of Organization', () => {
      const tableHeader = fixture.debugElement.queryAll(By.css('[scope="col"]'));
      const element = tableHeader[2].nativeElement;
      expect(element.innerText).toBe('Organization');
    })

    it('should have a header of Location', () => {
      const tableHeader = fixture.debugElement.queryAll(By.css('[scope="col"]'));
      const element = tableHeader[3].nativeElement;
      expect(element.innerText).toBe('Location');
    })

    it('should have a header of Published', () => {
      const tableHeader = fixture.debugElement.queryAll(By.css('[scope="col"]'));
      const element = tableHeader[4].nativeElement;
      expect(element.innerText).toBe('Published');
    })

  });

  describe('Table Contents', () => {

    beforeEach(() => {
      component.monthlyInputTableData = TESTDATA.jobsByMonth;
      fixture.detectChanges();
    });

    it('it should have at least 1 record', () => {
      const tableRow = fixture.debugElement.queryAll(By.css('[scope="row"]'));
      expect(tableRow.length).toBeGreaterThan(0);
    });

    it('it should show 4 feilds of context', () => {
      const tableRow = fixture.debugElement.queryAll(By.css('td'));
      expect(tableRow.length).toBe(4);
    });

  });

});
