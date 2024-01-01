import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../service/rest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authenticateon',
  templateUrl: './authenticateon.component.html',
  styleUrls: ['./authenticateon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticateonComponent implements OnInit {

  authForm: FormGroup;
  loader:boolean = false;
  message: any = {
    message:'',
    status: null
  }
  constructor(private fb: FormBuilder, private restService: RestService, private  router: Router) {
    this.authForm = this.fb.group({
      mobileNo: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  signInAction() {
    const mobileNo: any = this.authForm.value.mobileNo;
    this.restService.checkUser(mobileNo).subscribe((response:any)=>{
      if (response.length >0) {
        window.sessionStorage.setItem('_user', mobileNo);
        this.router.navigate(['/transactions']);
      }
    }, (error:any)=>{
      if (error.status == 404) {
        this.message = {
          message:'Sorry, Mobile No is not exists',
          status: false
        }
        setTimeout(()=> {
          this.message = {
            message: '',
            status: null
          }
        },3000);
      }
    });
  }
  signUpAction() {
    const mobileNo: any = this.authForm.value.mobileNo;
    this.loader = true;
    this.restService.checkUser(mobileNo).subscribe((response:any)=>{

    }, (error:any)=>{
      if (error.status == 404) {
        this.restService.create(this.authForm.value.mobileNo+'/config.json','create new config for '+mobileNo, {
          "users":[],
          "category":[]
        }).subscribe((response:any)=>{

          setTimeout(()=>{
            this.restService.create(this.authForm.value.mobileNo+'/transactions.json', 'create new transaction for '+mobileNo,[]).subscribe((response:any)=>{});
            this.loader = false;
            this.message = {
              message:'Thank you for joining...',
              status: true
            }
            setTimeout(()=>{
              this.message = {
                message:'',
                status: null
              }
            },3000)
            }, 2000)

        });


      }
    });
  }

}
