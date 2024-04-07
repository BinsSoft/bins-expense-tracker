import {Component, Inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AutocorrectService} from "./autocorrect.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../../service/common.service";
import {TransactionService} from "../../../service/transaction.service";
import {RestService} from "../../../service/rest.service";
@Component({
  selector: 'app-speek-to-transaction',
  templateUrl: './speek-to-transaction.component.html',
  styleUrls: ['./speek-to-transaction.component.scss']
})
export class SpeekToTransactionComponent implements OnInit, OnDestroy {

  boo = false;
  speech: string = '';
  voice = ''
  speechRecognition: any = null;
  actionForm: FormGroup;
  date: any = new Date();
  addToFavorites:any = false;

  favoritesSha: any =null;
  favoritesList:any =[];
  constructor(
    private restService: RestService,
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private autocorrectService: AutocorrectService,
    private commonService: CommonService,
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<SpeekToTransactionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    const w:any = window;
    const locale = 'en-US';
    const SpeechRecognition:any = w['webkitSpeechRecognition'];
    this.speechRecognition = new SpeechRecognition();
    this.speechRecognition.continuous = true;
    this.speechRecognition.interimResults = true;
    this.speechRecognition.lang = locale;
    if (this.data.item) {
      this.actionForm = this.fb.group({
        i: [this.data.item.i],
        t: [this.data.item.t, [Validators.required]],
        a: [this.data.item.a, [Validators.required]],
        d: [new Date(this.data.item.d), [Validators.required]],
        c: [''],
        // f: [this.data.item.f],
        r_i: [this.data.item.r_i]
      });
      this.speech = this.voice = this.data.item.c;
      this.date = new Date(this.data.item.d);
      this.boo = true;
    } else {
      this.actionForm = this.fb.group({
        i: [this.data.newId],
        t: [this.data.type, [Validators.required]],
        a: [null, [Validators.required]],
        d: [new Date(), [Validators.required]],
        c: [''],
        // f: [false],
        r_i: [this.data.r_i]
      })
      this.speech = this.voice = this.data.c;
    }
  }

  ngOnInit(): void {
    // if (!this.data.item) {
    //   this.recognize();
    // }
  }


  getTranscript({ locale = 'en-US' }: { locale?: string } = {}): Observable<string> {

    return new Observable(observer => {

      this.speechRecognition.onresult = (speechRecognitionEvent:any) => {
        var interim_transcript = '';
        for (var i = speechRecognitionEvent.resultIndex; i < speechRecognitionEvent.results.length; ++i) {
          if (speechRecognitionEvent.results[i].isFinal) {
            this.boo = true;
            this._ngZone.run(() => observer.next(speechRecognitionEvent.results[i][0].transcript.trim()));
            this.speechRecognition.stop();
          }
          else {
            this.boo = false;
            interim_transcript += speechRecognitionEvent.results[i][0].transcript;
            this._ngZone.run(() => observer.next(interim_transcript.trim()));
          }

        }
      };


      return () => this.speechRecognition.abort();
    });
  }
  recognize() {
    this.voice = '';
    this.speech = '';
    this.speechRecognition.start();
    this.getTranscript()
      .subscribe(transcript => {
        if (transcript !== '' && this.boo) {
          this.voice = this.voice + ' '+ transcript;
        }
        else
        {
          this.speech = transcript
        }

        if(this.boo) {
            this.textAnalise();
        }
      });
  }

  textAnalise() {
    this.voice = this.speech.trim();
    if (this.voice) {

      this.voice = this.autocorrectService.autoCorrect(this.voice);
      const amount = this.voice.replace(/[^0-9]/g,"");
      if (amount) {
        this.actionForm.get('a')?.setValue(Number(amount));
      }
      this.actionForm.get('c')?.setValue(this.voice);
      this.actionForm.get('d')?.setValue(this.date.getTime())
      return this.voice.replace(amount,'');
    }
    return "";
  }

  ngOnDestroy(): void {
    this.speechRecognition.stop();
  }


  saveAction() {

    const content = this.textAnalise();

    if (this.actionForm.valid) {

      if (this.addToFavorites) {
        const mobileNo: any = window.localStorage.getItem('_user');
        this.restService.getContent(mobileNo+'/favorites.json').subscribe((response:any)=>{
          this.favoritesSha = response.sha;
          this.favoritesList = JSON.parse(atob(response.content));

          const newFavoriteItem = {
            i: this.favoritesList.length + 1,
            c: content
          };
          this.actionForm.value.r_i = newFavoriteItem.i;
          this.favoritesList.push(newFavoriteItem);
          this.restService.update(mobileNo + '/favorites.json', 'Update favorites item of ' + mobileNo, this.favoritesList, this.favoritesSha).subscribe((response: any) => {
            this.saveTransaction();
          });
        });
      } else if (this.actionForm.value.r_i) {
        const mobileNo: any = window.localStorage.getItem('_user');
        this.restService.getContent(mobileNo+'/favorites.json').subscribe((response:any)=>{
          this.favoritesSha = response.sha;
          this.favoritesList = JSON.parse(atob(response.content));

          let index = this.favoritesList.findIndex((f:any)=>f.i == this.actionForm.value.r_i);
          this.favoritesList[index].l_p_t = this.actionForm.value.d;
          this.restService.update(mobileNo + '/favorites.json', 'Update fav item of ' + mobileNo, this.favoritesList, this.favoritesSha).subscribe((response: any) => {

            this.saveTransaction();
          });
        });
        this.saveTransaction();
      } else {
        this.saveTransaction();
      }
      this.dialogRef.close();
    }
  }
  saveTransaction() {
    if (!this.data.item) { // add new item
      const transactions = this.commonService.getTransactionList();
      transactions.push(this.actionForm.value);
      this.commonService.setTransaction(transactions);
    } else { // edit existing item
      if ((this.data.item.c == this.actionForm.value.c) && this.data.item.t == this.actionForm.value.t){ return  ; }
      this.transactionService.editTransactions(this.actionForm.value);
    }
  }
}
