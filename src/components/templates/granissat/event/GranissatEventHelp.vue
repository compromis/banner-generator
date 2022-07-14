<template>
  <div>
    <p>
      Aquesta tarja serveix per a <strong>difondre un acte o esdeveniment públics</strong>,
      com per exemple, un acte de campanya, un debat o una xarrada.
    </p>
    <p>
      Recomanem usar una <strong>foto representativa</strong> de la temàtica de l'acte i afegir el
      <strong>tipus d'acte</strong> (per exemple, tipus d'acte: "Debat", títol de l'acte: "Models de finançament").
    </p>
    <p>
      En l'apartat ponents es poden afegir fins a 6 persones que participen en l'acte. En cas d'haver
      moderador, es pot afegir l'últim, amb la fórmula "Modera: nom".
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
      <li><strong>9:16</strong>: model per a stories (Instagram, Facebook, Whatsapp). Aquest model no inclou el logo de Comporomís perquè ja és mostra a la part superior esquerra quan es comparteix en l'aplicació. Per favor, no l'afegiu.</li>
      <li><strong>Portada</strong>: model per a la portada de l'esdeveniment de l'acte a Facebook. Nota: certa informació no està present en aquest format perquè facebook ja l'afegeix al costat de la portada l'hora de crear l'esdeveniment. No l'afegiu també a la imatge, per favor. </li>
    </ul>

    <div class="help-examples">
      <img src="./examples/11.png" alt="Exemple 1:1" />
      <img src="./examples/916.png" alt="Exemple 9:16" />
      <img src="./examples/event.png" alt="Exemple Portada" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'event-help'
}
</script>
