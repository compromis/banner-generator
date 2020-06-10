<template>
  <div
    :id="'bannerCanvas' + aspect"
    :class="[
      'banner-canvas',
      banner.localLabel && banner.hasLocalLabel ? 'has-local-label' : '',
    ]"
    v-if="banner">
    <div class="background">
      <img :src="banner.tweetEmbed.entities.media[0].media_url_https" v-if="banner.tweetEmbed && banner.tweetEmbed.entities['media']" alt="Imatge" :style="objectPosition" />
    </div>
    <div class="tweet" v-if="banner.tweetEmbed">
      <div class="tweet-user">
        <div class="tweet-user-pic">
          <img :src="banner.tweetEmbed.user.profile_image_url_https" />
        </div>
        <div class="tweet-user-name">
          {{ banner.tweetEmbed.user.name }}
          <span v-if="banner.tweetEmbed.user.verified" class="verified">Verified</span>
          <span class="tweet-user-screenname">@{{ banner.tweetEmbed.user.screen_name }}</span>
        </div>
      </div>
      <div class="tweet-text">
        {{ banner.tweetEmbed.full_text }}
        <div class="tweet-quote" v-if="banner.tweetEmbed.is_quote_status">
          <div class="tweet-quote-user">
            <img :src="banner.tweetEmbed.quoted_status.user.profile_image_url_https" />
            {{ banner.tweetEmbed.user.name }}
            <span v-if="banner.tweetEmbed.quoted_status.user.verified" class="verified">Verified</span>
            <span class="tweet-user-screenname">@{{ banner.tweetEmbed.quoted_status.user.screen_name }}</span>
          </div>
          <div class="tweet-quote-text">
            {{ banner.tweetEmbed.quoted_status.full_text }}
          </div>
        </div>
      </div>
      <div class="tweet-date">
        {{ banner.tweetEmbed.created_at }}
      </div>
      <div class="tweet-rts">
        {{ banner.tweetEmbed.retweet_count }}
      </div>
      <div class="tweet-faves">
        {{ banner.tweetEmbed.favorite_count }}
      </div>
    </div>
    <div class="logo">
      <compromis-logo :mono="true" />
      <div :class="{ 'logo-local-label': true, 'logo-local-label--long': banner.localLabel.length > 18 }" v-if="banner.localLabel && banner.hasLocalLabel">
        {{ banner.localLabel | formatLocal }}
      </div>
    </div>
  </div>
</template>

<script>
import CanvasMixin from '@/mixins/canvas-mixin.js'

export default {
  name: 'tweet-canvas',

  mixins: [CanvasMixin],

  methods: {

  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";

  .background {
    background-color: $gray-900;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    img {
      width: 100%;
      height: 100%;
      opacity: .25;
      object-fit: cover;
    }
  }

  .tweet {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 200;
    color: white;
  }

  .logo {
    color: $white;
    z-index: 20;

    &-local-label {
      color: $white;
    }
  }
</style>
