<template>
  <q-layout view="hHh lpr fFf" class="bg-grey-1" :key="room">
    <q-toolbar>
      <div class="row q-mt-md">
        <q-icon @click="$router.go(-1)" name="arrow_back" class="q-ml-xl q-mr-sm q-py-sm"></q-icon>
        <a @click="$router.go(-1)" class="q-py-xs">Danh sách/</a>
        <a class="q-py-xs" href=""> Thông tin văn phòng</a>
      </div>
    </q-toolbar>
    <q-toolbar class="q-mx-xl q-my-md">
      <div class="flex">
        <div class="">
          <div style="fontsize: 16px" class="">Việt Nam</div>
          <div style="fontsize: 16px" class="text-amber-14 q-mt-xs">{{room.totalRooms}}</div>
        </div>
        <q-icon
          name="navigate_next"
          style="fontsize: 18px"
          class="text-bold q-mx-sm q-mt-xs"
        ></q-icon>
        <div class="">
          <div style="fontsize: 16px; min-width: 100px" class="">Miền Nam</div>
          <div style="fontsize: 16px" class="text-amber-14 q-mt-xs">{{room.totalRooms}}</div>
        </div>
        <q-icon
          name="navigate_next"
          style="fontsize: 18px"
          class="text-bold q-mx-sm q-mt-xs"
        ></q-icon>
        <div class="" style="min-width: 175px">
          <div style="fontsize: 16px" class="">Thành Phố Hồ Chí Minh</div>
          <div style="fontsize: 16px" class="text-amber-14 q-mt-xs">{{room.totalRooms}}</div>
        </div>
        <q-icon
          name="navigate_next"
          style="fontsize: 18px"
          class="text-bold q-mx-sm q-mt-xs"
        ></q-icon>
        <div class="" style="min-width: 175px">
          <div style="fontsize: 16px" class="">{{room.nameRooms}}</div>
          <div style="fontsize: 16px" class="text-amber-14 q-mt-xs">1</div>
        </div>
      </div>
    </q-toolbar>
    <div>
      <div>
        <div class="flex q-ml-xl justify-between">
          <div class="">
            <div class="text-bold">
              <a style="fontSize:40px">{{room.nameRooms}}</a>
            </div>
            <div class="flex q-my-md">
              <div>
                <q-icon
                  class="text-green-13 q-mr-xs"
                  style="fontsize: 7px"
                  name="circle"
                ></q-icon>
              </div>
              <div>
                <a class="text-green-13" style="fontsize: 12px">Được tin dùng</a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex q-ml-xl justify-between">
          <div class="flex">
            <div>
              <q-icon name="place" class=""></q-icon>
            </div>
            <div class="justify-between">
              <a class="q-ml-xs">{{room.addressRooms}}&nbsp;</a>
              <a :href="`${room.mapRooms}`" target="_blank" rel="noopener">(xem trên bản đồ)</a><a>.</a>
            </div>
          </div>
          <div class="q-mr-xl">
            <div class="text-right">
              <q-rating
                class=""
                v-model="modelRating"
                size="1.5em"
                :max="5"
                color="amber-10"
              />
            </div>
            <div class="q-mb-sm">
              <a>120 đánh giá từ khách hàng</a>
            </div>
          </div>
        </div>
      </div>

      <div class="q-ml-xl flex justify-between">
        <div style="width:72%">
          <div
            class=""
            style="
              min-width: 860px
              max-width: 2000px
              min-height: 400px
              max-height: 450px
            "
          >
            <q-carousel animated v-model="slide" arrows navigation infinite>
              <q-carousel-slide v-for="roomimage in room.arrImage" :key="roomimage.id"
                :name="roomimage.index"
                :img-src="`${roomimage.url}`"
              />
            </q-carousel>
          </div>
        </div>
        <div class="bg-grey-3 q-mr-xl" style="width:22%">
          <div class="q-mt-md q-mb-sm q-ml-md">
            <div><a style="fontsize: 20px" class="text-bold">Nổi Bật</a></div>
            <div class="q-mx-xl" style="fontsize: 14px">
              <div>
                <q-icon
                  name="task_alt"
                  color="positive"
                  class="q-mx-sm"
                ></q-icon
                ><a>Hơn 50 chỗ</a>
              </div>
              <div>
                <q-icon
                  name="task_alt"
                  color="positive"
                  class="q-mx-sm"
                ></q-icon
                ><a>Vị trí trung tâm</a>
              </div>
              <div>
                <q-icon
                  name="task_alt"
                  color="positive"
                  class="q-mx-sm"
                ></q-icon
                ><a>Thiết bị hiện đại</a>
              </div>
              <div>
                <q-icon
                  name="task_alt"
                  color="positive"
                  class="q-mx-sm"
                ></q-icon
                ><a>Môi trường yên tĩnh</a>
              </div>
            </div>
          </div>
          <div class="q-mt-md q-mb-sm q-ml-md">
            <div><a style="fontsize: 20px" class="text-bold">Tiện ích</a></div>
            <div class="q-mx-xl" style="fontsize: 14px">
              <div v-for="roomservice in room.services_rooms" :key="roomservice.id">
                <a>- {{roomservice.attributes.Name}}</a>
              </div>
            </div>
          </div>
          <div>
            <!-- <a>Chính sách hủy đặt chỗ và hoàn</a>
            <a> tiền dựa trên chính sách của cirCO. </a>
            <a href="">&nbsp;Xem chính sách.</a> -->
          </div>
        </div>
      </div>

      <div class="flex q-ml-xl q-my-lg justify-between" style="width: 70%">
        <div>
          <q-btn flat style="color: #ff0080" class="text-bold" >
            Tổng quan
          </q-btn>
        </div>
        <div>
          <q-btn flat style="color: #ff0080" class="text-bold">
            Giờ làm việc
          </q-btn>
        </div>
        <div>
          <q-btn flat style="color: #ff0080" class="text-bold">
            Không gian làm việc
          </q-btn>
        </div>
        <div>
          <q-btn flat style="color: #ff0080" class="text-bold">
            Đánh giá
          </q-btn>
        </div>
        <div>
          <q-btn flat style="color: #ff0080" class="text-bold"> Hỗ trợ </q-btn>
        </div>
      </div>

      <div class="q-ml-xl q-my-lg" style="width: 70%">
        <div class="text-bold">
          <a style="fontSize: 22px">Tổng quan về {{room.nameRooms}}</a>
        </div>
        <div class="text-justify q-mt-sm">
          <a style="fontSize: 20px"
            >{{room.decripRooms}}</a
          >
        </div>
      </div>

      <div class="q-ml-xl q-my-lg">
        <div><a class="text-bold text-grey-13">Hiện tại:&nbsp;{{time}}</a></div>
        <div class="text-bold"><a style="fontSize: 22px">Giờ làm việc</a></div>
        <div class="flex justify-between" style="width:96%">
          <div>
            <q-card class="my-card">
              <q-card-section align="center">
                <div class="text-bold" style="fontsize: 15px">Thứ 2</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="bg-orange-4 text-white" align="center">
                <div>
                  <div style="fontsize: 10px">Giờ hoạt động</div>
                  <div style="fontsize: 15px">06:00 - 18:30</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div>
            <q-card class="my-card">
              <q-card-section align="center">
                <div class="text-bold" style="fontsize: 15px">Thứ 3</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="bg-orange-4 text-white" align="center">
                <div>
                  <div style="fontsize: 10px">Giờ hoạt động</div>
                  <div style="fontsize: 15px">06:00 - 18:30</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div>
            <q-card class="my-card">
              <q-card-section align="center">
                <div class="text-bold" style="fontsize: 15px">Thứ 4</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="bg-orange-4 text-white" align="center">
                <div>
                  <div style="fontsize: 10px">Giờ hoạt động</div>
                  <div style="fontsize: 15px">06:00 - 18:30</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div>
            <q-card class="my-card">
              <q-card-section align="center">
                <div class="text-bold" style="fontsize: 15px">Thứ 5</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="bg-orange-4 text-white" align="center">
                <div>
                  <div style="fontsize: 10px">Giờ hoạt động</div>
                  <div style="fontsize: 15px">06:00 - 18:30</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div>
            <q-card class="my-card">
              <q-card-section align="center">
                <div class="text-bold" style="fontsize: 15px">Thứ 6</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="bg-orange-4 text-white" align="center">
                <div>
                  <div style="fontsize: 10px">Giờ hoạt động</div>
                  <div style="fontsize: 15px">06:00 - 18:30</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div>
            <q-card class="my-card">
              <q-card-section align="center">
                <div class="text-bold" style="fontsize: 15px">Thứ 7</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="bg-orange-4 text-white" align="center">
                <div>
                  <div style="fontsize: 10px">Giờ hoạt động</div>
                  <div style="fontsize: 15px">06:00 - 18:30</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div>
            <q-card class="my-card">
              <q-card-section align="center">
                <div class="text-bold" style="fontsize: 15px">Chủ Nhật</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="bg-orange-4 text-white" align="center">
                <div>
                  <div style="fontsize: 10px">Giờ hoạt động</div>
                  <div style="fontsize: 15px">06:00 - 18:30</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <div class="q-mx-xl q-my-lg">
        <div class="text-bold">
          <a style="fontSize: 22px">Không gian làm việc</a>
        </div>
        <div>
          <q-card class="my-card">
            <div class="flex">
              <div
                class="q-px-md q-pb-md q-pt-sm"
                style="width: 23%; fontsize: 15px"
              >
                <q-list dense padding class="rounded-borders">
                  <q-item clickable v-ripple class="q-mb-md">
                    <q-item-section> Phòng họp</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple class="q-my-md">
                    <q-item-section> Phòng hội nghị </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple class="q-my-md">
                    <q-item-section> Sảnh sự kiện </q-item-section>
                  </q-item>

                </q-list>
              </div>

              <q-separator vertical inset />

              <div class="q-mr-md" style="width: 75%">
                <div class="flex q-mt-md q-ml-md justify-between">
                  <div style="max-width: 300px">
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
                                  label="Đóng"
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
                  <div><a style="color:crimson; fontSize:17px">* Nếu không thể hiển thị danh sách, vui lòng nhấn phím F5</a></div>
                </div>

                <!-- vòng lặp v-for -->

                <q-separator inset />

                <div v-for="iroom in inforoom" :key="iroom.id" class="flex q-ma-md">
                  <div class="q-mr-md" loading="lazy" spinner-color="white">
                    <q-img
                      style="width: 250px; height: 150px"
                      :src="`${iroom.imageRoomData}`"
                    />
                  </div>
                  <div class="flex justify-between" style="width: 68%">
                    <div>
                      <div>
                        <a style="fontsize: 20px" class="text-bold"
                          > {{iroom.nameRoomData}}&nbsp;-&nbsp;{{iroom.codeRoomData}} </a
                        >
                      </div>
                      <div>
                        <q-icon name="meeting_room" class="q-mr-sm"></q-icon
                        ><a>Kiểu văn phòng:{{iroom.typeRoomData}} </a>
                      </div>
                      <div>
                        <q-icon name="visibility" class="q-mr-sm"></q-icon
                        ><a>Trạng thái:{{iroom.statusRoomData}} </a>
                      </div>
                      <div>
                        <q-icon name="schedule" class="q-mr-sm"></q-icon
                        ><a>Kích thước:{{iroom.sizeRoomData}} &nbsp;người</a>
                      </div>
                      <div>
                        <q-chip
                          >Hoạt động từ:&nbsp;<a class="text-bold">08:00 - 18:00</a></q-chip
                        >
                      </div>
                      <div></div>
                    </div>
                    <div class="q-mt-xl">
                      <div class="text-right text-bold text-red" style="fontsize: 20px">
                        <a>Giá:{{iroom.priceRoomData}} &nbsp;VNĐ / H</a>
                      </div>
                      <div
                        class="text-right text-bold text-black"
                        style="fontsize: 20px"
                      >
                        VAT:{{iroom.pricevatRoomData}} &nbsp;VNĐ / H
                      </div>
                      <div class="float-right q-mt-md">
                        <q-btn :to="{ name: 'BookDetail', params: { roomId: room.id, roomdata: iroom.id }}" class="bg-amber-13 text-bold"
                          >Đặt ngay</q-btn
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <q-separator inset />

                <!-- end vòng lặp v-for -->
              </div>
            </div>
          </q-card>
        </div>
      </div>
      <div class="q-mx-xl q-my-lg">
        <div class="text-bold">
          <a style="fontSize: 22px">Đánh Giá Của Khách Hàng</a>
        </div>
        <div class="flex justify-center">
          <div class="q-pt-md q-mx-md" style="max-width: 30%">
            <q-card class="my-card">
              <q-card-section align="center">
                <div>
                  <q-avatar size="60px">
                    <img src="https://9mobi.vn/cf/images/2015/03/nkk/hinh-anh-dep-1.jpg" />
                  </q-avatar>
                </div>
                <div class="text-bold q-mt-md" style="fontsize: 16px">
                  <a>Hana Sophia</a>
                </div>
                <div>
                  <div class="flex justify-center">
                    <q-icon size="20px" class="q-mr-xs" name="desk"></q-icon>
                    <a class="q-mr-md" style="fontsize: 13px">Meeting</a>
                    <q-icon
                      size="18px"
                      color="warning"
                      class="q-mr-xs"
                      name="star_rate"
                    ></q-icon>
                    <a style="fontsize: 13px">5,0</a>
                  </div>
                  <div class="q-mt-sm text-grey-13">
                    <a>"</a>
                    <a
                      >Không gian làm việc thoáng đãng, mát mẻ, phù hợp cho công
                      việc. Yên tĩnh, rất tuyệt, sẽ tiếp tục đặt.</a
                    >
                    <a>"</a>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="q-pt-md q-mx-md" style="max-width: 30%">
            <q-card class="my-card">
              <q-card-section align="center">
                <div>
                  <q-avatar size="60px">
                    <img src="https://cdn.quasar.dev/img/avatar.png" />
                  </q-avatar>
                </div>
                <div class="text-bold q-mt-md" style="fontsize: 16px">
                  <a>Steve Harvey</a>
                </div>
                <div>
                  <div class="flex justify-center">
                    <q-icon size="20px" class="q-mr-xs" name="desk"></q-icon>
                    <a class="q-mr-md" style="fontsize: 13px">Meeting</a>

                    <q-icon
                      size="18px"
                      color="warning"
                      class="q-mr-xs"
                      name="star_rate"
                    ></q-icon>
                    <a style="fontsize: 13px">5,0</a>
                  </div>
                  <div class="q-mt-sm text-grey-13">
                    <a>"</a>
                    <a
                      >Tôi rất thích kiểu không gian làm việc này.
                      Nó khiến tôi cảm thấy thoải mái, tập trung và
                      có động lực hơn trong công việc </a
                    >
                    <a>"</a>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="q-pt-md q-mx-md" style="max-width: 30%">
            <q-card class="my-card">
              <q-card-section align="center">
                <div>
                  <q-avatar size="60px">
                    <img src="https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-suy-tu-1.jpg" />
                  </q-avatar>
                </div>
                <div class="text-bold q-mt-md" style="fontsize: 16px">
                  <a>Jone Handler</a>
                </div>
                <div>
                  <div class="flex justify-center">
                    <q-icon size="20px" class="q-mr-xs" name="desk"></q-icon>
                    <a class="q-mr-md" style="fontsize: 13px">Event_space</a>
                    <q-icon
                      size="18px"
                      color="warning"
                      class="q-mr-xs"
                      name="star_rate"
                    ></q-icon>
                    <a style="fontsize: 13px">5,0</a>
                  </div>
                  <div class="q-mt-sm text-grey-13">
                    <a>"</a>
                    <a
                      >Tôi đã đặt không gian sự kiện ở đây, cảm thấy
                      sự tận tình của nhân viên là rất tuyệt vời.
                      Tôi muốn lần sau sẽ tiếp tục đặt ở đây.</a
                    >
                    <a>"</a>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <div class="q-mx-xl q-my-lg">
        <div class="text-bold"><a style="fontSize: 22px">Hỗ trợ</a></div>
        <div style="color: black" class="q-mt-sm">
          <q-expansion-item class="bg-amber-12" label="Tôi muốn thay đổi lịch/ đặt phòng ngoài giờ thì sao ?">
            <q-card class="my-card">
              <q-card-section class="text-justify q-mx-md">
                Đối với trường hợp này bạn sẽ phải nhắn tin trực tiếp cho chúng tôi qua icon
                "tin nhắn" (phía bên phải màn hình). Chúng tôi sẽ hỗ trợ cho bạn.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>

        <div style="color: black" class="q-mt-sm">
          <q-expansion-item class="bg-amber-12" label="Tôi không có tài khoản tín dụng hay bất kỳ ví điện tử nào. Làm sao để tôi có thể đặt phòng ?">
            <q-card class="my-card">
              <q-card-section class="text-justify q-mx-md">
                Đối với trường hợp không có ví đinệ tử hoặc tài khoản tín dụng.
                Chỉ có một cách duy nhất là bạn liên hệ với văn phòng sở hữu để hỏi ý kiến.
                Hoặc là có thể đến trực tiếp quầy tiếp tân để đăng ký dịch vụ này.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>

        <div style="color: black" class="q-mt-sm">
          <q-expansion-item class="bg-amber-12" label="Tôi lỡ đặt dịch vụ ở văn phòng A, nhưng muốn chuyển qua văn phòng B thì như thế nào ?">
            <q-card class="my-card">
              <q-card-section class="text-justify q-mx-md">
                Đối với trường hợp này bạn sẽ phải nhắn tin trực tiếp cho chúng tôi qua icon
                "tin nhắn" (phía bên phải màn hình). Chúng tôi sẽ hỗ trợ cho bạn. Vì có liên quan đến phí giao dịch
                nên hãy cân nhắc kỹ trước khi đặt bạn nhé !
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'CompanyInfo',
  created () {
    api.get('/bookings?populate=*&pagination[pageSize]=1000')
      .then((res) => {
        for (let index = 0; index < res.data.data.length; index++) {
          const tempRoom = {}
          tempRoom.id = res.data.data[index].id
          tempRoom.nameRooms = res.data.data[index].attributes.Name
          tempRoom.addressRooms = res.data.data[index].attributes.Address
          tempRoom.phoneRooms = res.data.data[index].attributes.Phone
          tempRoom.mapRooms = res.data.data[index].attributes.Link_map
          tempRoom.decripRooms = res.data.data[index].attributes.Decripstion
          tempRoom.totalRooms = res.data.meta.pagination.total
          tempRoom.rooms = res.data.data[index].attributes.rooms.data
          tempRoom.services_rooms = res.data.data[index].attributes.services_rooms.data
          tempRoom.image = res.data.data[index].attributes.Image.data
          tempRoom.arrImage = []
          for (let tido = 0; tido < tempRoom.image.length; tido++) {
            const tempRoomImage = {}
            tempRoomImage.index = tido + 1
            tempRoomImage.id = tempRoom.image[tido].id
            tempRoomImage.url = tempRoom.image[tido].attributes.url
            tempRoom.arrImage.push(tempRoomImage)
          }
          for (let todo = 0; todo < tempRoom.rooms.length; todo++) {
            const tempRoomData = {}
            tempRoomData.id = tempRoom.rooms[todo].id
            tempRoomData.nameRoomData = tempRoom.rooms[todo].attributes.Name
            tempRoomData.priceRoomData = tempRoom.rooms[todo].attributes.Price
            tempRoomData.pricevatRoomData = tempRoom.rooms[todo].attributes.Price_VAT
            tempRoomData.codeRoomData = tempRoom.rooms[todo].attributes.Code
            tempRoomData.typeRoomData = tempRoom.rooms[todo].attributes.Type
            tempRoomData.statusRoomData = tempRoom.rooms[todo].attributes.Status
            tempRoomData.sizeRoomData = tempRoom.rooms[todo].attributes.Size
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
        this.id = this.$route.params.roomId
        setTimeout(() => {
          for (let index = 0; index < this.rooms.length; index++) {
            if (this.rooms[index].id === Number(this.id)) {
              this.room = this.rooms.find((room) => room.id === Number(this.id))
            }
          }
          for (let tudo = 0; tudo < this.room?.rooms?.length; tudo++) {
            for (let tido = 0; tido < this.roomdatas.length; tido++) {
              if (this.room.rooms[tudo].id === this.roomdatas[tido].id) {
                this.inforoom.push(this.roomdatas[tido])
              }
            }
          }
        }, 1000)
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
          tempRoomData.imageRoomData = res.data?.data[tedo]?.attributes?.Images.data.attributes?.url
          this.roomdatas.push(tempRoomData)
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
  },

  mounted () {

  },
  data () {
    return {
      inforoom: [],
      roomdatas: [],
      rooms: [],
      roomdata: [],
      roomservice: [],
      roomimage: [],
      room: {},
      time: null,
      interval: null,
      slide: ref(1),
      date: new Date().toISOString(),
      search: null,
      modelFavorite: ref(1),
      modelRating: ref(5),
      current: ref(3),
      group: ref(['op1']),
      options: [
        {
          label: 'Option 1',
          value: 'op1'
        },
        {
          label: 'Option 2',
          value: 'op2'
        },
        {
          label: 'Option 3',
          value: 'op3'
        }
      ]
    }
  },
  beforeUnmount () {
    // prevent memory leak
    clearInterval(this.interval)
  }
})
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
    border-radius: 180px
  &__list
    width: 100%
  &__toolbar-input-btn
    border-radius: 180
    border-style: solid
    border-width: 0.5px 0.5px 0.5px 0.5px
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
</style>
