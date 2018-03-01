<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="green--text"> Adicionar novo Computador</h2>
        <br>
        <p class="red--text"> Todos os Campos são Obrigatorios</p>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreatePC">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="nome"
              label="nome"
              id="nome"
              v-model="nome"
              required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="valor"
              label="valor"
              id="valor"
              v-model="valor"
              required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="PickFile">Upload Imagem</v-btn>
              <input type="file"
               style="display: none" 
               ref="fileInput" 
               accept="image/*"
               @change="onFilePick" >

            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="descricao"
              label="Descricao"
              id="descricao"
              v-model="descricao"
              multi-line
              required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h3 class="green--text"> Escolha a Data e Hora</h3>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
              <br>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" 
              :disabled="!formIsValid"
              type="sumbit"  >
                Adicionar Computador
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      nome: '',
      descricao: '',
      imageUrl: '',
      valor: '',
      date: null,
      time: new Date(),
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.nome !== '' &&
             this.imageUrl !== '' &&
             this.descricao !== '' &&
             this.valor !== ''

    },
    submitDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      }
      else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
      
    }
  },
  methods: {
    onCreatePC () {
      if (!this.formIsValid){
        return
      }
      if (!this.image) {
        return
      }
      const computadorDados = {
        nome: this.nome,
        descricao: this.descricao,
        image: this.image,
        valor: this.valor,
        date: this.submitDateTime
      }
      console.log('Passei no createPC')
      
      this.$store.dispatch('createPC', computadorDados)
      this.$router.push('/computadores')
    },
    PickFile () {
      this.$refs.fileInput.click()
    },
    onFilePick (event) {
      const files = event.target.files
      let filename = files[0].name
      if(filename.lastIndexOf('.') <= 0) {
        return alert('Por favor adicionar uma imagem valida')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load',() => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
