import { Component, OnInit } from '@angular/core';
import RegisterUser from '../RegisterUser';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = {
    userName: "",
    password: "",
    password2: ""
  };
  warning: string = "";
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        ()=>{
          this.success = true;
          this.warning = "";
          this.loading = false;
        },
        err=>{
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      )
    }
}
