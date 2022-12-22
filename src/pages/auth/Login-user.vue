<template>
  <q-page class="bg-yellow-2 row justify-center items-center">
    <div class="q-pa-xl">
      <div class="flex">
        <div class="q-px-lg">
        <q-card square class="shadow-20" style="width: 400px">
          <q-card-section class="bg-amber">
            <h4 class="text-h5 text-white text-center q-my-md">Đăng nhập</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
             <q-input clearable v-model="email" label="Email" type="Email" :rules="[(val)=> !!val || 'Email không được để trống', emailValidate]">
              <template v-slot:prepend>
                <q-icon name="email"></q-icon>
              </template>
            </q-input>
             <q-input clearable v-model="password" label="Mật khẩu" type="Password" :rules="[(val)=>(val && val.length > 6)|| 'Mật khẩu phải trên 6 ký tự']">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions>
            <q-btn color="amber" class="text-white full-width" label="Đăng nhập" size="md" type="submit" @click="submitForm"></q-btn>
          </q-card-actions>
          <q-card-section>
            <p>Bạn đã có tài khoản chưa?
              <router-link to="/register">Đăng ký ngay !</router-link></p>
          </q-card-section>
        </q-card>
        </div>
        <div class="q-px-lg">
          <q-img src="https://vietnamarch.com.vn/wp-content/uploads/2019/03/coworking-space-thai-ha05.jpg" alt="lỗi ảnh" style="width: 580px; height:417px"></q-img>
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
import { useStore } from 'vuex'
export default {
  name: 'Login-user',
  setup () {
    const term = ref('')
    fetch('https://api.ipify.org?format=json')
      .then(x => x.json())
      .then(({ ip }) => {
        term.value = ip
        console.log(term.value)
      })
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const store = useStore()
    const $q = useQuasar()
    const isLoading = ref(false)
    const submitForm = async () => {
      // Register-user logic
      const data = {
        identifier: email.value,
        password: password.value
      }
      isLoading.value = true
      $q.loadingBar.start()
      try {
        const response = await api.post('/auth/local', data)
        if (response.status === 200) {
          const token = response.data.jwt
          const user = response.data.user
          store.commit('auth/SET_TOKEN', token)
          store.commit('auth/SET_USER', {
            id: user.id,
            username: user.username
          })
          localStorage.setItem('user_id', user.id)
          localStorage.setItem('auths', user.auths)
          localStorage.setItem('token', token)
          localStorage.setItem('ip', term.value)
          isLoading.value = false
          $q.loadingBar.stop()
          router.push('/')
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Email hoặc mật khẩu sai. Vui lòng thử lại!'
        })
        $q.loadingBar.stop()
      }
    }

    const emailValidate = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    }

    return {
      email,
      password,
      term,
      submitForm,
      emailValidate
    }
  }
}
</script>
