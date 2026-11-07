const media = (file) => `/images_videos/${encodeURIComponent(file)}`;

export const chapters = [
  {
    id: "ninez",
    label: "Tu historia antes de conocernos",
    title: <>La pequeñita<br />que ya tenía <em>esa luz.</em></>,
    description: "Fotos que dan ganas de viajar en el tiempo solo para darle un abrazo a esa niña tan linda.",
    ariaLabel: "Fotos de ella cuando era pequeña",
    photos: [
      ["ella molestando a su papa.jpeg", "De niña junto a su papá en una hamaca", "TRAVESURAS DE NIÑA", "Pequeñita y ya encontrando la manera de tener a papá pendiente."],
      ["mi bebe de ciquita.jpeg", "De pequeña en brazos durante un paseo", "MI BEBÉ CHIQUITA", "Una mini tú que provoca abrazos infinitos."],
      ["mi niñita.jpeg", "De niña sonriendo", "ESA SONRISA DESDE SIEMPRE", "Creo que esa risa siempre tuvo algo especial."],
      ["sorprendida.jpeg", "De pequeña con una expresión sorprendida", "PEQUEÑA SORPRESA", "Una expresión inolvidable de la niña que hoy celebro tanto."]
    ]
  },
  {
    id: "vocacion",
    label: "Una vocación llena de ternura",
    title: <>El corazón que pones<br />en cuidar <em>la vida.</em></>,
    description: "Aprendiendo, practicando y regalando cariño a cada animalito. Me llena de orgullo verte seguir algo que amas.",
    ariaLabel: "Fotos de ella practicando veterinaria",
    soft: true,
    photos: [
      ["3.jpeg", "Retrato con un perro", "FUTURA VETERINARIA", "Hasta este perrito parece saber que está en buenas manos.", "memory-photo--tall"],
      ["atendiendo gaticos.jpeg", "Atendiendo a un gatito", "MANOS QUE CUIDAN", "Se nota cuánto cariño pones hasta en los gestos más pequeños.", "memory-photo--wide"],
      ["mi veterinaria arquitecta jiji.jpeg", "Con casco y un pequeño animal en la mano", "VETERINARIA, ARQUITECTA JIJI", "Una futura veterinaria que también se luce con casco de arquitecta."],
      ["practicando.jpeg", "Practicando cuidados veterinarios con un gatito", "APRENDIENDO A CUIDAR", "Qué orgullo verte aprender algo que te importa tanto.", "memory-photo--wide"],
      ["siendo una increible veterinaria.jpeg", "Cuidando a un gatito", "VAS A SER INCREÍBLE", "El mundo animal tendrá mucha suerte de encontrarse contigo.", "memory-photo--wide"]
    ]
  },
  {
    id: "ella",
    label: "En todas tus versiones",
    title: <>Y luego estás<br /><em>simplemente tú.</em></>,
    description: "En una aventura, haciendo arte, jugando voleibol, riéndote o compartiendo un momento conmigo: todas tus versiones son mis favoritas.",
    ariaLabel: "Fotos de ella en su día a día",
    photos: [
      ["1.jpeg", "Retrato juntos al aire libre", "UN RECUERDO PARA SONREÍR", "Contigo, hasta una mueca termina siendo mi foto favorita.", "memory-photo--wide"],
      ["2.jpeg", "Captura de videollamada", "UNA LLAMADA, UNA SONRISA", "Una ventanita en la pantalla y ya te siento más cerquita."],
      ["5.jpeg", "Pintando un cuadro", "EL ARTE NACE DE TUS MANOS", "Qué bonito verte poner un pedacito de ti en cada color."],
      ["6.jpeg", "Retrato con un cuadro", "ORGULLOSO DE TU TALENTO", "Yo veo un cuadro; también veo todo el talento que hay detrás.", "memory-photo--wide"],
      ["8.jpeg", "Retrato de cerca", "MI PERSONA FAVORITA", "Así de cerquita es donde más me gusta tenerte."],
      ["cuando no tenia celular.jpeg", "Captura de una videollamada, recuerdo de cuando no tenía celular", "CUANDO NO TENÍAS CELULAR", "Una pequeña pantalla, una gran excusa para verte.", "memory-photo--wide"],
      ["primerasflores.jpeg", "Retrato sosteniendo un ramo de flores", "PRIMERAS FLORES", "Las flores eran preciosas; tu sonrisa se quedó con todo el protagonismo.", "memory-photo--tall"],
      ["mi linda mujer .jpeg", "Retrato frente a una cascada", "MI LINDA MUJER", "El paisaje estaba lindo; tú, como siempre, más."],
      ["bella.jpeg", "Con casco amarillo y un pequeño animal en la mano", "AVENTURERA", "Casco, curiosidad y esa forma tuya de hacer linda cualquier escena."],
      ["ella siendo ella.jpeg", "En kayak sobre el agua", "SIENDO TÚ", "Rizos al viento, remo en mano y el mundo entero de fondo.", "memory-photo--wide"],
      ["linda.jpeg", "Retrato en kayak sobre el agua", "QUÉ LINDA TE VES", "Yo intentando mirar el paisaje y tú robándote la foto.", "memory-photo--wide"],
      ["mi volleygirl.jpeg", "Retrato con uniforme de voleibol", "MI VOLLEY GIRL", "La camiseta te queda bien; verte hacer lo que amas, todavía más.", "memory-photo--tall"],
      ["4.jpeg", "Retrato juntos en un lugar concurrido", "UN MOMENTO COMPARTIDO", "Y en medio de todo, qué suerte tenerte cerquita."]
    ]
  }
].map((chapter) => ({
  ...chapter,
  photos: chapter.photos.map(([file, alt, title, text, layout]) => ({
    src: media(file), alt, title, text, layout: layout ?? ""
  }))
}));

export const heroPhoto = {
  src: media("7.jpeg"),
  alt: "Retrato juntos",
  title: "mi sonrisa favorita",
  text: "Tu sonrisa siempre será uno de mis paisajes favoritos."
};

export const videos = [
  { src: media("primera vez que la vi con risos.mp4"), poster: media("1.jpeg"), title: "LA PRIMERA VEZ QUE LA VI CON RIZOS", alt: "Video: la primera vez que la vi con rizos" },
  { src: media("cuando fuimos al zoo por primera vez.mp4"), poster: media("mi linda mujer .jpeg"), title: "CUANDO FUIMOS AL ZOO POR PRIMERA VEZ", alt: "Video: cuando fuimos al zoo por primera vez" }
];
