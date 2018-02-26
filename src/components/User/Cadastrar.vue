<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message">
        </app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card-text>
          <v-container>
            <form @submit.prevent="Cadastrar">
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
                  <v-text-field
                  name="confirmPassowrd"
                  label="Confirm Passowrd"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  :rules="[comparePasswords]">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit" :disabled="loading" :loading="loading">
                    Cadastrar
                    <span slot="loader" class="custom-loader">
                      <v-icon light>
                        cached
                      </v-icon>
                    </span>
                    </v-btn>
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
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Senha não são Iguais' : ''
    },
    user () {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error
    },
    loading () {
      return  this.$store.getters.loading
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
    Cadastrar () {
      this.$store.dispatch('CadastrarUser', {email: this.email, password: this.password})
      
    },
    onDismissed () {
      console.log('Dismissed Alert !')
      this.$store.dispatch('clearError')
      
    }
  }
}
</script>
