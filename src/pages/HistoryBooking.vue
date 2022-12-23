<template>
  <q-layout view="hHh lpr fFf" class="bg-grey-1">
    <div class="q-mx-xl">
        <div align="center">
        <div class="text-bold" style="fontSize:35px"><a>Lịch sử đặt phòng</a></div>
      </div>
      <q-page-container>
        <q-page padding>
          <div>
            <!-- table -->
            <div class="q-pa-md">
              <q-table
                title="DANH SÁCH LỊCH SỬ ĐẶT PHÒNG"
                :rows="thisUser.bookingHistory"
                :columns="columnsBookHis"
                row-key="id"
                selection="single"
                v-model:selected="selectedBookHis"
              />
              <div class="q-mt-sm" align="right">
                <q-btn
                  color="primary"
                  icon="edit"
                  label="Xem chi tiết"
                  @click="open"
                />
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>
      <div class="q-pa-md">
        <q-dialog v-model="openStatus" persistent>
          <q-card square class="shadow-20" style="width: 400px">
            <q-card-section class="">
              <h4 class="text-h4 text-bold text-center q-my-md">Đơn Đặt Của Bạn</h4>
            </q-card-section>
            <q-card-section>
              <div class="flex items-center">
                <div><a class="text-bold">Trạng thái đơn đặt:</a></div>
                <div><q-chip>{{this.selectedBookHis[0]?.Status}}</q-chip></div>
              </div>
              <div class="flex items-center">
                <div><a class="text-bold">Mã đơn đặt:&nbsp;</a></div>
                <div><a class="text-amber-14 text-bold">#{{this.selectedBookHis[0]?.Code}}</a></div>
              </div>
              <div class="text-bold" style="fontSize:22px"><a></a></div>
              <div class="q-mx-md q-my-md">
                  <div class="flex q-my-sm">
                    <div>
                      <a style="fontsize: 17px" class="text-bold"
                        >TÊN PHÒNG:</a
                      >
                    </div>
                    <div class="q-mx-md">
                      <a style="fontsize: 17px" class="text-bold"
                        >{{this.selectedBookHis[0]?.Room}}</a
                      >
                    </div>
                  </div>
                  <div class="q-mr-sm q-my-md">
                    <q-img
                      :src="`${inforoom[0]?.imageRoomData}`"
                      style="width: 335px; height: 150px"
                    ></q-img>
                  </div>
                  <div class="flex justify-between">
                    <div class="q-my-xs text-bold"><a>Tên người đặt:&nbsp;</a></div>
                    <div class="q-my-xs"><a>{{this.selectedBookHis[0]?.User_name}}</a></div>
                  </div>
                  <div class="flex justify-between">
                      <div class="q-my-xs text-bold"><a>Số điện thoại:</a></div>
                      <div class="q-my-xs "><a>{{this.selectedBookHis[0]?.Phone_number}}</a></div>
                  </div>
                  <div class="flex justify-between">
                      <div class="q-my-xs text-bold"><a>Địa chỉ Email:</a></div>
                      <div class="q-my-xs "><a>{{this.selectedBookHis[0]?.Email}}</a></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="q-my-xs text-bold"><a>Date booking:&nbsp;</a></div>
                    <div class="q-my-xs"><a>{{this.selectedBookHis[0]?.Date}}</a></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="q-my-xs text-bold"><a>Start time:</a></div>
                    <div class="q-my-xs"><a>{{this.selectedBookHis[0]?.Start_time}}:00</a></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="q-my-xs text-bold"><a>End time:</a></div>
                    <div class="q-my-xs"><a>{{this.selectedBookHis[0]?.End_time}}:00</a></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="q-my-xs text-bold"><a>Total time:</a></div>
                    <div class="q-my-xs"><a>{{this.selectedBookHis[0]?.Total_time}} giờ</a></div>
                  </div>
                  <div class="flex justify-between">
                    <div class="q-my-xs text-bold"><a>Note:</a></div>
                    <div class="q-my-xs"><a>{{this.selectedBookHis[0]?.Note}}</a></div>
                  </div>
                </div>
            </q-card-section>
            <q-card-section>
              <div class="text-bold text-center" style="font-size:22px"><a>Tóm tắt thanh toán</a></div>
              <div class="q-mx-md">
                <!-- left -->
                <div class="flex justify-between">
                  <div class="q-my-xs text-bold"><a>Giá gốc:&nbsp;</a></div>
                  <div class="q-my-xs"><a>{{this.selectedBookHis[0]?.Price}} VND / Giờ</a></div>
                </div>
                <div class="flex justify-between">
                    <div class="q-my-xs text-bold"><a>Thuế:</a></div>
                    <div class="q-my-xs "><a>{{this.selectedBookHis[0]?.Price_VAT}} VND / Giờ</a></div>
                </div>
              </div>
              <q-separator class="q-my-md"></q-separator>
              <div class="text-bold text-right q-mx-md" style="font-size:22px">Tổng: {{this.selectedBookHis[0]?.Total_price}}  VND</div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                flat
                label="Xác nhận"
                color="primary"
                v-close-popup="!cancelEnabled"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
    </q-layout>
