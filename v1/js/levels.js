// =====================================================================================
//  NIVEAUX DE STRANGE MIND
// =====================================================================================
// Un niveau = des formes + des étiquettes + des panneaux + une suite d'étapes.
//
//  shapes : [{ id, type:'cube'|'pyramid'|'octagon', pos:[x,y], faces:[...],
//              start:{front, dir}, tumble:'both'|'h'|'v'|'none', twist:bool,
//              twistDirs:[1,-1], twistStep:90|180…, hidden }]
//           faces : un dessin par face ('dolphin', 'bunny', 'cloud', 'arrow', 'mirror',
//                   'whirl', 'fish', 'ladybug' ou n'importe quel emoji)
//  labels : [{ pos:[x,y], text, cls }]          (×, +, crochets…)
//  panels : [{ ratio, draw(ctx, w, h, S, step) }]
//  steps  : [{ say, hint, bravo, setup(S), goal(S), fail(S), done(S), …données libres }]
//
//  S (état du jeu) : S.dir(id) angle 0/90/180/270… · S.glyph(id) dessin visible
//                    S.val(id) [re, im] · S.real(id) · S.shape(id) (twists, turnSum, history, startDir)
//                    S.set(id, face, dir) · S.lock(id, {...}) · S.show(id, bool) · S.mem (mémoire libre)
// =====================================================================================

import * as P from './panels.js';

const n360 = (d) => ((Math.round(d) % 360) + 360) % 360;

// ---- formes réutilisables ----
const WATER = '💧';
const dolphinCube = (id, pos, extra = {}) => ({
  id, type: 'cube', pos, tumble: 'none',
  faces: [{ g: 'dolphin', bg: '#cde7ff' }, WATER, WATER, WATER, WATER, WATER],
  ...extra,
});
/** Cube-nombre : lapin debout = +1, lapin tête en bas = −1, nuage = 0. */
const numberCube = (id, pos, front = 1) => ({
  id, type: 'cube', pos, tumble: 'h', twistStep: 180, start: { front },
  faces: [
    { g: 'bunny', bg: '#ffe0ea' }, { g: 'cloud', bg: '#d6ecff' },
    { g: 'bunny', bg: '#ffe0ea' }, { g: 'cloud', bg: '#d6ecff' },
    { g: 'cloud', bg: '#d6ecff' }, { g: 'cloud', bg: '#d6ecff' },
  ],
});
/** Comment dessiner la valeur d'un cube-nombre dans un panneau. */
const numberIcon = (S, id) => {
  const v = S.real(id);
  return v === 0 ? { g: 'cloud' } : { g: 'bunny', a: v > 0 ? 0 : 180 };
};
const matrix = (S) => [[S.real('a'), S.real('b')], [S.real('c'), S.real('d')]];
const same = (A, B) => A.every((r, i) => r.every((x, j) => x === B[i][j]));

// ---- panneaux réutilisables ----
const findPanel = {
  ratio: 1.6,
  draw(ctx, w, h, S, step) {
    const list = Array.isArray(step.find) ? step.find : [step.find];
    const ids = step.on || S.ids();
    P.find(ctx, w, h, list, list.map((g, i) => S.glyph(Array.isArray(ids) ? ids[i] ?? ids[0] : ids) === g));
  },
};
const compassPanel = {
  ratio: 1,
  draw(ctx, w, h, S, step) { P.compass(ctx, w, h, { dir: S.dir('A'), target: step.target }); },
};
/** Histoire des positions du dauphin depuis le début de l'étape. */
const historyPanel = {
  ratio: 2.4,
  draw(ctx, w, h, S, step) {
    const s = S.shape('A');
    const dirs = [s.startDir, ...s.history].slice(-6);
    const items = [];
    dirs.forEach((d, i) => { if (i) items.push('→'); items.push({ g: 'dolphin', a: d }); });
    items.push('  ');
    items.push({ target: { g: 'dolphin', a: step.target }, g: null, box: true, ok: S.dir('A') === step.target && step.goal(S) });
    P.row(ctx, w, h * 0.8, items, h * 0.42);
    const n = s.twists;
    P.text(ctx, '↺↻ ' + '●'.repeat(Math.min(n, 8)) + (step.count ? '○'.repeat(Math.max(0, step.count - n)) : ''), w / 2, h * 0.88, h * 0.13, '#7b2cbf');
  },
};

