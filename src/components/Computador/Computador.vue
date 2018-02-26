<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2 class="primary--text">{{ pc.nome }}</h2>
          </v-card-title>
          <v-card-media
            :src="pc.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{ pc.date | date }}</div>
            <div>R$: {{pc.valor}}</div>
            <div class="green--text">{{pc.descricao}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Comentar Bug</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      pc () {
        return this.$store.getters.carregaPC(this.id)
      }
    }
  }
</script>