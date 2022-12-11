<template>
  <q-layout view="hHh lpr fFf" class="bg-grey-1">
    <div>
      <q-toolbar class="q-mx-xl">
        <div @click="$router.go(-1)" class="q-mr-sm">
          <q-icon name="arrow_back"></q-icon>
        </div>
        <div>
          <a @click="$router.go(-1)">Danh Sách/ Thông Tin Văn Phòng/&nbsp;</a>
        </div>
        <div><a>Thông Tin Đặt Chỗ/&nbsp;</a></div>
        <div><a>Trạng thái</a></div>
      </q-toolbar>
    </div>
    <q-page class="row justify-center items-center">
      <div class="flex items-center ">
        <q-card square class="shadow-20" style="width: 400px">
          <q-card-section class="">
            <h4 class="text-h4 text-bold text-center q-my-md">Đơn Đặt Của Bạn</h4>
          </q-card-section>
          <q-card-section>
            <div class="flex items-center">
              <div><a class="text-bold">Trạng thái đơn đặt:</a></div>
              <div><q-chip>{{dataBookHis[0]?.Status}}</q-chip></div>
            </div>
            <div class="flex items-center">
              <div><a class="text-bold">Mã đơn đặt:&nbsp;</a></div>
              <div><a class="text-amber-14 text-bold">#{{dataBookHis[0]?.Code}}</a></div>
            </div>
            <div class="q-my-md text-justify items-center">
              <q-chip class="bg-pink">
                <a>Sau khi đã xác nhận, chúng tôi sẽ thông báo cho bạn</a>
              </q-chip>
            </div>
            <div class="text-bold" style="fontSize:22px"><a>{{dataBookHis[0]?.Address}}</a></div>
            <div class="q-mx-md q-my-md">
                <div class="flex q-my-sm">
                  <div>
                    <a style="fontsize: 17px" class="text-bold"
                      >TÊN PHÒNG:</a
                    >
                  </div>
                  <div class="q-mx-md">
                    <a style="fontsize: 17px" class="text-bold"
                      >{{dataBookHis[0]?.Room}}</a
                    >
                  </div>
                </div>
                <div class="q-mr-sm q-my-md">
                  <q-img
                    :src="`http://localhost:1337${inforoom[0]?.imageRoomData}`"
                    style="width: 335px; height: 150px"
                  ></q-img>
                </div>
                <div class="flex justify-between">
                  <div class="q-my-xs text-bold"><a>Tên người đặt:&nbsp;</a></div>
                  <div class="q-my-xs"><a>{{dataBookHis[0]?.User_name}}</a></div>
                </div>
                <div class="flex justify-between">
                    <div class="q-my-xs text-bold"><a>Số điện thoại:</a></div>
                    <div class="q-my-xs "><a>{{dataBookHis[0]?.Phone_number}}</a></div>
                </div>
                <div class="flex justify-between">
                    <div class="q-my-xs text-bold"><a>Địa chỉ Email:</a></div>
                    <div class="q-my-xs "><a>{{dataBookHis[0]?.Email}}</a></div>
                </div>
                <div class="flex justify-between">
                  <div class="q-my-xs text-bold"><a>Date booking:&nbsp;</a></div>
                  <div class="q-my-xs"><a>{{dataBookHis[0]?.Date}}</a></div>
                </div>
                <div class="flex justify-between">
                  <div class="q-my-xs text-bold"><a>Start time:</a></div>
                  <div class="q-my-xs"><a>{{dataBookHis[0]?.Start_time}}:00</a></div>
                </div>
                <div class="flex justify-between">
                  <div class="q-my-xs text-bold"><a>End time:</a></div>
                  <div class="q-my-xs"><a>{{dataBookHis[0]?.End_time}}:00</a></div>
                </div>
                <div class="flex justify-between">
                  <div class="q-my-xs text-bold"><a>Total time:</a></div>
                  <div class="q-my-xs"><a>{{dataBookHis[0]?.Total_time}} giờ</a></div>
                </div>
                <div class="flex justify-between">
                  <div class="q-my-xs text-bold"><a>Note:</a></div>
                  <div class="q-my-xs"><a>{{dataBookHis[0]?.Note}}</a></div>
                </div>
              </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold text-center" style="font-size:22px"><a>Tóm tắt thanh toán</a></div>
            <div class="q-mx-md">
              <!-- left -->
              <div class="flex justify-between">
                <div class="q-my-xs text-bold"><a>Giá gốc:&nbsp;</a></div>
                <div class="q-my-xs"><a>{{dataBookHis[0]?.Price}} VND / Giờ</a></div>
              </div>
              <div class="flex justify-between">
                  <div class="q-my-xs text-bold"><a>Thuế:</a></div>
                  <div class="q-my-xs "><a>{{dataBookHis[0]?.Price_VAT}}  VND / Giờ</a></div>
              </div>
            </div>
            <q-separator class="q-my-md"></q-separator>
            <div class="text-bold text-right q-mx-md" style="font-size:22px">Tổng: {{dataBookHis[0]?.Total_price}} VND</div>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
    <div class="text-center q-my-lg">
      <div class="text-bold" style="font-size:22px"><a>Hỗ trợ</a></div>
      <div><a>Gọi ngay cho chúng tôi nếu bạn cần hỗ trợ</a></div>
      <div>
        <q-chip class="bg-amber-14 text-bold">
          <q-icon name="phone" class="q-mr-sm"></q-icon>
          <a>1900 5232</a>
        </q-chip>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { api } from 'boot/axios'
