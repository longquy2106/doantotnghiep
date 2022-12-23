<template>
  <q-layout view="hHh lpr fFf" class="bg-grey-1">
    <div class="q-mx-xl">
      <div class="q-mx-md q-mb-lg">
        <div class="text-bold q-my-md" style="font-size:40px" align="center">
          <a>Thông tin cơ bản</a>
        </div>
        <div class="text-italic q-my-md" style="font-size:40px" align="center">
          <a>Khách hàng: "{{thisUser.username}}"</a>
        </div>
        <div class="text-italic q-my-md" style="font-size:22px" align="center">
          <a>Email: "{{thisUser.email}}"</a>
        </div>
        <div class="flex justify-center">
          <div class="">
            <div class="flex q-mb-lg q-ml-lg justify-center">
              <q-input style="width: 280px" class="q-mr-lg" filled v-model="thisUser.username" label="Tên người dùng"/>
              <q-input style="width: 280px" filled v-model="thisUser.email" label="Email" />
            </div>
            <div class="flex q-my-lg q-ml-lg justify-center">
              <q-input style="width: 280px" class="q-mr-lg" filled v-model="password" label="Mật khẩu" type="Password"
                  :rules="[(val)=>(val && val.length > 5)|| 'Mật khẩu phải >= 6 ký tự']"/>
              <q-input style="width: 280px" filled v-model="thisUser.Full_name" label="Tên đầy đủ"/>
            </div>
            <div class="flex q-mt-lg q-ml-lg">
              <div class="q-mr-lg" style="width: 280px">
                <q-input filled v-model="thisUser.Dob" mask="date" :rules="['date']" label="Ngày sinh">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="thisUser.Dob">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Đóng" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <q-input class="q-mr-lg" style="width: 280px" filled v-model="thisUser.Phone_number" label="Số điện thoại"/>
              <q-input style="width: 280px" filled v-model="thisUser.Address" label="Địa chỉ"/>
            </div>
            <div align="right">
              <q-btn label="Lưu" color="primary" @click="onSaveUser"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>
<script>
import { api } from 'boot/axios'
export default {
  name: 'ProfileUser',
  methods: {
    getPostsUser () {
      api.get('/users?populate=*&?pagination[pageSize]=1000').then((res) => {
        this.postsUser = res.data
        for (let index = 0; index < this.postsUser.length; index++) {
          const tempPostUser = {}
          tempPostUser.id = this.postsUser[index].id
          tempPostUser.email = this.postsUser[index].email
          tempPostUser.username = this.postsUser[index].username
          tempPostUser.Full_name = this.postsUser[index].Full_name
          tempPostUser.Dob = this.postsUser[index].Dob
          tempPostUser.Address = this.postsUser[index].Address
          tempPostUser.auths = this.postsUser[index].auths
          tempPostUser.Phone_number = this.postsUser[index].Phone_number
          tempPostUser.bookingHistory = this.postsUser[index].booking_histories
          this.dataUsers.push(tempPostUser)
        }
        for (let todo = 0; todo < this.dataUsers.length; todo++) {
          if (Number(this.userID) === this.dataUsers[todo].id) {
            this.thisUser = this.dataUsers[todo]
          }
        }
      })
      this.userID = localStorage.user_id
    },
    onSaveUser () {
      if (this.password !== '') {
        api.put(`/users/${this.thisUser.id}`, {
          username: this.thisUser.username,
          email: this.thisUser.email,
          password: this.password,
          Full_name: this.thisUser.Full_name,
          Dob: this.thisUser.Dob,
          Address: this.thisUser.Address,
          auths: this.thisUser.auths,
          Phone_number: this.thisUser.Phone_number
        }).then((response) => {
          if (response.status === 200) {
            console.log('Success')
            this.$q.notify({
              type: 'positive',
              message: 'Cập nhật thành công'
            })
            window.location.reload()
          }
        })
      } else {
        api.put(`/users/${this.thisUser.id}`, {
          username: this.thisUser.username,
          email: this.thisUser.email,
          Full_name: this.thisUser.Full_name,
          Dob: this.thisUser.Dob,
          Address: this.thisUser.Address,
          auths: this.thisUser.auths,
          Phone_number: this.thisUser.Phone_number
        }).then((response) => {
          if (response.status === 200) {
            console.log('Success')
            this.$q.notify({
              type: 'positive',
              message: 'Cập nhật thành công'
            })
            window.location.reload()
          }
        })
      }
    }
  },
  mounted () {
    this.getPostsUser()
  },
  data () {
    return {
      password: '',
      dataUsers: [],
      thisUser: [],
      User: []
    }
  }
}
</script>
