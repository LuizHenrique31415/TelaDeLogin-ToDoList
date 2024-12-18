<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      email: '',
      senha: '',
      mostrarSenha: false
    }
  },
  methods: {
    fazerLogin() {
      // Simples validação - você pode modificar conforme sua necessidade
      if (this.email === 'teste@teste.com' && this.senha === '123456') {
        // Salva estado de login
        localStorage.setItem('usuarioLogado', 'true')
        // Redireciona para a página de tarefas
        this.router.push('/tarefas')
      } else {
        // Você pode adicionar um alerta aqui para credenciais inválidas
        alert('Email ou senha inválidos')
      }
    }
  }
})
</script>


<template>
    <!-- Container principal que ocupa toda a altura da tela -->
    <v-container class="fill-height">
      <!-- Row para centralizar o conteúdo vertical e horizontalmente -->
      <v-row justify="center" align="center">
        <!-- Coluna responsiva:
             cols="12" - ocupa toda largura em telas pequenas
             sm="8" - ocupa 8/12 em telas small
             md="6" - ocupa 6/12 em telas médias 
             lg="4" - ocupa 4/12 em telas grandes -->
        <v-col cols="12" sm="8" md="6" lg="4">
          <!-- Card com sombra (elevation-12) -->
          <v-card class="elevation-12">
            <!-- Título do card -->
            <v-card-title class="text-h5 text-center">
              Login
            </v-card-title>
            
            <!-- Corpo do card -->
            <v-card-text>
              <!-- Formulário que previne o comportamento padrão de submit -->
              <v-form @submit.prevent="fazerLogin">
                <!-- Campo de email
                     v-model - liga o valor do campo à variável email
                     prepend-icon - ícone antes do campo
                     required - campo obrigatório -->
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  prepend-icon="mdi-email"
                  type="email"
                  required
                ></v-text-field>
  
                <!-- Campo de senha
                     :type - alterna entre text/password baseado em mostrarSenha
                     append-icon - ícone depois do campo
                     @click:append - ação ao clicar no ícone -->
                <v-text-field
                  v-model="senha"
                  label="Senha"
                  prepend-icon="mdi-lock"
                  :type="mostrarSenha ? 'text' : 'password'"
                  :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="mostrarSenha = !mostrarSenha"
                  required
                ></v-text-field>
  
                <!-- Botão de submit
                     block - ocupa toda a largura
                     mt-4 - margin top 4 -->
                <v-btn 
                  color="primary" 
                  block 
                  class="mt-4"
                  type="submit"
                >
                  Entrar
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
 