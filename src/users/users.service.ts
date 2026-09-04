import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { User, UserDocument } from '../lib/schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';

export type UserType = {
    userId: number,
    email: string,
    password: string
}

export const users = [
    {
        userId: 1,
        email: "john_doe",
        password: "Password123!"
    },
    {
        userId: 2,
        email: "jane_smith",
        password: "SecurePass456#"
    },
    {
        userId: 3,
        email: "alex_dev",
        password: "CodeMaster789$"
    },
    {
        userId: 4,
        email: "sarah_k",
        password: "MySecretKey321@"
    },
    {
        userId: 5,
        email: "mike_tech",
        password: "TechUser999%"
    }
];

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }


    async findUserByEmail(email: string): Promise<UserDocument | null> {

        return this.userModel.findOne({ email }).exec();

    }






    async createUser(input: { username: string; email: string; password: string }): Promise<UserDocument> {

        const created = new this.userModel({
            username: input.username,
            email: input.email,
            password: input.password,
        });

        return created.save();
    }

    

}



//primul lucru trebuie
// "npm init -y" pentru package json
//npm install express
//npm install nodemon --save-dev




//npm install dotenv
//incepem mai intai cu baza de date configurarea schema si conectarea

//.apoi facem sistemul de autentificare
//npm install cookie-parser
//npm i bcryptjs
//npm i jsonwebtoken

//npm i zod
//validare types
// // ==========================================
// ==========================================
// ==========================================
// =======BYCRYPT===================
// ==========================================
// ==========================================
// ==========================================
// ==========================================
// ==========================================
// 1. GENERARE SALT (Generarea cheii de criptare)
// ==========================================

// bcrypt.genSalt(rounds) -> Generează un "salt" asincron (un șir de caractere aleatorii). Rounds (implicit 10) reprezintă costul de procesare; cu cât e mai mare, cu atât e mai sigură criptarea, dar durează mai mult.
// bcrypt.genSaltSync(rounds) -> Varianta sincronă pentru generarea saltului (blochează execuția codului până termină).


// ==========================================
// 2. HASHUIRE / CRIPTARE (Pentru Înregistrare / Register)
// ==========================================

// await bcrypt.hash(parolaTextSimplu, saltSauRounds) -> Funcția principală asincronă care criptează parola. O folosești la înregistrare înainte de a salva utilizatorul în baza de date.
// bcrypt.hashSync(parolaTextSimplu, saltSauRounds) -> Varianta sincronă pentru criptarea parolei.


// ==========================================
// 3. COMPARARE / VERIFICARE (Pentru Autentificare / Login)
// ==========================================

// await bcrypt.compare(parolaTrimisa, parolaCriptataDinBaza) -> Funcția principală asincronă care compară parola introdusă la login cu cea criptată din baza de date. Returnează true sau false.
// bcrypt.compareSync(parolaTrimisa, parolaCriptataDinBaza) -> Varianta sincronă pentru compararea parolelor.

// ==========================================
// ==========================================
// ==========================================
// ============MongoDB==================
// ==========================================
// ==========================================
// ==========================================
// ==========================================

// ==========================================
// 1. CREATE (Creare / Salvare)
// ==========================================

// .create(date)
// -> Cel mai rapid mod de a introduce date noi. Primește un obiect și îl salvează instant în bază.
// Exemplu: User.create({ nume: "Alex", varsta: 25 });


// ==========================================
// 2. READ (Citire / Căutare)
// ==========================================

// .find(filtru)
// -> Îl folosești când vrei o LISTĂ de rezultate (ex: toate produsele dintr-o categorie).
// Exemplu: Product.find({ categorie: "cărți" });

// .findOne(filtru)
// -> Îl folosești când cauți un SINGUR element după un criteriu specific (ex: după email sau username).
// Exemplu: User.findOne({ email: "alex@mail.com" });

// .findById(id)
// -> Varianta ultra-rapidă când știi deja ID-ul unic din MongoDB (cel care arată ca '60c72b2f...').
// Exemplu: User.findById("60c72b2f1f0a2c0015b3a4d1");


