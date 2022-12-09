<template>
  <q-layout view="hHh lpr fFf" class="bg-grey-1">
    <div>
      <q-toolbar class="q-mx-xl">
        <div @click="$router.go(-1)" class="q-mr-sm">
          <q-icon name="arrow_back"></q-icon>
        </div>
        <div>
          <a @click="$router.go(-1)">Danh Sách "Thông Tin Văn Phòng/&nbsp;"</a>
        </div>
        <div><a>Thông Tin Đặt Chỗ</a></div>
      </q-toolbar>
    </div>
    <!-- Trạng thái -->
    <!-- table -->
    <div class="flex">
      <div>
        <div>
          <q-card class="my-card q-mx-xl">
            <q-card-section>
              <div class="flex">
                <div>
                  <q-icon name="waving_hand" color="amber-14" style="fontSize:30px" ></q-icon>
                </div>
                <div class="q-mx-md">
                  <div class="text-bold">
                    <a>Bạn đã có tài khoản BookNow của riêng mình chưa ?</a>
                  </div>
                  <div>
                    <a href="/login">Đăng nhập</a>
                    <a>&nbsp;để thanh toán hoặc&nbsp;</a>
                    <a href="/register">Đăng ký</a>
                    <a>&nbsp;để tận hưởng ưu đã thành viên !</a>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-mx-xl q-my-md">
          <q-card class="my-card" style="width:546px">
            <q-card-section>
              <div class="">
                <a style="fontSize:20px" class="text-bold">Mã Đơn Đặt</a>
              </div>
              <div class="">
                <a style="fontSize:20px" class="text-bold text-amber-13">#{{ codeBooking }}</a>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-mx-xl q-my-md">
          <q-card>
            <q-card-section>
              <div>
                <a class="text-bold" style="fontSize:20px">Thông Tin Khách Hàng</a
                >
              </div>
              <div class="q-my-sm">
                <q-input
                  outlined
                  v-model="khachhang.hovaten"
                  label="Nhập họ và tên"
                  :rules="[(val)=>(val && val.length > 0)|| 'Không được để trống']"
                ></q-input>
              </div>
              <div class="q-my-sm">
                <q-input
                  outlined
                  v-model="khachhang.sdt"
                  label="Nhập số điện thoại"
                  :rules="[(val)=>(val && val.length > 0)|| 'Không được để trống']"
                ></q-input>
              </div>
              <div class="q-my-sm">
                <q-input
                  outlined
                  v-model="khachhang.email"
                  label="Nhập địa chỉ Email"
                  :rules="[(val)=>(val && val.length > 0)|| 'Không được để trống']"
                ></q-input>
              </div>
              <div class="q-my-sm">
                <q-input
                  outlined
                  v-model="khachhang.note"
                  label="Note ghi chú"
                ></q-input>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-mx-xl q-my-md">
          <q-card>
            <q-card-section>
              <div>
                <a style="fontSize:20px" class="text-bold"
                  >Phương Thức Thanh Toán</a
                >
              </div>
              <div>
                <q-card class="q-my-md">
                  <div class="flex q-mx-md">
                    <div>
                      <q-radio
                        size="xs"
                        v-model="shape"
                        val="Thanh toán tại QUẦY"
                      ></q-radio>
                    </div>
                    <div class="q-mt-xs">
                      <a style="fontSize:16px" class="text-bold"
                        >Thanh toán tại quầy</a
                      >
                    </div>
                  </div>
                  <div class="q-mx-xl">
                    <a style="fontsize: 16px"
                      >Chúng tôi sẽ tiến hành gọi cho bạn để xác nhận.</a
                    >
                  </div>
                  <div class="q-mx-xl q-pb-sm">
                    <a style="fontsize: 16px">Vui lòng không tắt máy</a>
                  </div>
                </q-card>
                <!-- Ví điện tử MOMO -->
                <q-card class="q-my-md">
                  <div class="flex q-mx-md">
                    <div>
                      <q-radio
                        size="xs"
                        v-model="shape"
                        val="Thanh toán bằng MOMO"
                      ></q-radio>
                    </div>
                    <div class="q-mt-xs">
                      <a style="fontSize:16px" class="text-bold"
                        >Ví điện tử MOMO</a
                      >
                    </div>
                  </div>
                  <div class="q-mx-md">
                    <q-img
                      style="width:300px, height:300px"
                      src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.15752-9/312085079_835419294249172_1292868566750573491_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=_ZFDErCuaGYAX9kBiSc&_nc_ht=scontent.fsgn5-12.fna&oh=03_AdTrgDkTI6fcGvrh_tZz7WrrOoAc8uBwKeEq8guZACAOzw&oe=639C0A31"
                    ></q-img>
                  </div>
                </q-card>
                <!-- Tài khoản ngân hàng -->
                <q-card class="q-my-sm">
                  <div class="flex q-mx-md">
                    <div>
                      <q-radio
                        size="xs"
                        v-model="shape"
                        val="Thanh toán qua BANKING"
                      ></q-radio>
                    </div>
                    <div class="q-mt-xs">
                      <a style="fontSize:16px" class="text-bold"
                        >Tài khoản ngân hàng</a
                      >
                    </div>
                  </div>
                  <div class="q-mx-md">
                    <q-img
                      src="https://f8-zpcloud.zdn.vn/5570638910810803666/6636dd4a47dc8182d8cd.jpg"
                    ></q-img>
                  </div>
                </q-card>
              </div>
              <div>
                <q-card></q-card>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div>
        <div class="" :key="room">
          <q-card class="">
            <div>
              <q-img
                :src="`http://localhost:1337${room.image}`"
                style="width: 580px; height: 300px"
              ></q-img>
            </div>
            <q-card-section>
              <div>
                <a class="text-bold" style="fontSize:22px">{{
                  room.nameRooms
                }}</a>
              </div>
              <div>
                <a>Địa chỉ: {{ room.addressRooms }}</a>
              </div>
              <div class="q-my-xs">
                <q-rating
                  class=""
                  v-model="modelRating"
                  size="1.5em"
                  :max="5"
                  color="amber-10"
                />
              </div>
              <div>
                <div
                  v-for="roomservice in room.services_rooms"
                  :key="roomservice.id"
                >
                  <q-icon
                    name="done"
                    color="green"
                    style="fontSize:17px"
                    class="q-mr-sm"
                  ></q-icon>
                  <a>{{ roomservice.attributes.Name }}</a>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-my-md" :key="roomdatas">
          <q-card>
            <q-card-section>
              <div>
                <a style="fontSize:22px" class="text-bold">Vị trí đã chọn</a>
              </div>
              <div class="q-mx-md q-my-md">
                <div class="flex q-my-sm">
                  <div>
                    <a style="fontSize:17px" class="text-bold text-italic"
                      >TÊN PHÒNG:</a
                    >
                  </div>
                  <div class="q-mx-md">
                    <a style="fontSize:17px" class="text-bold">{{
                      roomdatas.nameRoomData
                    }}</a>
                  </div>
                </div>
                <div class="q-mr-sm q-my-md">
                  <q-img
                    src="http://localhost:1337/uploads/hd2_mr_205_c043253ef9.jpg?updated_at=2022-12-01T14:53:30.452Z"
                    style="width: 508px; height: 220px"
                  ></q-img>
                </div>
                <div>
                  <div><a>Date booking:</a></div>
                  <div class="" style="max-width: 300px">
                    <q-input
                      filled
                      v-model="date"
                      mask="date"
                      :rules="['date']"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="flex justify-between">
                    <!-- TimeStart -->
                    <div>
                      <div class="q-my-xs"><a>Start time:</a></div>
                      <div class="q-gutter-sm row">
                        <div style="width: 250px">
                          <div class="q-gutter-md">
                            <q-select
                              filled
                              v-model="timestart"
                              :options="optionstime"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- TimeEnd -->
                    <div>
                      <div class="q-my-xs"><a>End time:</a></div>
                      <div class="q-gutter-sm row">
                        <div style="width: 250px">
                          <div class="q-gutter-md">
                            <q-select
                              filled
                              v-model="timeend"
                              :options="optionstime"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-my-md" :key="roomdatas">
          <q-card>
            <q-card-section>
              <div>
                <div>
                  <a style="fontSize:20px"
                    ><a class="text-bold">Bước 1:</a> Nhấn "xác nhận" khi đã
                    điền đủ thông tin.</a
                  >
                </div>
                <div>
                  <a style="fontSize:20px"
                    ><a class="text-bold">Bước 2:</a> Kiểm tra giá tiền ở mục
                    "confirm".</a
                  >
                </div>
                <div>
                  <a style="fontSize:20px"
                    ><a class="text-bold">Bước 3:</a> Tiến hành thanh toán và
                    chờ xác nhận.</a
                  >
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-btn
          @click="dialogBookclick"
          label="Xác nhận"
          class="q-my-xs bg-amber-13"
          style="width: 580px"
        ></q-btn>
      </div>
    </div>
    <div class="q-pa-md">
      <q-dialog v-model="dialogBook" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <h4 class="text-bold">Booking Confirmation</h4>
          </q-card-section>

          <q-card-section class="">
            <div class="flex justify-between">
              <div>
                <div>
                  <a class="text-bold">- MÃ VẬN ĐƠN :</a>&nbsp;
                  <a class="text-bold text-amber-14">#{{ codeBooking }}</a>
                </div>
                <div>
                  <a class="text-bold">- TÊN ĐỊA ĐIỂM :</a>&nbsp;
                  <a>{{ room.nameRooms }}</a>
                </div>
                <div>
                  <a class="text-bold">- ĐỊA CHỈ :</a>&nbsp;
                  <a>{{ room.addressRooms }}</a>
                </div>
                <div>
                  <a class="text-bold">- TÊN PHÒNG :</a>&nbsp;
                  <a>{{ roomdatas.nameRoomData }}</a>
                </div>
                <div>
                  <a class="text-bold">- THỜI GIAN ĐẶT :</a>&nbsp;
                  <a
                    >{{ dateClone }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                      timestart
                    }}&nbsp;-&nbsp;{{ timeend }}</a
                  >
                </div>
                <div>
                  <a class="text-bold">- TÊN KHÁCH HÀNG :</a>&nbsp;
                  <a>{{ khachhang.hovaten }}</a>
                </div>
                <div>
                  <a class="text-bold">- EMAIL :</a>&nbsp;
                  <a>{{ khachhang.email }}</a>
                </div>
                <div>
                  <a class="text-bold">- SỐ ĐIỆN THOẠI :</a>&nbsp;
                  <a>{{ khachhang.sdt }}</a>
                </div>
                <div>
                  <a class="text-bold">- NOTE :</a>&nbsp;
                  <a>{{ khachhang.note }}</a>
                </div>
              </div>
              <div>
                <div>
                  <a class="text-bold">- GIÁ CƠ BẢN :</a>&nbsp;
                  <a>{{ roomdatas.priceRoomData }}&nbsp;VNĐ / Giờ</a>
                </div>
                <div>
                  <a class="text-bold">- TỔNG THỜI GIAN SỬ DỤNG :</a>&nbsp;
                  <a>{{ this.total_time }} Giờ</a>
                </div>
                <div>
                  <a class="text-bold">- TẠM TÍNH :</a>&nbsp;
                  <a>{{ this.tamtinh }}&nbsp;VNĐ</a>
                </div>
                <div>
                  <a class="text-bold">- THUẾ :</a>&nbsp;
                  <a>{{ this.price_vat }}&nbsp;VNĐ</a>
                </div>
                <div>
                  <a class="text-bold">- HÌNH THỨC THANH TOÁN :</a>&nbsp;
                  <a>{{ this.shape }}</a>
                </div>
                <div>
                  <a class="text-bold">- TỔNG TIỀN :</a>&nbsp;
                  <a>{{ this.total_price }}&nbsp;VNĐ</a>
                </div>
              </div>
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Cancel"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              :to="{ name: 'BookStatus', params: { idNew: codeBooking } }"
              flat
              label="Xác nhận"
              color="primary"
              @click="onCreateBook"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-layout>
