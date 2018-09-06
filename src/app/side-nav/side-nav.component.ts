import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ResourceLoader } from '@angular/compiler';
import { PersonsService } from '../services/persons-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  modalRef: BsModalRef;
  name: string;
  desc: string;
  img_url: string;
  fillerNav = Array.from({ length: 10 }, (_, i) => `Menu ${i + 1}`);
  persons: any[] = [];
  file: File;
  public formData: FormData;
  public profile_url: any;
  public file_name: any;
  public imageFile: any;
  public imageSizeFile: any;
  public profileImageTitle: any;
  public imageSelected: boolean = false;
  public imageSizeSelected: boolean = false;



  fillerContent = Array.from({ length: 50 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(private modalService: BsModalService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog,
    private personService: PersonsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.loadPersons();
    this.formData = new FormData();

  }

  loadPersons() {
    this.personService.getAllPersons().subscribe(res => {
      console.log(res);
      this.persons = res;
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  openDialog() {
    // let dialogRef = this.dialog.open(InputCardComponent, {
    //   height: '400px',
    //   width: '600px',
    // });




  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onProfileImageChange(value) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>value;

    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    this.profileImageTitle = this.file_name;
    if (files.length == 0) {
      this.file_name = null;
    } else {
      this.file_name = this.file.name;
      this.profileImageTitle = this.file_name;
      var idxDot = this.file_name.lastIndexOf(".") + 1;
      var extFile = this.file_name
        .substr(idxDot, this.file_name.length)
        .toLowerCase();

      if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
        this.imageSelected = false;
        if (this.file.size < 2000000) {
          this.imageSizeSelected = false;
        } else {
          this.imageSizeSelected = true;
        }
      } else {
        this.imageSelected = true;
        document.getElementById('btnClk').click();
      }
    }

    var api_secret = 'Bdjp7AEv8dCjQMeiFTQ_Qd3Guc8';
    var ts = Math.round(new Date().getTime() / 1000);
    this.formData.append("api_key", '849557378739986');
    this.formData.append("timestamp", ts.toString());
    this.formData.append("file", this.file);
    let signatureString = "";
    signatureString = "timestamp" + "=" + ts.toString() + api_secret;
    this.formData.append("signature", this.SHA1(signatureString));
  }

  SHA1(msg) {
    function rotate_left(n, s) {
      var t4 = (n << s) | (n >>> (32 - s));
      return t4;
    }
    function lsb_hex(val) {
      var str = "";
      var i;
      var vh;
      var vl;
      for (i = 0; i <= 6; i += 2) {
        vh = (val >>> (i * 4 + 4)) & 0x0f;
        vl = (val >>> (i * 4)) & 0x0f;
        str += vh.toString(16) + vl.toString(16);
      }
      return str;
    }
    function cvt_hex(val) {
      var str = "";
      var i;
      var v;
      for (i = 7; i >= 0; i--) {
        v = (val >>> (i * 4)) & 0x0f;
        str += v.toString(16);
      }
      return str;
    }
    function Utf8Encode(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    }
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xefcdab89;
    var H2 = 0x98badcfe;
    var H3 = 0x10325476;
    var H4 = 0xc3d2e1f0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
      j =
        (msg.charCodeAt(i) << 24) |
        (msg.charCodeAt(i + 1) << 16) |
        (msg.charCodeAt(i + 2) << 8) |
        msg.charCodeAt(i + 3);
      word_array.push(j);
    }
    switch (msg_len % 4) {
      case 0:
        i = 0x080000000;
        break;
      case 1:
        i = (msg.charCodeAt(msg_len - 1) << 24) | 0x0800000;
        break;
      case 2:
        i =
          (msg.charCodeAt(msg_len - 2) << 24) |
          (msg.charCodeAt(msg_len - 1) << 16) |
          0x08000;
        break;
      case 3:
        i =
          (msg.charCodeAt(msg_len - 3) << 24) |
          (msg.charCodeAt(msg_len - 2) << 16) |
          (msg.charCodeAt(msg_len - 1) << 8) |
          0x80;
        break;
    }
    word_array.push(i);
    while (word_array.length % 16 != 14) word_array.push(0);
    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);
    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
      for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
      for (i = 16; i <= 79; i++)
        W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;
      for (i = 0; i <= 19; i++) {
        temp =
          (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5a827999) &
          0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B, 30);
        B = A;
        A = temp;
      }
      for (i = 20; i <= 39; i++) {
        temp =
          (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ed9eba1) &
          0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B, 30);
        B = A;
        A = temp;
      }
      for (i = 40; i <= 59; i++) {
        temp =
          (rotate_left(A, 5) +
            ((B & C) | (B & D) | (C & D)) +
            E +
            W[i] +
            0x8f1bbcdc) &
          0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B, 30);
        B = A;
        A = temp;
      }
      for (i = 60; i <= 79; i++) {
        temp =
          (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xca62c1d6) &
          0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B, 30);
        B = A;
        A = temp;
      }
      H0 = (H0 + A) & 0x0ffffffff;
      H1 = (H1 + B) & 0x0ffffffff;
      H2 = (H2 + C) & 0x0ffffffff;
      H3 = (H3 + D) & 0x0ffffffff;
      H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp;
    temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
  }



  pushPerson() {

    this.personService
      .uploadCloudinaryImage(this.formData)
      .subscribe(response => {
        this.profile_url = response["secure_url"];
        console.log('pro image', this.profile_url);
        let personObj = { name: this.name, desc: this.desc, img_url: this.profile_url };
        this.personService.addPerson(personObj).subscribe(res => {
          console.log(res);
        }, error => {
          console.log(error);
        });
        window.location.reload();
      });



  }

}