</template>
<script>
import { ref } from 'vue'
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
    getPostsRooms () {
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
            tempRoomData.imageRoomData = res.data?.data[tedo]?.attributes?.Images.data.attributes?.url
            this.inforoomdatas.push(tempRoomData)
          }
        })
    },
    open () {
      this.openStatus = true
      for (let tudo = 0; tudo < this.inforoomdatas.length; tudo++) {
        if (this.selectedBookHis[0]?.Room === this.inforoomdatas[tudo].nameRoomData) {
          this.inforoom.push(this.inforoomdatas[tudo])
        }
      }
    }
  },
  mounted () {
    this.getPostsUser()
    this.getPostsRooms()
  },
  data () {
    return {
      inforoom: [],
      inforoomdatas: [],
      openStatus: ref(false),
      dataUsers: [],
      thisUser: [],
      User: [],
      columnsBookHis: [
        {
          name: 'code',
          align: 'center',
          label: 'Code',
          field: 'Code',
          sortable: true
        },
        {
          name: 'date',
          align: 'center',
          label: 'Date',
          field: 'Date',
          sortable: true
        },
        {
          name: 'start_time',
          label: 'Start time',
          field: 'Start_time',
          align: 'center'
        },
        {
          name: 'end_time',
          label: 'End time',
          field: 'End_time',
          align: 'center'
        },
        { name: 'price', label: 'Price', field: 'Price', align: 'center' },
        {
          name: 'price_vat',
          label: 'Price VAT',
          field: 'Price_VAT',
          align: 'center'
        },
        {
          name: 'total_price',
          label: 'Total Price',
          field: 'Total_price',
          align: 'center'
        },
        { name: 'status', label: 'Status', field: 'Status', align: 'center' },
        {
          name: 'user_name',
          label: 'User Name',
          field: 'User_name',
          align: 'center'
        },
        { name: 'email', label: 'Email', field: 'Email', align: 'center' },
        {
          name: 'address',
          label: 'Address',
          field: 'Address',
          align: 'center'
        },
        {
          name: 'phone_number',
          label: 'Phone Number',
          field: 'Phone_number',
          align: 'center'
        },
        { name: 'note', label: 'Note', field: 'Note', align: 'center' },
        { name: 'room', label: 'Room', field: 'Room', align: 'center' },
        {
          name: 'total_time',
          label: 'Total Time',
          field: 'Total_time',
          align: 'center'
        },
        {
          name: 'method_of_payment',
          label: 'Method of payment',
          field: 'Method_of_payment',
          align: 'center'
        }
      ],
      selectedBookHis: []
    }
  }
}
</script>
