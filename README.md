# Dokumentacija

## Uputstvo za pokretanje

Pre pokretanja klijentske aplikacije, trebalo bi imati podešenu serversku aplikaciju, čiji se REST API konzumira.
[Uputstvo za pokretanje serverske aplikacije.](https://github.com/markorusic/spring-boot-webstore#uputstvo-za-pokretanje)

Na lokalnom okruženju trebalo bi imati intalirano sledeće:
- Node.js
- npm
- Code editor po izboru (VSCode npr)

Povlačenje koda sa github-a:

```shell
git clone https://github.com/markorusic/webstore-frontend
```

Instaliranje neophodnih paketa:

```shell
npm i
```

Pokretanje aplikacije:

```shell
npm start
```

Nakon toga aplikacija bi trebalo da je uspešno pokrenuta na putanji ``http://localhost:3000``.

## Opis projekta

Projekat je koncipiran tako da postoji deo za kupce i deo za administratore. Neautorizovani korisnici mogu pristupiti javnim stranama, autorizovani kupci mogu pristupiti stranama koje implementiraju funkcionalnosti kupaca, dok autorizovani administratori mogu pristupiti delu aplikacije za administraciju svih domenskih entiteta sistema.

Deo aplikacije za administratore nalazi se na putanji ``http://localhost:3000/admin``
