import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  date:any;
  showMessage:boolean=false;
  message:any;
  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<DragDropComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { 
  	this.date={}
  }

  ngOnInit() {
  	alert(JSON.stringify(this.data))
  }
 checkStartDate(){
  let d=new Date()
  if ((new Date(d).getTime()) >(new Date(this.date.start).getTime())) {
      this.showMessage=true
      this.message="Start Date must be greater than current date !!"
  } else {
    if (this.date.end) {
      if ((new Date(this.date.end).getTime()) < (new Date(this.date.start).getTime())) {
         this.showMessage=true
         this.message="End Date can't be less than start date !!"
      } else {
          this.showMessage=false
      }
    }else{
          this.showMessage=false
    }
     
  }
 }
 checkEndDate(){
  if ((new Date(this.date.end).getTime()) < (new Date(this.date.start).getTime())) {
     this.showMessage=true
     this.message="End Date can't be less than start date !!"
  } else {
     this.showMessage=false
  }
 }
  submit(){
    var tzoffset = (new Date(this.date.start)).getTimezoneOffset() * 60000;
    var localISOTimeStart = (new Date(this.date.start - tzoffset)).toISOString().slice(0,-1)
    var localISOTimeEnd = (new Date(this.date.end - tzoffset)).toISOString().slice(0,-1)
    let a={
        flag:this.data.flag,
        startDate:localISOTimeStart,
        endDate:localISOTimeEnd
    }
  	this.dialogRef.close(a)
  }
}
