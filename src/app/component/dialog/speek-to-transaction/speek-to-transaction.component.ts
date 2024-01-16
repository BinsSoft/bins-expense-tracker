import {Component, Inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AutocorrectService} from "./autocorrect.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../../service/common.service";
import {TransactionService} from "../../../service/transaction.service";
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
  constructor(

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
        c: ['']
      });
      this.speech = this.voice = this.data.item.c;
      this.boo = true;
      // console.log(this.speech)
    } else {
      this.actionForm = this.fb.group({
        i: [this.data.newId],
        t: [this.data.type, [Validators.required]],
        a: [null, [Validators.required]],
        d: [new Date(), [Validators.required]],
        c: ['']
      })
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
      this.speechRecognition.start();

      return () => this.speechRecognition.abort();
    });
  }
  recognize() {
    this.voice = '';
    this.speech = '';
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
    }
  }

  ngOnDestroy(): void {
    this.speechRecognition.stop();
  }


  saveTransaction() {
    this.textAnalise();
    if (!this.data.item) { // add new item
      const transactions = this.commonService.getTransactionList();
      transactions.push(this.actionForm.value);
      this.commonService.setTransaction(transactions);
    } else { // edit existing item
      this.transactionService.editTransactions(this.actionForm.value);
    }
    this.dialogRef.close();
  }
}
