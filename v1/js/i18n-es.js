// Version espagnole de Strange Mind v1 (mêmes clés que i18n-en.js).
//  - export par défaut : dictionnaire { 'phrase française': 'español' } pour t() et translateDom()
//  - ES_LEVELS : textes des niveaux par identifiant (titre, notion pour les grands, étapes dans l'ordre)

export default {
  // ---- menu ----
  'Les formes cachent des secrets… et les animaux sont des nombres !': 'Las formas esconden secretos… ¡y los animales son números!',
  '🧪 Bac à sable': '🧪 Cajón de arena',
  'Les formes qui tournent': 'Las formas que giran',
  'Les formes qui tournent · Strange Mind': 'Las formas que giran · Strange Mind',
  'Accueil Strange Mind': 'Inicio de Strange Mind',
  '🖐️ Comment jouer': '🖐️ Cómo jugar',
  '⚙️ Réglages (pour les grands)': '⚙️ Ajustes (para los mayores)',
  '🔊 Lire les consignes à voix haute': '🔊 Leer las instrucciones en voz alta',
  '🎵 Petits sons': '🎵 Sonidos',
  '☝️ Un seul doigt suffit pour basculer (écran tactile)': '☝️ Basta un dedo para voltear (pantalla táctil)',
  '↕️ Inverser le sens du pavé tactile': '↕️ Invertir el sentido del panel táctil',

  // ---- barre du jeu (infobulles) ----
  'Menu': 'Menú',
  'Réécouter': 'Volver a escuchar',
  'Un indice': 'Una pista',
  "Recommencer l'étape": 'Repetir este paso',
  'Pour les grands : la notion mathématique': 'Para los mayores: la idea matemática',
  'Fermer': 'Cerrar',
  'Tourner (sens inverse des aiguilles)': 'Girar (sentido antihorario)',
  'Tourner (sens des aiguilles)': 'Girar (sentido horario)',

  // ---- aide ----
  'Basculer la forme<br><small>(voir une autre face)</small>': 'Voltear la forma<br><small>(ver otra cara)</small>',
  'Tourner la face<br><small>(le dessin tourne)</small>': 'Girar la cara<br><small>(el dibujo gira)</small>',
  '📱 Écran tactile': '📱 Pantalla táctil',
  'glisser avec 2 doigts (ou 1)': 'deslizar con 2 dedos (o 1)',
  'tourner 2 doigts comme une clé, ou ↺ ↻': 'girar 2 dedos como una llave, o ↺ ↻',
  '💻 Pavé tactile': '💻 Panel táctil',
  'défiler avec 2 doigts sur la forme': 'desplazar con 2 dedos sobre la forma',
  'pincer, Maj + défiler, ou ↺ ↻': 'pellizcar, Mayús + desplazar, o ↺ ↻',
  '🖱️ Souris': '🖱️ Ratón',
  'cliquer-glisser': 'hacer clic y arrastrar',
  'clic droit glissé, Maj + glisser, ou ↺ ↻': 'arrastrar con clic derecho, Mayús + arrastrar, o ↺ ↻',
  '⌨️ Clavier': '⌨️ Teclado',
  'flèches': 'flechas',
  'Q (↺) et E (↻)': 'Q (↺) y E (↻)',
  'Les boutons 🎓 dans chaque niveau expliquent aux adultes la notion mathématique cachée.':
    'El botón 🎓 de cada nivel explica a los adultos la idea matemática escondida.',

  // ---- messages du jeu ----
  'Oups ! On recommence.': '¡Uy! Volvemos a empezar.',
  'Bravo !': '¡Bravo!',
  'Super !': '¡Súper!',
  'Génial !': '¡Genial!',
  'Bien joué !': '¡Bien hecho!',
  'Essaie de glisser ou de tourner les formes !': '¡Prueba a deslizar o girar las formas!',
  'Niveau réussi !': '¡Nivel superado!',
  'Niveau suivant ▶': 'Siguiente nivel ▶',
  '🏠 Menu': '🏠 Menú',
  '🎓 Pour les grands : {title}': '🎓 Para los mayores: {title}',
};

