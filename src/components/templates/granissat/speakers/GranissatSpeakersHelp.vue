<template>
  <div>
    <p>
      Aquesta tarja serveix per a <strong>difondre un acte o esdeveniment públics</strong>,
      com per exemple, un acte de campanya, un debat o una xarrada, <strong>destacant la presència de fins a 4 ponents</strong>. Si hi ha més, vos Recomanem
      utilitzar el model <router-link to="/event">Acte amb Foto</router-link>
    </p>
    <p>
      Recomanem usar <strong>fotos recents</strong> de cada càrrec en primer plànol. Recordeu
      afegir el <strong>tipus d'acte</strong> (per exemple, tipus d'acte: "Debat", títol de l'acte: "Models de finançament").
    </p>
    <p>
      El <strong>text de data i hora</strong> es pot <strong>modificar directament</strong> sobre la tarja fent clic damunt dels camps corresponents.
      Per exemple, si esteu fent una tarja en castellà, podeu traduir la data manualment; o, si voleu afegir un
      interval d'hores, també ho podeu fer directament.
    </p>
    <p>
      És pot afegir, si és adient, el nom del col·lectiu al costat del logo, utilizant el camp "afegir text al logo".
    </p>
    <p>
      Aquest model de tarja accepta els següents formats:
    </p>
    <ul>
      <li><strong>1:1</strong>: model genèric per a compartir en la majoria de xarxes socials (Facebook, Instagram, Twitter, canals de Telegram i Whatsapp, etc.).</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'event-help'
}
</script>
