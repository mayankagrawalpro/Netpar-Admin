
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {MdListModule} from '@angular/material';
import { Component, OnInit,ViewContainerRef,ViewChild } from '@angular/core';
import { ToastsManager , Toast} from 'ng2-toastr';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';
import { ReactiveFormsModule,FormControlDirective,FormControl ,NgForm} from '@angular/forms';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { MdProgressBar} from '@angular/material';
import { DialogComponent} from './dialog/dialog.component';
import {DataTableModule} from "angular2-datatable";


import {AddSectionRequest} from '../../models/section.modal'
import {SectionService} from '../../providers/section.service'
import {AppProvider} from '../../providers/app.provider'
declare var jquery:any;
declare var $ :any;


@Component({
    selector: 'app-view-section',
    templateUrl: './view-section.component.html',
    styleUrls: ['./view-section.component.scss'],
    providers:[SectionService]
})

export class ViewSectionComponent implements OnInit {
    waitLoader:boolean;
    sectiondata=[];
    flag;
    statusData:any
    constructor(private dialog: MdDialog,
                private router: Router,
                private fb: FormBuilder,
                vcr: ViewContainerRef,
                public toastr: ToastsManager,
                private http: Http,
                private sectionService:SectionService,
                private appProvider: AppProvider) { }

    ngOnInit() {
        $('.filter-plugin > a').on('click',function(){
            $(this).closest('.filter-plugin').addClass('open');
            console.log($(this));
        });
        $('.close-filter').on('click',function(){
            $(this).closest('.filter-plugin').removeClass('open');
        });
        $('.cusdropdown-toggle').on('click',function(){
            alert('hy');
            $(this).closest('.dropdown').toggleClass('open');
        })
        $(window).on('click',function(e){
            e.stopPropagation();
            var $trigger = $(".cusdropdown-toggle").closest('.dropdown');
            console.log($trigger);
            if($trigger !== e.target && !$trigger.has(e.target).length){
              $('.cusdropdown-toggle').closest('.dropdown').removeClass('open');
            }
        });
         this.sectionService.onGetSectionData()
                .subscribe(data => {
                    this.waitLoader = false;
                    if (data.success == false) {                        
                        this.toastr.error('Add Section  failed Please try again', 'Error !!. ', {
                            toastLife: 3000,
                            showCloseButton: true
                        });
                    }
                    else if (data.success == true) {
                         let local=data.FinalArray;
                         for(let i=0;i<local.length;i++){
                                var obj=local[i];
                                console.log(JSON.stringify(obj))
                                if (obj.section_categories.length>0) {
                                        for(let j=0;j<obj.section_categories.length;j++){
                                            var obj2=obj.section_categories[j]
                                          if (obj2.section_subcategories.length>0) {
                                            for(let k=0;k<obj2.section_subcategories.length;k++){
                                                var obj3=obj2.section_subcategories[k]
                                                this.sectiondata.push(obj3)
                                             }
                                            }else{

                                             this.sectiondata.push(obj2)
                                            }
                                      
                                    }
                                }else{
                                    this.sectiondata.push(obj)
                                }
                         }
                         console.log(JSON.stringify(this.sectiondata))
                    }                 
                },error=>{
                  
                })
    }
    openDiv(e,flag,data){
      $('.dropdown').removeClass('open');
      this.flag=flag;
      if (this.flag=='section') {
        let id 
          if (data.sectionId) {
               id=data.sectionId
          }else{
               id=data._id
          }
          this.getSectionData(id,e)
      }
      else if (this.flag=='category') {
        let id 
          if ( data.categoryId) {
               id=data.categoryId
          }else{
               id=data._id
          }
        this.getCategoryData(id,e)
      }
      else if (this.flag=='subCategory') {
        let id=data._id
        this.getSubCategoryData(id,e)

      }
       console.log(JSON.stringify(this.flag))
      
      console.log(JSON.stringify(data))
    }
    openDialog(): void {
        let dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });
    }
  showSectionName(name,index){
    if (index>0) {
        if(this.sectiondata[index-1].sectionName==name){
           return false; 
        }else{
          return true;   
        }  
      }else{
          return true; 
      }
  
  }
  showCategoryName(name,index){
   if (index>0) {
        if(this.sectiondata[index-1].categoryName==name){
           return false; 
        }else{
          return true;   
        } 
      }else{
          return true; 
      }
  }
  showSubcategoryName(name,index){
     if (index>0) {
        if(this.sectiondata[index-1].subCategoryName==name){
           return false; 
        }else{
          return true;   
        }  
      }else{
          return true; 
      }
  }
