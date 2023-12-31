import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';

describe('App Routing', () => {
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule],
      declarations: [
        AppComponent,
        PostsComponent,
        HeaderComponent,
        CustomButtonComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should navigate to the default path', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/posts');
    });
  }));
});