</template>

<script>
import { api } from 'boot/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
export default {
  name: 'BookDetail',
  created () {
    api.get('/bookings?populate=*').then((res) => {
      for (let index = 0; index < res.data.data.length; index++) {
        const tempRoom = {}
        tempRoom.id = res.data.data[index].id
        tempRoom.nameRooms = res.data.data[index].attributes.Name
        tempRoom.addressRooms = res.data.data[index].attributes.Address
        tempRoom.rooms = res.data.data[index].attributes.rooms.data
        tempRoom.services_rooms = res.data.data[index].attributes.services_rooms.data
        tempRoom.image = res.data.data[index].attributes.Image.data[0].attributes.url
        for (let todo = 0; todo < tempRoom.rooms.length; todo++) {
          const tempRoomData = {}
          tempRoomData.id = tempRoom.rooms[todo].id
          tempRoomData.nameRoomData = tempRoom.rooms[todo].attributes.Name
          tempRoomData.priceRoomData = tempRoom.rooms[todo].attributes.Price
          tempRoomData.pVATRoomData = tempRoom.rooms[todo].attributes.Price_VAT
          this.roomdata.push(tempRoomData)
        }
        for (let tudo = 0; tudo < tempRoom.services_rooms.length; tudo++) {
          const tempRoomService = {}
          tempRoomService.id = tempRoom.services_rooms[tudo].id
          tempRoomService.nameRoomService = tempRoom.services_rooms[tudo].attributes.Name
          this.roomservice.push(tempRoomService)
        }
        this.rooms.push(tempRoom)
      }
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
    this.userID = localStorage.user_id
  },

  mounted () {
    console.log('this.router', this.$route)
    this.id = this.$route.params.roomId
    this.dataid = this.$route.params.roomdata
    setTimeout(() => {
      for (let index = 0; index < this.rooms.length; index++) {
        if (this.rooms[index].id === Number(this.id)) {
          this.room = this.rooms.find((room) => room.id === Number(this.id))
          console.log('this.room', this.room)
        }
      }
      for (let todo = 0; todo < this.roomdata.length; todo++) {
        if (this.roomdata[todo].id === Number(this.dataid)) {
          this.roomdatas = this.roomdata.find(
            (roomdatas) => roomdatas.id === Number(this.dataid)
          )
          console.log('this.roomdatas', this.roomdatas)
        }
      }
      console.log(this.roomdatas.priceRoomData)
    }, 1000)
  },
  methods: {
    dialogBookclick () {
      this.total_time = this.timeend - this.timestart
      this.tamtinh = this.total_time * this.roomdatas.priceRoomData
      this.price_vat = (this.tamtinh * 10) / 100
      this.total_price = this.tamtinh + this.price_vat
      if (this.khachhang.hovaten !== '' && this.khachhang.sdt !== '' && this.khachhang.email !== '' && this.total_time > 0) {
        this.dialogBook = true
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Vui lòng kiểm tra lại các giá trị nhập liệu'
        })
      }
      const day = this.date.split('T')[0].split('-')[2]
      const month = this.date.split('T')[0].split('-')[1]
      const year = this.date.split('T')[0].split('-')[0]
      this.dateClone = `${day}/${month}/${year}`
      console.log(this.dateClone)
    },
    onCreateBook () {
      api.post('/booking-histories', {
        data: {
          Code: this.codeBooking.toString(),
          Start_time: this.timestart,
          End_time: this.timeend,
          Date: this.dateClone,
          Price: Number(this.roomdatas.priceRoomData),
          Price_VAT: Number(this.price_vat),
          Total_price: Number(this.total_price),
          Status: this.bookStatus,
          User_name: this.khachhang.hovaten,
          Phone_number: this.khachhang.sdt,
          Email: this.khachhang.email,
          Address: this.room.nameRooms,
          Room: this.roomdatas.nameRoomData,
          Note: this.khachhang.note,
          Total_time: this.total_time,
          Method_of_payment: this.shape,
          user: this.userID.toString()
        }
      }).then((response) => {
        console.log(response)
        if (response.status === 200) {
          console.log('Success')
          this.$q.notify({
            type: 'positive',
            message: 'Đặt phòng thành công'
          })
        }
      })
      // api.get('/booking-histories?pagination[pageSize]=1000')
      //   .then((res) => {
      //     this.postsBookHis = res.data.data
      //     this.idNew = this.postsBookHis[this.postsBookHis.length - 1].id.toString()
      //     console.log('newid', this.idNew)
      //   })
    }
  },
  data () {
    return {
      userID: '',
      idNew: '',
      dateClone: '',
      codeBooking: Math.floor(Math.random() * 10000000),
      khachhang: {
        hovaten: '',
        sdt: '',
        email: '',
        note: ''
      },
      bookStatus: 'Đang xác thực',
      roomservice: [],
      modelRating: '5',
      router: useRouter(),
      $q: useQuasar(),
      shape: 'Thanh toán tại QUẦY',
      dialogBook: ref(false),
      date: new Date().toISOString(),
      roomdata: [],
      roomdatas: [],
      total_time: 0,
      tamtinh: 0,
      price_vat: 0,
      total_price: 0,
      rooms: [],
      room: [],
      views: [],
      interval: null,
      time: null,
      timestart: '08.00',
      timeend: '09.00',
      optionstime: [
        '08.00',
        '09.00',
        '10.00',
        '11.00',
        '12.00',
        '13.00',
        '14.00',
        '15.00',
        '16.00',
        '17.00',
        '18.00'
      ]
    }
  }
}
</script>