// ==========================================
// 3. UPDATE (Actualizare / Modificare)
// ==========================================

// .findByIdAndUpdate(id, modificari, { new: true })
// -> Regele actualizărilor. Găsește documentul după ID, îi schimbă datele și (datorită lui { new: true }) îți returnează varianta nouă, deja modificată.
// Exemplu: User.findByIdAndUpdate(id, { varsta: 26 }, { new: true });

// .updateOne(filtru, modificari)
// -> Îl folosești când vrei doar să modifici ceva în bază „în fundal” și nu te interesează să primești înapoi documentul modificat în cod.
// Exemplu: Product.updateOne({ cod: "PROMO10" }, { pret: 90 });


// ==========================================
// 4. DELETE (Ștergere)
// ==========================================

// .findByIdAndDelete(id)
// -> Modul standard și sigur de a șterge un element pe internet (dai click pe „Șterge contul” sau „Șterge postarea” și trimiți ID-ul).
// Exemplu: Post.findByIdAndDelete("60c72b2f1f...");

// .deleteOne(filtru)
// -> Îl folosești când vrei să ștergi un singur element, dar nu îi știi ID-ul, ci un alt parametru unic.
// Exemplu: User.deleteOne({ email: "cont_vechi@mail.com" });


// ==========================================
// ==========================================
// ==========================================
// ==========================================
// ==========================================
// ==========================================
// ==========================================
// ==========================================

// ==========================================
// 1. CITIRE / CĂUTARE (READ)
// ==========================================

// .find(filtru) -> Caută toate documentele care se potrivesc cu filtrul (returnează un array).
// .findOne(filtru) -> Caută și returnează primul document care se potrivește cu filtrul.
// .findById(id) -> Caută un singur document rapid folosind ID-ul lui unic (_id).
// .countDocuments(filtru) -> Numără câte documente din bază respectă filtrul specificat.
// .exists(filtru) -> Verifică dacă există cel puțin un document care respectă filtrul (returnează boolean).


// ==========================================
// 2. CREARE / INSERARE (CREATE)
// ==========================================

// .create(date) -> Creează și salvează direct unul sau mai multe documente în baza de date.
// .save() -> Metodă apelată pe o instanță de model pentru a salva modificările sau un document nou în bază.
// .insertMany(array) -> Inserează rapid o listă întreagă de documente dintr-un array.


// ==========================================
// 3. ACTUALIZARE / MODIFICARE (UPDATE)
// ==========================================

// .updateOne(filtru, modificari) -> Modifică primul document care se potrivește cu filtrul.
// .updateMany(filtru, modificari) -> Modifică toate documentele care se potrivesc cu filtrul.
// .findByIdAndUpdate(id, modificari) -> Caută după ID și actualizează documentul respectiv într-o singură comandă.
// .findOneAndUpdate(filtru, modificari) -> Caută după filtru și actualizează primul document găsit.


// ==========================================
// 4. ȘTERGERE (DELETE)
// ==========================================

// .deleteOne(filtru) -> Șterge primul document care se potrivește cu filtrul.
// .deleteMany(filtru) -> Șterge toate documentele care se potrivesc cu filtrul (ex: golirea unei colecții).
// .findByIdAndDelete(id) -> Caută după ID și șterge documentul respectiv imediat.
// .findOneAndDelete(filtru) -> Caută după filtru și șterge primul document găsit.


// ==========================================
// 5. METODE UTILE (QUERY BUILDERS)
// ==========================================

// .select('campuri') -> Specifică ce câmpuri să includă sau să excludă din rezultatul căutării.
// .populate('relatie') -> Încarcă automat datele din altă colecție asociată (similar cu un JOIN din SQL).
// .sort({ camp: 1 }) -> Sortează rezultatele crescător (1) sau descrescător (-1).
// .limit(numar) -> Restricționează numărul maxim de documente returnate (util pentru paginare).
// .skip(numar) -> Sare peste un număr de documente (util împreună cu .limit pentru paginare).