export default ({
  props: {
  },
  name: 'BookStatus',
  created () {
    // api.get('/booking-histories?pagination[pageSize]=1000')
    //   .then((res) => {
    //     this.postsBookHis = res.data.data
    //     this.idNew = this.postsBookHis[this.postsBookHis.length - 1].id.toString()
    //     console.log('newid', this.idNew)
    //   })
    api.get('/booking-histories?pagination[pageSize]=1000')
      .then((res) => {
        this.postsBookHis = res.data.data
        const tempPostBookHis = {}
        tempPostBookHis.id = this.postsBookHis[this.postsBookHis.length - 1].id
        tempPostBookHis.Code = this.postsBookHis[this.postsBookHis.length - 1].attributes.Code
        tempPostBookHis.Date = this.postsBookHis[this.postsBookHis.length - 1].attributes.Date
        tempPostBookHis.Total_price = this.postsBookHis[this.postsBookHis.length - 1].attributes.Total_price
        tempPostBookHis.User_name = this.postsBookHis[this.postsBookHis.length - 1].attributes.User_name
        tempPostBookHis.Phone_number = this.postsBookHis[this.postsBookHis.length - 1].attributes.Phone_number
        tempPostBookHis.Room = this.postsBookHis[this.postsBookHis.length - 1].attributes.Room
        tempPostBookHis.Total_time = this.postsBookHis[this.postsBookHis.length - 1].attributes.Total_time
        tempPostBookHis.Status = this.postsBookHis[this.postsBookHis.length - 1].attributes.Status
        tempPostBookHis.Address = this.postsBookHis[this.postsBookHis.length - 1].attributes.Address
        tempPostBookHis.Start_time = this.postsBookHis[this.postsBookHis.length - 1].attributes.Start_time
        tempPostBookHis.End_time = this.postsBookHis[this.postsBookHis.length - 1].attributes.End_time
        tempPostBookHis.Note = this.postsBookHis[this.postsBookHis.length - 1].attributes.Note
        tempPostBookHis.Email = this.postsBookHis[this.postsBookHis.length - 1].attributes.Email
        tempPostBookHis.Price = this.postsBookHis[this.postsBookHis.length - 1].attributes.Price
        tempPostBookHis.Price_VAT = this.postsBookHis[this.postsBookHis.length - 1].attributes.Price_VAT
        this.dataBookHis.push(tempPostBookHis)
        console.log(this.dataBookHis)
      })
    api.get('/rooms?populate=*&pagination[pageSize]=1000')
      .then((res) => {
        for (let tedo = 0; tedo < res.data.data.length; tedo++) {
          const tempRoomData = {}
          tempRoomData.id = res.data.data[tedo].id
          tempRoomData.nameRoomData = res.data.data[tedo].attributes.Name
          tempRoomData.priceRoomData = res.data.data[tedo].attributes.Price
          tempRoomData.pricevatRoomData = res.data.data[tedo].attributes.Price_VAT
          tempRoomData.codeRoomData = res.data.data[tedo].attributes.Code
          tempRoomData.typeRoomData = res.data.data[tedo].attributes.Type
          tempRoomData.statusRoomData = res.data.data[tedo].attributes.Status
          tempRoomData.sizeRoomData = res.data.data[tedo].attributes.Size
          tempRoomData.imageRoomData = res.data?.data[tedo]?.attributes?.Images.data[0].attributes.url
          this.inforoomdatas.push(tempRoomData)
        }
        console.log(this.inforoomdatas)
        console.log(this.dataBookHis[0]?.Room)
      })
  },
  mounted () {
    setTimeout(() => {
      for (let tudo = 0; tudo < this.inforoomdatas.length; tudo++) {
        if (this.dataBookHis[0]?.Room === this.inforoomdatas[tudo].nameRoomData) {
          this.inforoom.push(this.inforoomdatas[tudo])
        }
      }console.log(this.inforoom)
    }, 1000)
  },
  data () {
    return {
      inforoom: [],
      inforoomdatas: [],
      dataBookHis: []
    }
  }
})
</script>
