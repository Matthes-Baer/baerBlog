// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { By } from '@angular/platform-browser';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';

// import { SinglePostComponent } from './single-post.component';
// import { PostsService } from 'src/app/services/posts-service.service';

// describe('SinglePostComponent', () => {
//   let component: SinglePostComponent;
//   let fixture: ComponentFixture<SinglePostComponent>;

//   const activatedRouteMock = {
//     snapshot: {
//       paramMap: jasmine.createSpyObj('ParamMap', ['get']),
//     },
//     params: of({ id: '1' }), // default value
//   };

//   beforeEach(() => {
//     // Set default return value for the paramMap.get spy
//     activatedRouteMock.snapshot.paramMap.get.and.returnValue('1');

//     TestBed.configureTestingModule({
//       declarations: [SinglePostComponent],
//       imports: [HttpClientTestingModule], // <-- Added this line
//       providers: [
//         { provide: ActivatedRoute, useValue: activatedRouteMock },
//         PostsService, // <-- Provided your service here
//       ],
//     });
//     fixture = TestBed.createComponent(SinglePostComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should handle id = 1', () => {
//     const httpTestingController = TestBed.inject(HttpTestingController);

//     const mockPostData = {
//       id: 1,
//       title:
//         'How to use the _UnhandledInput built-in function' /*...otherFieldsHere*/,
//     };

//     const req = httpTestingController.expectOne('assets/postsData.json');
//     req.flush([mockPostData]);

//     const h1Element = fixture.debugElement.query(By.css('h1')).nativeElement;
//     expect(h1Element.textContent).toContain(
//       'How to use the _UnhandledInput built-in function'
//     );

//     httpTestingController.verify();
//   });

//   it('should handle id = 2', () => {
//     const httpTestingController = TestBed.inject(HttpTestingController);

//     // Update the mock to return '2' for the post ID
//     activatedRouteMock.snapshot.paramMap.get.and.returnValue('2');

//     const mockPostData = {
//       id: 2,
//       title:
//         'How to find the longest identical substring/s in two strings' /*...otherFieldsHere*/,
//     };

//     const req = httpTestingController.expectOne('assets/postsData.json');
//     req.flush([mockPostData]);

//     // Trigger change detection manually to reflect changes in the rendered component
//     fixture.detectChanges();

//     const h1Element = fixture.debugElement.query(By.css('h1')).nativeElement;
//     expect(h1Element.textContent).toContain(
//       'How to find the longest identical substring/s in two strings'
//     );

//     httpTestingController.verify();
//   });

//   // Add more test cases as needed for different IDs or other scenarios.
// });