editSection(data){
  this.appProvider.current.actionFlag="editSection"
  if (data.sectionId) {
     this.appProvider.current.currentId=data.sectionId
  }else{
    this.appProvider.current.currentId=data._id
  }
  console.log('section'+JSON.stringify(data))
   this.router.navigate(['/add-section'], {
            skipLocationChange: true
        });
}
deleteSection(data){
  if (data.sectionId) {
     this.appProvider.current.currentId=data.sectionId
  }else{
    this.appProvider.current.currentId=data._id
  }
  console.log('section'+JSON.stringify(data))
}
enableDisableSection(data){

  if (data.sectionId) {
     this.appProvider.current.currentId=data.sectionId
  }else{
    this.appProvider.current.currentId=data._id
  }
   console.log('section'+JSON.stringify(data))
}
publishUnpublishSection(data){
 
  if (data.sectionId) {
     this.appProvider.current.currentId=data.sectionId
  }else{
    this.appProvider.current.currentId=data._id
  }
   console.log('section'+JSON.stringify(data))
}
editCategory(data){
 this.appProvider.current.actionFlag="editCategory"
  if (data.categoryId) {
     this.appProvider.current.currentId=data.categoryId
  }else{
    this.appProvider.current.currentId=data._id
  }
   console.log('Category'+JSON.stringify(data))
   this.router.navigate(['/add-category'], {
            skipLocationChange: true
    });
}
deleteCategory(data){
  
  if (data.categoryId) {
     this.appProvider.current.currentId=data.categoryId
  }else{
    this.appProvider.current.currentId=data._id
  }
   console.log('Category'+JSON.stringify(data))
}
enableDisableCategory(data){
  
  if (data.categoryId) {
     this.appProvider.current.currentId=data.categoryId
  }else{
    this.appProvider.current.currentId=data._id
  }
   console.log('Category'+JSON.stringify(data))
}
publishUnpublishCategory(data){
  
  if (data.categoryId) {
     this.appProvider.current.currentId=data.categoryId
  }else{
    this.appProvider.current.currentId=data._id
  }
   console.log('Category'+JSON.stringify(data))
}
editSubCategory(data){
  this.appProvider.current.actionFlag="editSubCategory"
   this.appProvider.current.currentId=data._id;
     console.log('SubCategory'+JSON.stringify(data))
  this.router.navigate(['/add-subcategory'], {
            skipLocationChange: true
  });
}
deeSubCategory(data){
    this.appProvider.current.currentId=data._id;
  console.log('SubCategory'+JSON.stringify(data))
}
enableDisableSubCategory(data){
    this.appProvider.current.currentId=data._id;
  console.log('SubCategory'+JSON.stringify(data))
}
publishUnpublishSubCategory(data){
    this.appProvider.current.currentId=data._id;
  console.log('SubCategory'+JSON.stringify(data))
}
getSectionData(id,e){
    this.sectionService.onGetSingleSectionData(id)
        .subscribe(data => {
                    this.waitLoader = false;
                    if (data.success == false) {                        
                        this.toastr.error('Add Section  failed Please try again', 'Error !!. ', {
                            toastLife: 3000,
                            showCloseButton: true
                        });
                    }
                    else if (data.success == true) {
                     this.statusData=data.response[0];
                     $(e).closest('.dropdown').toggleClass('open');
                      
                    }                 
                },error=>{
                  
                })
}

getCategoryData(id,e){
   this.sectionService.onGetSingleSCategoryData(id)
            .subscribe(data =>{
                        this.waitLoader = false;
                        this.statusData=data.response[0]
                        $(e).closest('.dropdown').toggleClass('open');
                    console.log(JSON.stringify(data))
                },error=>{
                    alert(error)
                }) 
}
getSubCategoryData(id,e){
            this.sectionService.onGetSingleSubCategoryData(id)
            .subscribe(data =>{
                        this.waitLoader = false;
                        this.statusData=data.response[0]
                        $(e).closest('.dropdown').toggleClass('open');
                    console.log(JSON.stringify(data))
                },error=>{
                    alert(error)
                }) 

}

}