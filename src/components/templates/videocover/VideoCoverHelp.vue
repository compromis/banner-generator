<template>
  <div>
    <p>
      Aquesta tarja serveix per a <strong>crear una portada</strong> per a vídeos a compartir en xarxes socials.
    </p>
    <p>
      Recomanem usar com a foto un <strong>fotograma representatiu</strong> del vídeo.
    </p>
    <p>
      És pot afegir, si és adient, un títol que capte l'atenció i emojis per transmetre emoció.
    </p>
    <p>
      Aquest model de tarja accepta els següents formats:
    </p>
    <ul>
      <li><strong>1:1</strong>: Portada per a videos quadrats (Facebook, Instagram, canals de Telegram i Whatsapp, etc.).</li>
      <li><strong>16:9</strong>: Portada per a videos panoràmics (Instagram, Twitter).</li>
    </ul>

    <div class="help-examples">
      <img src="./examples/11.png" alt="Exemple 1:1" />
      <img src="./examples/169.png" alt="Exemple 16:9" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'generic-help'
}
</script>
