import {
    Component,
    Inject,
    ChangeDetectionStrategy,
    OnInit,
} from '@angular/core'
import { NotesService } from './notes.service'
import { NewNote, Note } from './note'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    selected?: Note | NewNote
    notes$ = this.notesService.notes$
    myForm: FormGroup
    selectedIndex: number

    constructor(private readonly notesService: NotesService) {}

    ngOnInit() {
        this.myForm = new FormGroup({
            title: new FormControl(''),
            body: new FormControl(''),
            color: new FormControl('#000'),
            favorite: new FormControl(false),
        })
    }

    selectNote(note: Note) {
        // TODO: prevent changing original object
        this.selected = note
        this.myForm.patchValue({
            title: this.selected.title,
            body: this.selected.body,
            color: this.selected.color,
            favorite: this.selected.favorite,
        })
        this.selectedIndex = note.id
        console.log(note)
    }

    newNote() {
        this.selected = createNewNote()
        this.myForm.patchValue({
            title: this.selected.title,
            body: this.selected.body,
            color: this.selected.color,
            favorite: this.selected.favorite,
        })
    }

    saveNote(note: Note | NewNote) {
        // TODO: save note
        this.notesService.saveNote(note).subscribe((response) => {
            console.log(response, 'res')
        })
        console.log(note, 'form')
    }
}

function createNewNote(): NewNote {
    return { title: '', body: '', color: '#000', favorite: false }
}
