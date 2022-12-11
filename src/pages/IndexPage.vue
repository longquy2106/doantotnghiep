<template >
  <q-layout view="hHh lpr fFf" class="bg-grey-1">
      <div class="flex justify-between  q-mx-xl">
        <div class="YL__toolbar-input-container row no-wrap  q-mt-sm" >
          <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />
          <q-input dense outlined square v-model="search" placeholder="Thành phố Hồ Chí Minh" class="bg-white col" />
        </div>
        <!-- time -->
        <div>
          <q-chip class="q-ma-sm" style="width: 215px; height:40px">
            <q-input v-model="time">
              <template v-slot:prepend>
                <q-icon name="event" style="height:40px" >
                </q-icon>
              </template>
            </q-input>
          </q-chip>
        </div>
        <div>
          <q-chip style="min-height: 40px" class="bg-amber-13 text-weight-bold">Tìm Kiếm</q-chip>
        </div>
      </div>

    <div class="flex justify-between q-mx-xl q-my-md">
   <!-- Chọn thuộc tính -->
      <div class="bg-grey-3" style="height: auto; width: 20%;">
        <!--  -->

        <!-- Tầm nhìn -->
        <q-item-label header class="text-weight-bold text-blue-grey-10 q-px-lg q-py-sm ">Tầm nhìn:</q-item-label>
        <q-list class="q-mx-lg">
          <q-item v-for="view in views" :key="view.id">
            <q-checkbox v-model="view.viewCheck" :label="view.nameView" color="teal" />
          </q-item>
        </q-list>

        <!-- Dịch vụ -->
        <!-- <q-separator class="q-my-sm" />
        <q-item-label header class="text-weight-bold text-blue-grey-10 q-px-lg q-py-sm ">v...v...:</q-item-label>
        <q-list class="q-mx-lg">
          <q-item v-for="service in services" :key="service.id">
            <q-checkbox v-model="service.serviceCheck" :label="service.nameService" color="teal" />
          </q-item>
        </q-list> -->

        <!-- còn nữa -->
    </div>

    <!-- Main Page -->
    <div class="" style="width:78%">

      <q-item class="bg-grey-3 q-mx-sm items-center" style="width:100%">
        <div class="" style="width:50%">Các văn phòng làm việc tại: TP.HCM </div>
        <div class="" style="width:50%">
          <div class="text-right"><q-chip>Phổ biến nhất</q-chip></div></div>
      </q-item>

      <q-list items-center class="bg-grey-3 q-ma-sm items-center" style="width:100%">
        <q-separator class="q-my-sm"/>
        <!-- item -->
        <template v-for="room in rooms" :key="room.id">
          <q-item class="bg-grey-1 q-ma-sm" >
            <div class="q-mt-sm" loading="lazy" spinner-color="white" style="width: 240px;height:auto;">
              <img :src="`http://localhost:1337${room.image}`" class="pa-1 logo" style="width: 100%;height:120px" />
            </div>
            <div class="" style="width:50%">
              <div class="col">
                <div>
                  <div> <a class="text-bold q-mx-md" style="fontSize:20px">{{room.nameRooms}}</a></div>
                  <q-item-section class="text-bold q-mx-md" style="fontSize:20px">{{}}</q-item-section>
                  <q-rating class="q-mx-md" v-model="modelRating" size="1.5em" :max="5" color="amber-10"/>
                  <div class="row">
                    <q-icon name="place" class="q-ml-md q-my-sm" style="fontSize:22px"></q-icon>
                    <div class="column">
                      <div class="q-mx-xs q-mt-xs" style="fontSize:12px">{{room.addressRooms}}</div>
                      <div class="q-mx-xs q-mb-xs" style="fontSize:12px">{{room.phoneRooms}}</div>
                    </div>
                  </div>
                  <div class="row">
                    <q-icon name="business" class="q-ml-md " style="fontSize:22px"></q-icon>
                    <div class="q-mx-xs" style="fontSize:14px">{{room.typeRooms}}</div>
                  </div>
                  <div class=" flex q-mx-md">
                    <div><q-chip>Gần phòng tập</q-chip></div>
                    <div><q-chip>Miễn phí WIFI</q-chip></div>
                    <div><q-chip>Miễn phí cà phê</q-chip></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" style="width:28%">
              <div class="col text-right">
                <q-chip>Favorite
                  <q-rating class="q-pl-xs"  v-model="modelFavorite" max="1" size="1.5em" color="red" color-selected="red-9" icon="favorite_border" icon-selected="favorite" icon-half="favorite" no-dimming/>
                </q-chip>
                <div class="row">
                  <div class="col text-bold q-pr-xs q-py-sm" style="fontSize:15px">Giảm:</div>
                  <q-chip class="text-weight-bold bg-green q-ma-xs pseudo text-strike" style="fontSize:15px">25,000đ</q-chip>
                </div>
                <div class="row">
                  <div class="col text-right q-pr-xs q-py-sm" style="fontSize:12px">Chỉ từ</div>
                  <q-item-section class="text-weight-bold q-py-xs q-pr-xl" style="fontSize:25px">250,000đ/H</q-item-section>
                </div>
                <q-btn :to="{ name: 'CompanyInfo', params: { roomId: room.id }}" class="bg-amber-13 text-weight-bold" style="fontSize:15px" >
                  Xem chi tiết
                </q-btn>
              </div>
            </div>
          </q-item>
        </template>
        <q-separator class="q-my-md"/>
      </q-list>
    </div>
    </div>

  </q-layout>
