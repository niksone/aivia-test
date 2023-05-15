<template>
  <v-card width="400">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model.trim="form.email"
          :error-messages="emailError"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model.trim="form.password"
          :error-messages="passwordError"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn class="mt-2" color="primary" block @click="submitForm">
          Login
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { required, email, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
}

const v$ = useVuelidate(rules, form)

const emailError = computed(
  () => v$.value.email.$errors?.[0]?.$message as string
)
const passwordError = computed(
  () => v$.value.password.$errors?.[0]?.$message as string
)

const submitForm = () => {
  v$.value.$validate()
  if (v$.value.$error) return
  router.push({ name: 'game' })
}
</script>
