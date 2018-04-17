<template>
  <div class="content-titles">
    <div class="col2-titles">
      <div class="item-content arena">
        <h3>2v2 Arena Bracket</h3>

        <p><span>Season Current Rating:</span> {{ character.armory.pvp.brackets['ARENA_BRACKET_2v2'].rating }}</p>
        <p><span>Season Games Played:</span> {{ character.armory.pvp.brackets['ARENA_BRACKET_2v2'].seasonPlayed }}</p>
        <p><span>Season Wins / Losses:</span> {{ character.armory.pvp.brackets['ARENA_BRACKET_2v2'].seasonWon }} / {{ character.armory.pvp.brackets['ARENA_BRACKET_2v2'].seasonLost }}</p>

        <h3>3v3 Arena Bracket</h3>

        <p><span>Season Current Rating:</span> {{ character.armory.pvp.brackets['ARENA_BRACKET_3v3'].rating }}</p>
        <p><span>Season Games Played:</span> {{ character.armory.pvp.brackets['ARENA_BRACKET_3v3'].seasonPlayed }}</p>
        <p><span>Season Wins / Losses:</span> {{ character.armory.pvp.brackets['ARENA_BRACKET_3v3'].seasonWon }} / {{ character.armory.pvp.brackets['ARENA_BRACKET_3v3'].seasonLost }}</p>

        <h3>RBG Bracket</h3>

        <p><span>Season Current Rating:</span> {{ character.armory.pvp.brackets['ARENA_BRACKET_RBG'].rating }}</p>
        <p><span>Season Games Played:</span> {{ character.armory.pvp.brackets['ARENA_BRACKET_RBG'].seasonPlayed }}</p>
        <p><span>Season Wins / Losses:</span> {{ character.armory.pvp.brackets['ARENA_BRACKET_RBG'].seasonWon }} / {{ character.armory.pvp.brackets['ARENA_BRACKET_RBG'].seasonLost }}</p>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  export default {
    props: ['character'],

    mounted() {
      let showSpinner = false;
      this.$emit('interface', showSpinner);
    },
  }
</script>