export const ES_LEVELS = {
  // ---------------------------------------------------------------- 1
  multiply: {
    title: 'La máquina de girar',
    concept: `<p>La máquina <b>multiplica</b> dos direcciones: <b>suma los ángulos</b>. Es la multiplicación de números complejos de módulo 1: e<sup>iα</sup> × e<sup>iβ</sup> = e<sup>i(α+β)</sup>.</p>
      <p>Paso 1: encontrar el <b>inverso</b> (i × (−i) = 1). Paso 2: dos soluciones simétricas de x² = −1 (i y −i). Paso 3: resolver (−i) × ? = i.</p>`,
    steps: [
      { say: 'La máquina mezcla los dos delfines. El delfín A mira hacia arriba. Gira B para que la máquina dé un delfín que mire a la derecha ➡️', hint: 'B tiene que girar al revés: hacia abajo.', bravo: '¡Arriba y abajo se anulan!' },
      { say: 'Ahora A y B tienen que mirar hacia el mismo lado, y la máquina tiene que mostrar el delfín mirando a la izquierda ⬅️', hint: '¡Los dos hacia arriba… o los dos hacia abajo!' },
      { say: 'A mira hacia abajo ⬇️. Encuentra B para que la máquina muestre el delfín mirando hacia arriba ⬆️', hint: 'Primero pon A mirando hacia abajo.' },
    ],
  },

  // ---------------------------------------------------------------- 2
  roots: {
    title: 'La raíz mágica',
    concept: `<p>El octógono gira en <b>octavos de vuelta</b> (45°). La máquina hace «A × A»: duplica el ángulo.</p>
      <p>Paso 1: ¿qué delfín, multiplicado por sí mismo, da <b>i</b> (arriba)? Respuesta: 45° (o 225°): es <b>√i</b>.</p>
      <p>Pasos 2 y 3: x² = −1 tiene <b>dos</b> soluciones, i y −i. ¡Una ecuación puede tener más de una respuesta!</p>`,
    steps: [
      { say: 'El octógono gira a pasitos. La máquina multiplica el delfín por sí mismo. Haz que salga un delfín mirando hacia arriba ⬆️', hint: '¡Basta un solo pasito ↺!', bravo: '¡Medio paso, dos veces, hace un paso entero!' },
      { say: 'Ahora la máquina tiene que mostrar el delfín mirando a la izquierda ⬅️' },
      { say: '¡Hay otra respuesta! Encuentra otro delfín que también dé izquierda ⬅️', hint: 'Prueba con el delfín que mira al lado contrario.', bravo: '¡Dos respuestas para una sola pregunta!' },
    ],
  },

  // ---------------------------------------------------------------- 3
  matrix: {
    title: 'La cuadrícula que transforma',
    concept: `<p>Cuatro cubos con números forman una <b>matriz 2×2</b> [[a, b], [c, d]]. La matriz transforma el jardín: la flecha roja (→) va a (a, c), la flecha azul (↑) va a (b, d).</p>
      <p>Buscamos: la <b>identidad</b> [[1,0],[0,1]], el <b>espejo</b> [[−1,0],[0,1]], el <b>cuarto de vuelta</b> [[0,−1],[1,0]] y la <b>media vuelta</b> [[−1,0],[0,−1]].</p>
      <p>Una nota para los mayores: el cuarto de vuelta al cuadrado da la media vuelta = −1: la matriz [[0,−1],[1,0]] <b>es</b> el número i.</p>`,
    steps: [
      { say: 'Mira la mano 👆: ¡estos cuadrados son cubos! Al deslizar, el cubo se voltea y muestra otra cara. Con ↻, gira. Te toca: ¡haz aparecer un conejo boca abajo!',
        hint: 'Desliza un cubo para ver un conejo y luego pulsa ↻.', bravo: '¡Bravo! Conejo de pie = 1, nube = 0, conejo boca abajo = −1.' },
      { say: '¡El jardín ha desaparecido! Cada cubo es un número. Haz que vuelva el jardín como en el dibujo punteado.', hint: 'Un conejo de pie arriba a la izquierda y otro abajo a la derecha.', bravo: '¡El jardín ha vuelto!' },
      { say: 'Ahora muestra el jardín en un espejo 🪞: la casa tiene que pasar al otro lado.', hint: 'Da la vuelta al conejo de arriba a la izquierda.' },
      { say: 'Haz que el jardín dé un cuarto de vuelta ↺', hint: 'Los conejos van a las otras casillas. Mira adónde van las flechas roja y azul.' },
      { say: 'Y ahora, ¡pon el jardín boca abajo!', hint: 'Dos conejos boca abajo.', bravo: '¡Boca abajo = dos cuartos de vuelta!' },
    ],
  },

  // ---------------------------------------------------------------- 4
  det: {
    title: 'El jardín que desaparece',
    concept: `<p>El <b>determinante</b> ad − bc es el <b>tamaño del jardín transformado</b>, con un signo: positivo si el jardín está «del derecho», negativo si se ve en un espejo, cero si queda aplastado en una línea.</p>
      <p>El niño descubre que se puede aplastar el jardín sin que todo sea cero (una matriz no nula de determinante 0), luego duplicar su tamaño y después duplicarlo en un espejo.</p>`,
    steps: [
      { say: 'Aplasta el jardín hasta que quede totalmente plano… ¡pero no solo con nubes!', hint: '¡Pon cuatro conejos de pie!', bravo: '¡Fiu! El jardín ha quedado plano.' },
      { say: '¡Ahora haz un jardín dos veces más grande!', hint: 'Cuatro conejos, y solo uno boca abajo.' },
      { say: 'Y un jardín dos veces más grande… ¡en el espejo 🪞!', hint: 'Cuatro conejos: da la vuelta a uno o dos y mira la etiqueta.', bravo: '¡El signo te dice si estás en el espejo!' },
    ],
  },

  // ---------------------------------------------------------------- 5
  mirrors: {
    title: 'Dos espejos hacen un giro',
    concept: `<p>El corazón del <b>álgebra geométrica de Hestenes</b>: una <b>reflexión</b> (espejo) es la operación básica. Un espejo voltea el delfín (panza arriba).</p>
      <p><b>Dos espejos seguidos = una rotación</b>, del <b>doble</b> del ángulo entre los espejos. En álgebra geométrica, un vector unitario <i>a</i> actúa como espejo (x ↦ −a x a) y el producto <i>ba</i> es un <b>rotor</b> que gira 2θ.</p>
      <p>Por eso también bastan los octógonos (pasos de 45°) para hacer cuartos de vuelta.</p>`,
    steps: [
      { say: 'El delfín nada hacia un espejo mágico. Gira el espejo para que su reflejo mire hacia arriba ⬆️', hint: 'Basta un pasito ↺ del espejo.', bravo: 'Mira hacia arriba… ¡pero está panza arriba!' },
      { say: '¡Un segundo espejo! Haz que el último delfín mire hacia arriba ⬆️, del derecho.', hint: 'Los dos espejos tienen que estar un poco inclinados el uno respecto del otro.', bravo: '¡Dos espejos = un giro, y el delfín vuelve a estar del derecho!' },
      { say: 'Con los dos espejos, haz que el delfín nade hacia la izquierda ⬅️', hint: 'Tumba un espejo y pon el otro de pie.', bravo: '¡Espejos cruzados = media vuelta!' },
    ],
  },

  // ---------------------------------------------------------------- 6
  bivector: {
    title: 'El remolino secreto',
    concept: `<p>El <b>producto geométrico</b> de dos flechas (vectores) ab = a·b (la parte «número») + a∧b (la parte «plano orientado», el <b>bivector</b>).</p>
      <p>Misma dirección → <b>+1</b> (conejo de pie); direcciones opuestas → <b>−1</b> (boca abajo); perpendiculares → un <b>remolino</b>: el plano orientado e₁e₂, que gira hacia un lado o hacia el otro.</p>
      <p>El orden importa: <b>e₁e₂ = −e₂e₁</b>. Y este remolino cumple (e₁e₂)² = −1: es la «i» de Hestenes, que ya no es misteriosa sino un <b>trozo de plano que gira</b>.</p>`,
    steps: [
      { say: '¡Cuando multiplicas dos flechas pasan cosas raras! Haz aparecer un conejo de pie.', hint: 'Las dos flechas tienen que apuntar hacia el mismo lado.' },
      { say: 'Ahora haz aparecer el remolino, que gire así ↺', hint: 'Las flechas tienen que formar una esquina, como una L.', bravo: '¡Un remolino! Dos flechas en esquina hacen girar un plano.' },
      { say: 'Pon la flecha rosa hacia arriba ⬆️ y la verde a la derecha ➡️. ¡Mira el remolino!', hint: 'Rosa arriba, verde a la derecha.', bravo: '¡Gira al revés! El orden de las flechas importa.' },
      { say: 'La flecha rosa mira a la izquierda ⬅️. Encuentra la verde para volver a hacer el remolino ↺', hint: 'Primero pon la rosa a la izquierda.', bravo: '¡Has domado el remolino secreto!' },
    ],
  },

  // ---- bac à sable ----
  sandbox: {
    title: 'Cajón de arena',
    concept: `<p>Todas las formas, sin objetivo. Sirve para probar los gestos e imaginar nuevos niveles (ver <code>js/levels.js</code> y el README).</p>`,
    steps: [{ say: '¡Juega libremente con las formas!' }],
  },
};
