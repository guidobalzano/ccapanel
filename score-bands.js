/* ============================================================
   score-bands.js
   Tabella di riferimento UNICA per la conversione tra lo Score
   del sigaro (scala 0-100, "centesimi") e il Punteggio a fasce
   (scala 1-5).

   Usato sia da index.html (etichetta istantanea mostrata al
   Panelist mentre compila il campo punteggio) sia da admin.html
   (tab "Esito Panel", calcolo della fascia sullo Score aggregato).

   Includere con: <script src="score-bands.js"></script>
   PRIMA degli script inline che lo usano, in entrambi i file.
   ============================================================ */

window.SCORE_BANDS = [
  { min: 90, max: 100, punteggio: 5, label: 'Eccezionale' },
  { min: 85, max: 89,  punteggio: 4, label: 'Ottimo' },
  { min: 80, max: 84,  punteggio: 3, label: 'Buono' },
  { min: 75, max: 79,  punteggio: 2, label: 'Discreto' },
  { min: 0,  max: 74,  punteggio: 1, label: 'Sufficiente' },
];

/**
 * Trova la fascia (oggetto SCORE_BANDS) corrispondente a uno score 0-100.
 * Ritorna null se lo score non è un numero valido.
 */
window.scoreBandFind = function scoreBandFind(score){
  const v = Number(score);
  if (isNaN(v)) return null;
  return window.SCORE_BANDS.find(b => v >= b.min && v <= b.max) || null;
};

/**
 * Compatibilità con l'uso storico in admin.html (Esito Panel):
 * ritorna { range: '90-100', idx: 5 } dato uno score 0-100.
 */
window.scoreBandLabel = function scoreBandLabel(score){
  const band = window.scoreBandFind(score);
  if (!band) return { range: '—', idx: 0 };
  return { range: band.min + '-' + band.max, idx: band.punteggio };
};
