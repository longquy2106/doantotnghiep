<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-amber-1">
      <q-toolbar>

        <q-toolbar-title style="fontSize:41px" @click="toPageMain" class="text-bold text-black">
          Book Now!
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AuthLayout',
  methods: {
    toPageMain () {
      const route = this.$router.resolve({ path: '/' })
      window.open(route.href)
    }
  }
})
</script>