</template>

<script>

import { ref } from 'vue'
import { api } from 'boot/axios'
// ggmap

// ggmap
export default {
  name: 'IndexPage',

  created () {
    api.get('/bookings?populate=*&pagination[pageSize]=1000')
      .then((res) => {
        for (let index = 0; index < res.data.data.length; index++) {
          const tempRoom = {}
          tempRoom.id = res.data.data[index].id
          tempRoom.nameRooms = res.data.data[index].attributes.Name
          tempRoom.addressRooms = res.data.data[index].attributes.Address
          tempRoom.phoneRooms = res.data.data[index].attributes.Phone
          tempRoom.typeRooms = res.data.data[index].attributes.room_type.data?.attributes?.Name
          tempRoom.image = res.data?.data[index]?.attributes?.Image.data[0].attributes.url
          this.rooms.push(tempRoom)
        }

        // const tempRoom = res.data?.data.map(e => ({
        //   id: e.id,
        //   nameRooms: e.attributes.Name,
        //   addressRooms: e.attributes.Address,
        //   phoneRooms: e.attributes.Phone,
        //   typeRooms: e.attributes.room_type.data?.attributes.Name,
        //   image: e.attributes.Image.data?.map(item => ({
        //     url: 'http://localhost:1337' + item.attributes.formats.thumbnail.url
        //   }))[0]
        // }))
      })
    api.get('/view-rooms?populate=*&pagination[pageSize]=1000')
      .then((res) => {
        for (let index = 0; index < res.data.data.length; index++) {
          const tempView = {}
          tempView.id = res.data.data[index].id
          tempView.viewCheck = false
          tempView.nameView = res.data.data[index].attributes.Name
          this.views.push(tempView)
        }
        console.log(this.views)
      })
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).format()
    }, 1000)
  },

  data () {
    return {
      search: ref(''),
      modelFavorite: ref(1),
      modelRating: ref(5),
      roomimage: [],
      rooms: [],
      views: [],
      services: [],
      interval: null,
      time: null
    }
  },
  beforeUnmount () {
    // prevent memory leak
    clearInterval(this.interval)
  }
}

</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
    border-radius: 180px
    height:40px
  &__list
    width: 100%
  &__toolbar-input-btn
    border-radius: 180
    border-style: solid
    border-width: 0.5px 0.5px 0.5px 0.5px
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
    height:40px
</style>
