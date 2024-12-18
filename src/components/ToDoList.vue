<script lang="ts">
import { defineComponent } from 'vue'

// Definindo o tipo Tarefa
interface Tarefa {
  id: number;
  titulo: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  concluida: boolean;
}

export default defineComponent({
  data() {
    return {
      tarefas: [] as Tarefa[],
      novoTitulo: '',
      prioridadeSelecionada: '',
      filtroAtual: '',
      prioridades: ['Alta', 'Média', 'Baixa'] as const,
      filtros: ['Todas', 'Concluídas', 'Não Concluídas'] as const
    }
  },

  methods: {
    adicionarTarefa(): void {
      if (!this.novoTitulo || !this.prioridadeSelecionada) return

      const novaTarefa: Tarefa = {
        id: Date.now(),
        titulo: this.novoTitulo,
        prioridade: this.prioridadeSelecionada as 'Alta' | 'Média' | 'Baixa',
        concluida: false
      }

      this.tarefas.push(novaTarefa)
      this.novoTitulo = ''
      this.prioridadeSelecionada = ''
    },

    marcarComoConcluida(tarefa: Tarefa): void {
      tarefa.concluida = !tarefa.concluida
    },

    removerTarefa(tarefa: Tarefa): void {
      const index = this.tarefas.indexOf(tarefa)
      this.tarefas.splice(index, 1)
    },

    filtrarTarefas(): Tarefa[] {
      if (this.filtroAtual === 'Concluídas') {
        return this.tarefas.filter(tarefa => tarefa.concluida)
      } else if (this.filtroAtual === 'Não Concluídas') {
        return this.tarefas.filter(tarefa => !tarefa.concluida)
      }
      return this.tarefas
    }
  },

  computed: {
    tarefasFiltradas(): Tarefa[] {
      return this.filtrarTarefas()
    }
  }
})
</script>

<template>
    <v-container>
      <!-- Formulário de Adição -->
      <v-form @submit.prevent="adicionarTarefa">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="novoTitulo"
              label="Título da Tarefa"
              :rules="[v => !!v || 'Título é obrigatório']"
              required
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="4">
            <v-select
              v-model="prioridadeSelecionada"
              :items="prioridades"
              label="Prioridade"
              :rules="[v => !!v || 'Prioridade é obrigatória']"
              required
            ></v-select>
          </v-col>
  
          <v-col cols="12" md="2">
            <v-btn 
              color="primary"
              type="submit"
              block
              :disabled="!novoTitulo || !prioridadeSelecionada"
            >
              Adicionar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
  
      <!-- Filtro -->
      <v-row class="mt-4">
        <v-col cols="12" md="4">
          <v-select
            v-model="filtroAtual"
            :items="filtros"
            label="Filtrar por"
          ></v-select>
        </v-col>
      </v-row>
  
      <!-- Lista de Tarefas -->
      <v-row>
        <v-col 
          v-for="tarefa in tarefasFiltradas" 
          :key="tarefa.id"
          cols="12" md="4"
        >
          <v-card :class="{'bg-grey-lighten-3': tarefa.concluida}">
            <v-card-title>
              <span :class="{'text-decoration-line-through': tarefa.concluida}">
                {{ tarefa.titulo }}
              </span>
            </v-card-title>
            
            <v-card-text>
              <v-chip
                :color="getPrioridadeColor(tarefa.prioridade)"
                text-color="white"
              >
                {{ tarefa.prioridade }}
              </v-chip>
            </v-card-text>
  
            <v-card-actions>
              <v-btn
                :color="tarefa.concluida ? 'success' : 'primary'"
                @click="marcarComoConcluida(tarefa)"
              >
                {{ tarefa.concluida ? 'Concluída' : 'Marcar como concluída' }}
              </v-btn>
              
              <v-btn
                color="error"
                @click="removerTarefa(tarefa)"
              >
                Excluir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>