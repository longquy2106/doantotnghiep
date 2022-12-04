<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="q-px-xl bg-amber-1">
      <q-toolbar class="row text-black" >
          <q-toolbar-title shrink class="text-weight-bold" style="fontSize:40px">
            Book Now !
          </q-toolbar-title>
        <div class="row q-px-md">
          <router-link :to="{ path: '/' }"><q-chip class="q-px-md text-bold">Địa Điểm</q-chip></router-link>
          <q-chip class="q-px-md text-bold">Khách Hàng Doanh Nghiệp</q-chip>
          <q-chip class="q-px-md text-bold">Đối Tác</q-chip>
          <router-link :to="{ path: '/profile' }"><q-chip class="q-px-md text-bold">Lịch sử đặt phòng</q-chip></router-link>
        </div>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" @click="logout" icon="logout" v-if="$q.screen.gt.sm">
            <q-tooltip>Logout!</q-tooltip>
          </q-btn>
          <q-btn rounded color="white" href="/profile">
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <a class="q-ml-sm text-bold text-black">Jone</a>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" class="q-mr-xl q-mb-md">
        <q-fab
          hide-icon:false
          color="white"
          icon=img:https://f7-zpcloud.zdn.vn/2003224351715430454/e1d302f60890d1ce8881.jpg
              @click="linktomessenger"
        >
        </q-fab>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'MainLayout',
  methods: {
    linktomessenger () {
      window.open('https://www.facebook.com/messages/t/105035399098357')
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_name')
      store.commit('authCLEAR_TOKEN')
      router.push('/login')
    }

    return {
      logout
    }
  }
})
</script>
