<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card-text>
          <v-container>
            <form @submit.prevent="Logar">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                  name="email"
                  label="E-Mail"
                  id="email"
                  v-model="email"
                  type="email"
                  required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                  name="passowrd"
                  label="Passowrd"
                  id="password"
                  v-model="password"
                  type="password"
                  required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit">Logar</v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
  },
  watch: {
    user (value){
      if(value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },

  methods: {
    Logar () {
      this.$store.dispatch('LogarUser', {email: this.email, password: this.password})
    },
    onDismissed () {
        this.$store.dispatch('clearError')
      }
  }
}
</script>
