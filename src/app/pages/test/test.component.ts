import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})

export class TestComponent {

  @ViewChild("backdrop") $backdrop: ElementRef<HTMLDivElement>;
  @ViewChild("textarea") $textarea: ElementRef<HTMLTextAreaElement>;

  // declare some variables for the logic and data
  showDropdown: boolean = false;
  selectedIndex = -1;
  filteredList: string[] = [
    'Gina Williams',
    'Jake Williams',
    'Jamie John',
    'John Doe',
    'Jeff Stewart',
    'Paula M. Keith',
  ];

  // two way binding for input text
  inputItem = '';
  highlightedItem: any = '';

  constructor() { }

  ngOnInit() { }


  @HostListener('document:keypress', ['$event'])
  onDocumentKeyboardEvent(event: any) {
    if (this.showDropdown) {
      if (event.key == 'Enter') {
        this.inputItem = this.inputItem + this.filteredList[this.selectedIndex];
        this.showDropdown = false;
        this.highlightedItem = this.applyHighlights(this.inputItem);
      }
    }
    if (event.key == '@') {
      // show the suggestion dropdown menu
      this.showDropdown = true;
    } else {
      // hide the suggestion dropdown menu
      this.showDropdown = false;
    }
  }


  @HostListener('document:keyup', ['$event'])
  onDocumentKeyboard(event: any) {

    if (event.key == 'Backspace') {
      this.selectedIndex = -1;
      this.showDropdown = false;
      this.highlightedItem = this.applyHighlights(this.inputItem);
    }

    if (this.showDropdown) {
      if (event.key == 'ArrowDown') {
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && this.showDropdown) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key == 'ArrowUp') {
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;

        if (this.filteredList.length > 0 && this.showDropdown) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }


  applyHighlights(text: string) {
    text = text ? text
      .replace(/\n$/g, "\n\n") : '';
    this.filteredList.forEach(x => {
      text = text
        .replace(new RegExp(x, 'g'), "<mark>$&</mark>");
    })
    return text;
  }

  selectItem(ind: any) {
    this.inputItem = this.inputItem + this.filteredList[ind];
    this.highlightedItem = this.filteredList[ind];
    this.showDropdown = false;
    this.selectedIndex = ind;
  }

  addNotes() {
    alert(this.inputItem)
  }
}