// =====================================================================================
export const LEVELS = [
  // ---------------------------------------------------------------- 1
  {
    id: 'multiply', icon: '✖️', title: 'La machine à tourner',
    concept: `<p>La machine <b>multiplie</b> deux directions : elle <b>additionne les angles</b>. C'est la multiplication des nombres complexes de module 1 : e<sup>iα</sup> × e<sup>iβ</sup> = e<sup>i(α+β)</sup>.</p>
      <p>Étape 1 : trouver l'<b>inverse</b> (i × (−i) = 1). Étape 2 : deux solutions symétriques de x² = −1 (i et −i). Étape 3 : résoudre (−i) × ? = i.</p>`,
    shapes: [dolphinCube('A', [-1.9, 0]), dolphinCube('B', [1.9, 0])],
    labels: [{ pos: [0, 0], text: '×' }],
    panels: [{
      ratio: 2.6,
      draw(ctx, w, h, S, step) {
        const r = n360(S.dir('A') + S.dir('B'));
        P.row(ctx, w, h, [
          { g: 'dolphin', a: S.dir('A') }, '×', { g: 'dolphin', a: S.dir('B') }, '=',
          { g: 'dolphin', a: r, big: true, box: true, target: { g: 'dolphin', a: step.target }, ok: step.goal(S) },
        ]);
      },
    }],
    steps: [
      { say: 'La machine mélange les deux dauphins. Le dauphin A regarde en haut. Tourne B pour que la machine donne un dauphin vers la droite ➡️', target: 0,
        setup: (S) => { S.set('A', 0, 90); S.set('B', 0, 0); S.lock('A', { twist: false }); },
        goal: (S) => n360(S.dir('A') + S.dir('B')) === 0, hint: 'B doit faire le tour dans l’autre sens : vers le bas.', bravo: 'Haut et bas s’annulent !' },
      { say: 'Maintenant A et B doivent regarder du même côté, et la machine doit montrer le dauphin à gauche ⬅️', target: 180,
        setup: (S) => S.lock('A', { twist: true }),
        goal: (S) => S.dir('A') === S.dir('B') && n360(S.dir('A') + S.dir('B')) === 180, hint: 'Les deux en haut… ou les deux en bas !' },
      { say: 'A regarde en bas ⬇️. Trouve B pour que la machine montre le dauphin en haut ⬆️', target: 90,
        goal: (S) => S.dir('A') === 270 && n360(S.dir('A') + S.dir('B')) === 90, hint: 'Mets d’abord A en bas.' },
    ],
  },

  // ---------------------------------------------------------------- 2
  {
    id: 'roots', icon: '🛑', title: 'La racine magique',
    concept: `<p>L'octogone tourne par <b>huitièmes de tour</b> (45°). La machine fait « A × A » : elle double l'angle.</p>
      <p>Étape 1 : quel dauphin, multiplié par lui-même, donne <b>i</b> (haut) ? Réponse : 45° (ou 225°) : c'est <b>√i</b>.</p>
      <p>Étapes 2 et 3 : x² = −1 a <b>deux</b> solutions, i et −i. Une équation peut avoir plusieurs réponses !</p>`,
    shapes: [{ id: 'A', type: 'octagon', pos: [0, 0], tumble: 'none', faces: [{ g: 'dolphin', bg: '#cde7ff' }, WATER, ...Array(8).fill(WATER)] }],
    panels: [{
      ratio: 2.6,
      draw(ctx, w, h, S, step) {
        const a = S.dir('A');
        P.row(ctx, w, h, [
          { g: 'dolphin', a }, '×', { g: 'dolphin', a }, '=',
          { g: 'dolphin', a: n360(2 * a), big: true, box: true, target: { g: 'dolphin', a: step.target }, ok: step.goal(S) },
        ]);
      },
    }],
    steps: [
      { say: 'L’octogone tourne par tout petits pas. La machine multiplie le dauphin par lui-même. Fais sortir un dauphin qui regarde en haut ⬆️', target: 90,
        goal: (S) => n360(2 * S.dir('A')) === 90, hint: 'Un seul petit pas ↺ suffit !', bravo: 'Un demi-pas, deux fois, ça fait un pas entier !' },
      { say: 'Maintenant la machine doit montrer le dauphin à gauche ⬅️', target: 180,
        goal: (S) => n360(2 * S.dir('A')) === 180, done: (S) => { S.mem.first = S.dir('A'); } },
      { say: 'Il y a une autre réponse ! Trouve un autre dauphin qui donne aussi la gauche ⬅️', target: 180,
        goal: (S) => n360(2 * S.dir('A')) === 180 && S.dir('A') !== S.mem.first, hint: 'Essaie le dauphin qui regarde dans l’autre sens.', bravo: 'Deux réponses pour une seule question !' },
    ],
  },

  // ---------------------------------------------------------------- 3
  {
    id: 'matrix', icon: '🔢', title: 'La grille qui transforme',
    concept: `<p>Quatre cubes-nombres forment une <b>matrice 2×2</b> [[a, b], [c, d]]. La matrice transforme le jardin : la flèche rouge (→) va en (a, c), la flèche bleue (↑) va en (b, d).</p>
      <p>On cherche : l'<b>identité</b> [[1,0],[0,1]], le <b>miroir</b> [[−1,0],[0,1]], le <b>quart de tour</b> [[0,−1],[1,0]] et le <b>demi-tour</b> [[−1,0],[0,−1]].</p>
      <p>Remarque d'adulte : le quart de tour au carré donne le demi-tour = −1 : la matrice [[0,−1],[1,0]] <b>est</b> le nombre i.</p>`,
    shapes: [numberCube('a', [-1.6, 1.6]), numberCube('b', [1.6, 1.6]), numberCube('c', [-1.6, -1.6]), numberCube('d', [1.6, -1.6])],
    labels: [{ pos: [-3.3, 0], text: '[', cls: 'bracket' }, { pos: [3.3, 0], text: ']', cls: 'bracket' }],
    panels: [{
      ratio: 1,
      draw(ctx, w, h, S, step) {
        P.garden(ctx, w, h, { M: matrix(S), T: step.T });
        if (step.goal(S)) P.check(ctx, w - h * 0.1, h * 0.1, h * 0.07);
      },
    }],
    steps: [
      { say: 'Regarde la main 👆 : ces carrés sont des cubes ! En glissant, le cube bascule et montre une autre face. Avec ↻, il tourne. À toi : fais apparaître un lapin tête en bas !',
        demo: { id: 'a', moves: ['swipe-right', 'twist-cw'] },
        goal: (S) => ['a', 'b', 'c', 'd'].some((id) => S.real(id) === -1),
        hint: 'Glisse sur un cube pour voir un lapin, puis appuie sur ↻.', bravo: 'Bravo ! Lapin debout = 1, nuage = 0, lapin tête en bas = −1.' },
      { say: 'Le jardin a disparu ! Chaque cube est un nombre. Fais revenir le jardin comme le modèle en pointillés.', T: [[1, 0], [0, 1]],
        setup: (S) => { for (const id of ['a', 'b', 'c', 'd']) S.set(id, 1, 0); },
        goal: (S) => same(matrix(S), [[1, 0], [0, 1]]), hint: 'Un lapin debout en haut à gauche, un en bas à droite.', bravo: 'Le jardin est revenu !' },
      { say: 'Maintenant, montre le jardin dans un miroir 🪞 : la maison doit passer de l’autre côté.', T: [[-1, 0], [0, 1]],
        goal: (S) => same(matrix(S), [[-1, 0], [0, 1]]), hint: 'Retourne le lapin en haut à gauche.' },
      { say: 'Fais faire un quart de tour au jardin ↺', T: [[0, -1], [1, 0]],
        goal: (S) => same(matrix(S), [[0, -1], [1, 0]]), hint: 'Les lapins vont dans les autres cases. Regarde où vont les flèches rouge et bleue.' },
      { say: 'Et maintenant, mets le jardin la tête en bas !', T: [[-1, 0], [0, -1]],
        goal: (S) => same(matrix(S), [[-1, 0], [0, -1]]), hint: 'Deux lapins tête en bas.', bravo: 'Tête en bas = deux quarts de tour !' },
    ],
  },

  // ---------------------------------------------------------------- 4
  {
    id: 'det', icon: '🏡', title: 'Le jardin qui disparaît',
    concept: `<p>Le <b>déterminant</b> ad − bc est la <b>taille du jardin</b> transformé, avec un signe : positif si le jardin est « à l'endroit », négatif s'il est vu dans un miroir, nul s'il est écrasé en une ligne.</p>
      <p>L'enfant découvre qu'on peut écraser le jardin sans que tout soit nul (matrice non nulle mais déterminant 0), puis doubler sa taille, puis le doubler en miroir.</p>`,
    shapes: [numberCube('a', [-1.6, 1.6], 0), numberCube('b', [1.6, 1.6]), numberCube('c', [-1.6, -1.6]), numberCube('d', [1.6, -1.6], 0)],
    labels: [{ pos: [-3.3, 0], text: '[', cls: 'bracket' }, { pos: [3.3, 0], text: ']', cls: 'bracket' }],
    panels: [{
      ratio: 1.35,
      draw(ctx, w, h, S, step) {
        const M = matrix(S), d = P.det2(M);
        P.garden(ctx, h, h, { M });
        P.detBadge(ctx, h + (w - h) / 2, h * 0.3, (w - h) * 0.4, d);
        P.text(ctx, '🎯', h + (w - h) / 2, h * 0.58, h * 0.1);
        P.detBadge(ctx, h + (w - h) / 2, h * 0.76, (w - h) * 0.32, step.det);
        if (step.goal(S)) P.check(ctx, w - h * 0.08, h * 0.08, h * 0.06);
      },
    }],
    steps: [
      { say: 'Écrase le jardin pour qu’il devienne tout plat… mais sans mettre que des nuages !', det: 0,
        goal: (S) => P.det2(matrix(S)) === 0 && matrix(S).flat().some((x) => x !== 0), hint: 'Mets quatre lapins debout !', bravo: 'Pschitt ! Le jardin est tout plat.' },
      { say: 'Maintenant fais un jardin deux fois plus grand !', det: 2,
        goal: (S) => P.det2(matrix(S)) === 2, hint: 'Quatre lapins, et un seul tête en bas.' },
      { say: 'Et un jardin deux fois plus grand… dans le miroir 🪞 !', det: -2,
        goal: (S) => P.det2(matrix(S)) === -2, hint: 'Quatre lapins : retourne-en un ou deux, et regarde la pastille.', bravo: 'Le signe dit si on est dans le miroir !' },
    ],
  },

  // ---------------------------------------------------------------- 5
  {
    id: 'mirrors', icon: '🪞', title: 'Deux miroirs font un tour',
    concept: `<p>Cœur de l'<b>algèbre géométrique de Hestenes</b> : une <b>réflexion</b> (miroir) est l'opération de base. Un miroir retourne le dauphin (ventre en l'air).</p>
      <p><b>Deux miroirs successifs = une rotation</b>, d'un angle <b>double</b> de l'angle entre les miroirs. En algèbre géométrique, un vecteur unitaire <i>a</i> agit comme miroir (x ↦ −a x a) et le produit <i>ba</i> est un <b>rotor</b> qui tourne de 2θ.</p>
      <p>C'est aussi pourquoi les octogones (pas de 45°) suffisent à produire des quarts de tour.</p>`,
    shapes: [
      { id: 'M1', type: 'octagon', pos: [-1.9, 0], tumble: 'none', faces: [{ g: 'mirror', bg: '#eef3ff' }, '✨', ...Array(8).fill('✨')] },
      { id: 'M2', type: 'octagon', pos: [1.9, 0], tumble: 'none', faces: [{ g: 'mirror', bg: '#fff3e6' }, '✨', ...Array(8).fill('✨')] },
    ],
    panels: [{
      ratio: 3.2,
      draw(ctx, w, h, S, step) {
        const a = S.dir('M1') % 180, b = S.dir('M2') % 180;
        const d1 = n360(2 * a), d2 = n360(2 * b - d1);
        const two = !S.shape('M2').hidden;
        const items = [{ g: 'dolphin', a: 0 }, '→', { g: 'mirror', a }, '→'];
        if (two) items.push({ g: 'dolphin', a: d1, m: true }, '→', { g: 'mirror', a: b }, '→',
          { g: 'dolphin', a: d2, big: true, box: true, target: { g: 'dolphin', a: step.target }, ok: step.goal(S) });
        else items.push({ g: 'dolphin', a: d1, m: true, big: true, box: true, target: { g: 'dolphin', a: step.target, m: true }, ok: step.goal(S) });
        P.row(ctx, w, h, items);
      },
    }],
    steps: [
      { say: 'Le dauphin nage vers un miroir magique. Tourne le miroir pour que son reflet regarde en haut ⬆️', target: 90,
        setup: (S) => S.show('M2', false),
        goal: (S) => n360(2 * (S.dir('M1') % 180)) === 90, hint: 'Un seul petit pas ↺ du miroir.', bravo: 'Il regarde en haut… mais il a le ventre en l’air !' },
      { say: 'Un deuxième miroir ! Fais que le dauphin final regarde en haut ⬆️, et à l’endroit.', target: 90,
        setup: (S) => S.show('M2', true),
        goal: (S) => { const d1 = n360(2 * (S.dir('M1') % 180)); return n360(2 * (S.dir('M2') % 180) - d1) === 90; },
        hint: 'Les deux miroirs doivent être un petit peu penchés l’un par rapport à l’autre.', bravo: 'Deux miroirs = un tour, et le dauphin est remis à l’endroit !' },
      { say: 'Avec les deux miroirs, fais nager le dauphin vers la gauche ⬅️', target: 180,
        goal: (S) => { const d1 = n360(2 * (S.dir('M1') % 180)); return n360(2 * (S.dir('M2') % 180) - d1) === 180; },
        hint: 'Mets un miroir couché et l’autre debout.', bravo: 'Miroirs en croix = demi-tour !' },
    ],
  },

  // ---------------------------------------------------------------- 6
  {
    id: 'bivector', icon: '🌀', title: 'Le tourbillon secret',
    concept: `<p>Le <b>produit géométrique</b> de deux flèches (vecteurs) ab = a·b (partie « nombre ») + a∧b (partie « plan orienté », le <b>bivecteur</b>).</p>
      <p>Même direction → <b>+1</b> (lapin debout) ; directions opposées → <b>−1</b> (tête en bas) ; perpendiculaires → un <b>tourbillon</b> : le plan orienté e₁e₂, qui tourne dans un sens ou dans l'autre.</p>
      <p>L'ordre compte : <b>e₁e₂ = −e₂e₁</b>. Et ce tourbillon vérifie (e₁e₂)² = −1 : c'est le « i » de Hestenes, qui n'est plus mystérieux mais un <b>morceau de plan qui tourne</b>.</p>`,
    shapes: [
      { id: 'A', type: 'cube', pos: [-1.9, 0], tumble: 'none', start: { dir: 0 }, faces: [{ g: 'arrow', bg: '#ffe0ea' }, '⭐', '⭐', '⭐', '⭐', '⭐'] },
      { id: 'B', type: 'cube', pos: [1.9, 0], tumble: 'none', start: { dir: 180 }, faces: [{ g: 'arrowGreen', bg: '#dff5e3' }, '⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    labels: [{ pos: [0, 0], text: '×' }],
    panels: [{
      ratio: 2.6,
      draw(ctx, w, h, S, step) {
        const res = (d) => ({ 0: { g: 'bunny', a: 0 }, 180: { g: 'bunny', a: 180 }, 90: { g: 'whirl' }, 270: { g: 'whirl', m: true } }[d]);
        const r = res(n360(S.dir('B') - S.dir('A')));
        P.row(ctx, w, h, [
          { g: 'arrow', a: S.dir('A') }, '×', { g: 'arrowGreen', a: S.dir('B') }, '=',
          { ...r, big: true, box: true, target: res(step.diff), ok: step.goal(S) },
        ]);
      },
    }],
    steps: [
      { say: 'Quand on multiplie deux flèches, il se passe des choses étranges ! Fais apparaître un lapin debout.', diff: 0,
        goal: (S) => n360(S.dir('B') - S.dir('A')) === 0, hint: 'Les deux flèches doivent regarder du même côté.' },
      { say: 'Maintenant fais apparaître le tourbillon qui tourne comme ça ↺', diff: 90,
        goal: (S) => n360(S.dir('B') - S.dir('A')) === 90, hint: 'Les flèches doivent faire un coin, comme un L.', bravo: 'Un tourbillon ! Deux flèches en coin font tourner un plan.' },
      { say: 'Mets la flèche rose vers le haut ⬆️ et la verte vers la droite ➡️. Regarde le tourbillon !', diff: 270,
        goal: (S) => S.dir('A') === 90 && S.dir('B') === 0, hint: 'Rose en haut, verte à droite.', bravo: 'Il tourne à l’envers ! L’ordre des flèches compte.' },
      { say: 'La flèche rose regarde à gauche ⬅️. Trouve la verte pour refaire le tourbillon ↺', diff: 90,
        goal: (S) => S.dir('A') === 180 && n360(S.dir('B') - S.dir('A')) === 90, hint: 'Mets d’abord la rose à gauche.', bravo: 'Tu as dompté le tourbillon secret !' },
    ],
  },
];

// ---- bac à sable : base pour créer de nouveaux niveaux ----
export const SANDBOX = {
  id: 'sandbox', icon: '🧪', title: 'Bac à sable',
  concept: `<p>Toutes les formes, sans objectif. Sert à tester les gestes et à imaginer de nouveaux niveaux (voir <code>js/levels.js</code> et le README).</p>`,
  shapes: [
    { id: 'A', type: 'cube', pos: [-3.2, 0], faces: ['dolphin', 'bunny', 'arrow', 'cloud', 'whirl', 'mirror'] },
    { id: 'B', type: 'pyramid', pos: [0, 0], faces: ['dolphin', '🐙', '🦋', '🐞'] },
    { id: 'C', type: 'octagon', pos: [3.2, 0], faces: ['dolphin', '☀️', '🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥕', '🍉'] },
  ],
  panels: [],
  steps: [{ say: 'Joue librement avec les formes !', goal: () => false }],
};
