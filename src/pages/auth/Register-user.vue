<template>
  <q-page class="bg-yellow-2 row justify-center items-center">
    <div class="q-pa-lg">
      <div class="flex">
        <div class="q-px-lg" >
        <q-card square class="shadow-24" style="width: 400px">
          <q-card-section class="bg-amber">
            <h4 class="text-h5 text-white text-center q-my-md">Register</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input clearable v-model="username" label="Username" :rules="[(val)=>(val && val.length > 6)|| 'Username must be longer 6 characters']">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
             </q-input>
             <q-input clearable v-model="email" label="Email" type="Email" :rules="[(val)=> !!val || 'Email is missing', emailValidate]">
              <template v-slot:prepend>
                <q-icon name="email"></q-icon>
              </template>
            </q-input>
             <q-input clearable v-model="password" label="Password" type="Password" :rules="[(val)=>(val && val.length > 6)|| 'Username must be longer 6 characters']">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions>
            <q-btn color="amber" class="text-white full-width" label="Register" size="md" type="submit" @click="submitForm"></q-btn>
          </q-card-actions>
          <q-card-section>
            <p>Already have an account?
              <router-link to="/login">Login Now !</router-link></p>
          </q-card-section>
        </q-card>
        </div>
        <div class="q-px-lg">
          <div class=" "><a style="fontSize:25px" class="text-bold text-orange text-italic">"Đến với chúng tôi các bạn sẽ nhận được</a></div>
          <div class="q-my-sm text-right"><a style="fontSize:25px" class="text-bold text-orange text-italic">những ưu đãi hấp dẫn ! ! !"</a></div>
          <div><q-img src="https://ceosuite.vn/wp-content/uploads/2019/09/Service-Office-Coworking-Virtual-Office-Meeting-Room.jpg?x12097" alt="lỗi ảnh" style="width: 580px; height:417px"></q-img></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
export default {
  name: 'Register-user',
  setup () {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const auths = ref('user')
    const router = useRouter()
    const $q = useQuasar()
    const isLoading = ref(false)
    const submitForm = async () => {
      // Register-user logic
      const data = {
        username: username.value,
        email: email.value,
        password: password.value,
        auths: auths.value
      }
      isLoading.value = true
      $q.loadingBar.start()
      try {
        const response = await api.post('/auth/local/register', data)
        if (response.status === 200) {
          isLoading.value = false
          $q.loadingBar.stop()
          router.push('/login')
          $q.notify({
            type: 'positive',
            message: 'Đăng ký thành công !'
          })
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Register is fail. Try again!'
        })
      }
    }

    const emailValidate = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    }

    return {
      username,
      email,
      password,
      submitForm,
      emailValidate
    }
  }
}
</script>
