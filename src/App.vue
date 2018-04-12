<template>
  <v-app>
    <v-navigation-drawer temporary app v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.nome"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.nome }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile 
          v-if="userIsAuthenticated"
          @click="Sair">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sair</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Terabyte</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.nome"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.nome }}
        </v-btn>
        <v-btn 
          v-if="userIsAuthenticated"
          flat
          @click="Sair">
          <v-icon left dark>exit_to_app</v-icon>
          Sair
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
      }
    },
    computed: {
      menuItems () { 
        let menuItems = [
          { icon: 'face', nome: 'Cadastrar', link: '/cadastrar' },
          { icon: 'lock_open', nome: 'Login', link: '/login' }
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
          { icon: 'laptop', nome: 'Computadores', link: '/computadores' },
          { icon: 'note_add', nome: 'Novo Computador', link: '/computador/new' },
          { icon: 'person', nome: 'Perfil', link: '/perfil' }

          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      Sair () {
        this.$store.dispatch('sair')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>