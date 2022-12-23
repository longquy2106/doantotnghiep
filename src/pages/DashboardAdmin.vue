<template>
  <q-layout view="hHh Lpr lff" style="height: 300px">
    <div>
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        bordered
        class="bg-grey-3 q-my-md"
      >
        <q-scroll-area class="fit">
          <q-list class="q-mt-xl" bordered>
            <q-item v-ripple>
              <q-item-section avatar>
                <q-icon name="business" />
              </q-item-section>
              <q-item-section>Quản lý công ty</q-item-section>
              <q-toggle v-model="dscongty" />
            </q-item>
            <q-separator />
            <q-item v-ripple>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Quản lý người dùng</q-item-section>
              <q-toggle v-model="dsnguoidung" />
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="meeting_room" />
              </q-item-section>
              <q-item-section>Quản lý văn phòng</q-item-section>
              <q-toggle v-model="dsvanphong" />
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="manage_search" />
              </q-item-section>
              <q-item-section>Quản lý lịch sử đặt phòng</q-item-section>
              <q-toggle v-model="dslichsu" />
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="format_list_bulleted" />
              </q-item-section>
              <q-item-section>Quản lý kiểu văn phòng</q-item-section>
              <q-toggle v-model="dskieu" />
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="wifi_2_bar" />
              </q-item-section>
              <q-item-section>Quản lý dịch vụ văn phòng</q-item-section>
              <q-toggle v-model="dsdichvu" />
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="visibility" />
              </q-item-section>
              <q-item-section>Quản lý tầm nhìn văn phòng</q-item-section>
              <q-toggle v-model="dsview" />
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>
    </div>

    <!-- "DANH SÁCH CÁC CÔNG TY" -->
    <q-page-container v-show="dscongty">
      <q-page padding>
        <div >
          <!-- table -->
          <div class="q-pa-md">
            <q-table
              title="DANH SÁCH CÁC CÔNG TY"
              :rows="dataCompanies"
              :columns="columnsCompanies"
              row-key="id"
              selection="single"
              v-model:selected="selectedCo"
            />
            <div class="flex justify-end q-mt-md">
              <div class="q-mr-sm">
                <q-btn
                  color="primary"
                  icon="add"
                  label="Thêm"
                  @click="createCompany = true"
                />
              </div>
              <div class="q-mr-sm">
                <q-btn
                  color="primary"
                  icon="edit"
                  label="Chỉnh sửa"
                  @click="(updateCompany = true, openDialogCompanyUpdate())"
                />
              </div>
              <div>
                <q-btn
                  color="primary"
                  icon="delete"
                  label="Xóa"
                  @click="deleteCompany"
                />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- Tạo mới thông tin công ty -->
    <div class="q-pa-md">
      <q-dialog v-model="createCompany" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-ml-lg text-bold">Thêm mới công ty</h4>
            </div>
            <div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="congty.tencongty"
                  label="Tên công ty"
                />
                <q-input filled v-model="congty.macongty" label="Mã công ty" />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="congty.diachicty"
                  label="Địa chỉ"
                />
                <q-input
                  filled
                  v-model="congty.sdtcty"
                  type="tel"
                  label="Số điện thoại"
                />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="congty.linkmap"
                  label="Đường dẫn trên bản đồ (GGMap)"
                />
                <div>
                  <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"/>
                </div>
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectRoomType"
                  :options="this.dataRoomType"
                  option-value="id"
                  option-label="Name"
                  label="Kiểu văn phòng"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectRoomService"
                  emit-value="id"
                  multiple
                  :options="this.dataRoomService"
                  option-value="id"
                  option-label="Name"
                  label="Dịch vụ"
                />
              </div>
              <div class="q-mt-md q-ml-lg">
                <q-input
                  style="width: 390px"
                  class="q-mr-lg"
                  filled
                  v-model="congty.motacty"
                  type="textarea"
                  label="Mô tả"
                />
              </div>
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onCreateCompany"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- Chỉnh sửa thông tin công ty -->
    <div class="q-pa-md">
      <q-dialog v-model="updateCompany" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-ml-lg text-bold">Chỉnh sửa thông tin công ty</h4>
            </div>
            <div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateCo.Name"
                  label="Tên công ty"
                />
                <q-input filled v-model="editUpdateCo.Code" label="Mã công ty" />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateCo.Address"
                  label="Địa chỉ"
                />
                <q-input
                  filled
                  v-model="editUpdateCo.Phone"
                  type="tel"
                  label="Số điện thoại"
                />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateCo.Link_map"
                  label="Đường dẫn trên bản đồ (GGMap)"
                />
                <div>
                  <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"/>
                </div>
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectRoomType"
                  :options="this.dataRoomType"
                  option-value="id"
                  option-label="Name"
                  label="Kiểu văn phòng"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectRoomService"
                  emit-value="id"
                  multiple
                  :options="this.dataRoomService"
                  option-value="id"
                  option-label="Name"
                  label="Dịch vụ"
                />
              </div>
              <div class="q-mt-md q-ml-lg">
                <q-input
                  style="width: 390px"
                  class="q-mr-lg"
                  filled
                  v-model="congty.motacty"
                  type="textarea"
                  label="Mô tả"
                />
              </div>
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onUpdateCompany"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- "DANH SÁCH NGƯỜI DÙNG" -->
    <q-page-container v-show="dsnguoidung">
      <q-page padding>
        <!-- table -->
        <div class="q-pa-md">
          <q-table
            title="DANH SÁCH NGƯỜI DÙNG"
            :rows="dataUsers"
            :columns="columnsUsers"
            row-key="id"
            selection="single"
            v-model:selected="selectedUser"
          />
          <div class="flex justify-end q-mt-md">
            <div class="q-mr-sm">
              <q-btn
                class="q-mr-sm"
                color="primary"
                icon="add"
                label="Thêm"
                @click="createUser = true"
              />
              <q-btn
                color="primary"
                icon="edit"
                label="Chỉnh sửa"
                @click="(editUser = true, openDialogUserUpdate())"
              />
            </div>
            <div>
              <q-btn
                color="primary"
                icon="delete"
                label="Xóa"
                @click="deleteUser"
              />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- TẠO MỚI NGƯỜI DÙNG -->
    <div class="q-pa-md">
      <q-dialog v-model="createUser" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-ml-lg text-bold">Thêm mới người dùng</h4>
            </div>
            <div>
              <div class="q-mt-md q-mx-lg">
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="nguoidung.username"
                  label="Tên người dùng"
                />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="nguoidung.emailnguoidung"
                  label="Địa chỉ email"
                  type="Email"
                />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="nguoidung.passnguoidung"
                  label="Mật khẩu"
                  type="Password"
                  :rules="[(val)=>(val && val.length > 5)|| 'Mật khẩu phải >= 6 ký tự']"
                />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="nguoidung.sdtnguoidung"
                  label="Số điện thoại"
                />
                <div class="flex q-mt-md">
                  <div>
                    <q-input
                      class="q-mr-sm"
                      filled
                      label="Ngày sinh"
                      style="width:180px"
                      v-model="nguoidung.dobnguoidung"
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
                            <q-date v-model="nguoidung.dobnguoidung">
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
                  <div>
                    <q-select
                      filled
                      style="width:180px"
                      v-model="nguoidung.auths"
                      :options="optionsAuths"
                      label="Quyền"
                    />
                  </div>
                </div>
                <q-input
                  filled
                  v-model="nguoidung.tennguoidung"
                  label="Tên người dùng"
                />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="nguoidung.diachinguoidung"
                  label="Địa chỉ"
                />
              </div>
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onCreateUser"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG -->
    <div class="q-pa-md">
      <q-dialog v-model="editUser" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-ml-lg text-bold">Chỉnh sửa người dùng</h4>
            </div>
            <div>
              <div class="q-mt-md q-mx-lg">
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="editnguoidung.username"
                  label="Tên người dùng"
                />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="editnguoidung.emailnguoidung"
                  label="Địa chỉ email"
                  type="Email"
                />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="editnguoidung.passnguoidung"
                  label="Mật khẩu"
                  type="Password"
                  :rules="[(val)=>(val && val.length > 5)|| 'Mật khẩu phải >= 6 ký tự']"
                />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="editnguoidung.sdtnguoidung"
                  label="Số điện thoại"
                />
                <div class="flex q-mt-md">
                  <div>
                    <q-input
                      class="q-mr-sm"
                      filled
                      label="Ngày sinh"
                      style="width:180px"
                      v-model="editnguoidung.dobnguoidung"
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
                            <q-date v-model="editnguoidung.dobnguoidung">
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
                  <div>
                    <q-select
                      filled
                      style="width:180px"
                      v-model="editnguoidung.auths"
                      :options="optionsAuths"
                      label="Quyền"
                    />
                  </div>
                </div>
                <q-input
                  filled
                  v-model="editnguoidung.tennguoidung"
                  label="Tên người dùng"
                />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="editnguoidung.diachinguoidung"
                  label="Địa chỉ"
                />
              </div>
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onUpdateUser"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- "DANH SÁCH CÁC VĂN PHÒNG" -->
    <q-page-container v-show="dsvanphong">
      <q-page padding>
        <div>
          <!-- table -->
          <div class="q-pa-md">
            <q-table
              title="DANH SÁCH CÁC VĂN PHÒNG"
              :rows="dataRooms"
              :columns="columnsRooms"
              row-key="id"
              selection="single"
              v-model:selected="selectedRo"
            />
            <div class="flex justify-end q-mt-md">
              <div class="q-mr-sm">
                <q-btn
                  class="q-mr-sm"
                  color="primary"
                  icon="add"
                  label="Thêm"
                  @click="createRooms = true"
                />
                <q-btn
                  color="primary"
                  icon="edit"
                  label="Chỉnh sửa"
                  @click="(updateRoom = true, openDialogRoomUpdate())"
                />
              </div>
              <div>
                <q-btn
                  color="primary"
                  icon="delete"
                  label="Xóa"
                  @click="deleteRoom"
                />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- Tạo mới thông tin văn Phòng -->
    <div class="q-pa-md">
      <q-dialog v-model="createRooms" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-ml-lg text-bold">Thông tin văn phòng</h4>
            </div>
            <div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="vanphong.tenphong"
                  label="Tên phòng"
                />
                <q-input filled v-model="vanphong.giaphong" label="Giá" />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="vanphong.giaVAT"
                  label="Giá VAT"
                />
                <q-input
                  filled
                  v-model="vanphong.codephong"
                  label="Mã văn phòng"
                />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="vanphong.sizephong"
                  label="Kích thước"
                />
                <div>
                  <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"/>
                </div>
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectCompanies"
                  :options="this.dataCompanies"
                  option-value="id"
                  option-label="Name"
                  label="Thuộc công ty"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="vanphong.kieuphong"
                  :options="kieuphong"
                  label="Kiểu phòng"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectRoomService"
                  multiple
                  :options="this.dataRoomService"
                  option-value="id"
                  option-label="Name"
                  label="Dịch vụ văn phòng"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectRoomView"
                  multiple
                  :options="this.dataRoomView"
                  option-value="id"
                  option-label="Name"
                  label="Tầm nhìn văn phòng"
                />
              </div>
              <div class="q-mt-md q-ml-lg">
                <q-input
                  style="width: 390px"
                  class="q-mr-lg"
                  filled
                  v-model="vanphong.motaphong"
                  type="textarea"
                  label="Mô tả"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="vanphong.trangthai"
                  :options="trangthai"
                  label="Trạng thái"
                />
              </div>
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onCreateRoom"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- Chỉnh sửa thông tin văn phòng -->
    <div class="q-pa-md">
      <q-dialog v-model="updateRoom" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-ml-lg text-bold"> Chỉnh sửa thông tin văn phòng</h4>
            </div>
            <div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateRo.Name"
                  label="Tên phòng"
                />
                <q-input filled v-model="editUpdateRo.Price" label="Giá" />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateRo.Price_VAT"
                  label="Giá VAT"
                />
                <q-input
                  filled
                  v-model="editUpdateRo.Code"
                  label="Mã văn phòng"
                />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateRo.Size"
                  label="Kích thước"
                />
                <div>
                  <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"/>
                </div>
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectCompanies"
                  :options="this.dataCompanies"
                  option-value="id"
                  option-label="Name"
                  label="Thuộc công ty"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="editUpdateRo.Type"
                  :options="kieuphong"
                  label="Kiểu phòng"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectRoomService"
                  multiple
                  :options="this.dataRoomService"
                  option-value="id"
                  option-label="Name"
                  label="Dịch vụ văn phòng"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="selectRoomView"
                  multiple
                  :options="this.dataRoomView"
                  option-value="id"
                  option-label="Name"
                  label="Tầm nhìn văn phòng"
                />
              </div>
              <div class="q-mt-md q-ml-lg">
                <q-input
                  style="width: 390px"
                  class="q-mr-lg"
                  filled
                  v-model="vanphong.motaphong"
                  type="textarea"
                  label="Mô tả"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  v-model="editUpdateRo.Status"
                  :options="trangthai"
                  label="Trạng thái"
                />
              </div>
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onUpdateRoom"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- "DANH SÁCH LỊCH SỬ ĐẶT PHÒNG" -->
    <q-page-container v-show="dslichsu">
      <q-page padding>
        <div>
          <!-- table -->
          <div class="q-pa-md">
            <q-table
              title="DANH SÁCH LỊCH SỬ ĐẶT PHÒNG"
              :rows="dataBookHis"
              :columns="columnsBookHis"
              row-key="id"
              selection="single"
              v-model:selected="selectedBookHis"
            />
            <div class="flex justify-end q-mt-md">
              <div class="q-mr-sm">
                <q-btn
                  color="primary"
                  icon="edit"
                  label="Chỉnh sửa"
                  @click="(updateBookHis = true, openDialogBookHisUpdate())"
                />
              </div>
              <div>
                <q-btn
                  color="primary"
                  icon="delete"
                  label="Xóa"
                  @click="deleteBookHis"
                />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- Chỉnh sửa lịch sử đặt phòng -->
    <div class="q-pa-md">
      <q-dialog v-model="updateBookHis" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-ml-lg text-bold">Chỉnh sửa lịch sử đặt phòng</h4>
            </div>
            <div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  disable
                  v-model="editUpdateBookHis.Code"
                  label="Mã đặt phòng"
                />
                <q-input
                  filled
                  style="width:180px"
                  v-model="editUpdateBookHis.Date"
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
                        <q-date v-model="editUpdateBookHis.Date">
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
              <div class="flex q-ml-lg">
                <q-select
                  class="q-mr-lg"
                  filled
                  style="width: 183px"
                  v-model="editUpdateBookHis.Timestart"
                  :options="optionstime"
                  label="Thời gian bắt đầu"
                  selected
                />
                <q-select
                  filled
                  style="width: 183px"
                  v-model="editUpdateBookHis.Timeend"
                  :options="optionstime"
                  label="Thời gian kết thúc"
                />
              </div>
              <div class=" flex q-mt-md q-ml-lg">
                <q-select
                  class="q-mr-lg"
                  filled
                  style="width: 183px"
                  v-model="editUpdateBookHis.Status"
                  :options="optionsStatus"
                  label="Trạng thái"
                />
                <q-select
                  filled
                  style="width: 183px"
                  v-model="editUpdateBookHis.Payment"
                  :options="optionsPayment"
                  label="Hình thức thanh toán"
                />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateBookHis.Username"
                  label="Người dùng"
                />
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateBookHis.Email"
                  label="Email"
                />
              </div>
              <div class="flex q-mt-md q-ml-lg">
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateBookHis.Phone"
                  label="Số điện thoại"
                />
                <q-input
                  class="q-mr-lg"
                  filled
                  v-model="editUpdateBookHis.Note"
                  label="Ghi chú"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  disable
                  v-model="selectCompanies"
                  :options="this.dataCompanies"
                  option-value="id"
                  option-label="Name"
                  label="Địa chỉ đặt"
                />
              </div>
              <div class="q-my-md q-ml-lg">
                <q-select
                  style="width: 390px"
                  filled
                  disable
                  v-model="selectRoom"
                  :options="this.dataRooms"
                  option-value="id"
                  option-label="Name"
                  label="Văn phòng đặt"
                />
              </div>
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onUpdateBookHis"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- "DANH SÁCH CÁC KIỂU VĂN PHÒNG" -->
    <q-page-container v-show="dskieu">
      <q-page padding>
        <div>
          <!-- table -->
          <div class="q-pa-md">
            <q-table
              title="DANH SÁCH CÁC KIỂU VĂN PHÒNG"
              :rows="dataRoomType"
              :columns="columnsRoty"
              row-key="id"
              selection="single"
              v-model:selected="selectedRoTy"
            />
            <div class="flex justify-end q-mt-md">
              <div class="q-mr-sm">
                <q-btn
                  class="q-mr-sm"
                  color="primary"
                  icon="add"
                  label="Thêm"
                  @click="createRoomtype = true"
                />
              </div>
              <div>
                <q-btn
                  color="primary"
                  icon="delete"
                  label="Xóa"
                  @click="deleteRoomType"
                />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- chỉnh sửa các kiểu văn phòng -->
    <div class="q-pa-md">
      <q-dialog v-model="createRoomtype" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-ml-lg text-bold">
                Thông tin kiểu văn phòng
              </h4>
            </div>
            <div class="q-mt-md q-ml-lg">
              <q-input
                style="width: 390px"
                class="q-mr-lg"
                filled
                v-model="roomtype.nameroomtype"
                label="Tên kiểu văn phòng"
              />
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onCreateRoomtype"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- "DANH SÁCH CÁC DỊCH VỤ VĂN PHÒNG" -->
    <q-page-container v-show="dsdichvu">
      <q-page padding>
        <div>
          <!-- table -->
          <div class="q-pa-md">
            <q-table
              title="DANH SÁCH CÁC DỊCH VỤ VĂN PHÒNG"
              :rows="dataRoomService"
              :columns="columnsRoSe"
              row-key="id"
              selection="single"
              v-model:selected="selectedRoSe"
            />
            <div class="flex justify-end q-mt-md">
              <div class="q-mr-sm">
                <q-btn
                  class="q-mr-sm"
                  color="primary"
                  icon="add"
                  label="Thêm"
                  @click="createRoomService = true"
                />
              </div>
              <div>
                <q-btn
                  color="primary"
                  icon="delete"
                  label="Xóa"
                  @click="deleteRoomService"
                />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <!-- Tạo mới thông tin dịch vụ văn phòng -->
    <div class="q-pa-md">
      <q-dialog v-model="createRoomService" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-mx-lg text-bold">
                Thông tin dịch vụ văn phòng
              </h4>
            </div>
            <div class="q-mt-md q-ml-lg">
              <q-input
                style="width: 440px"
                class="q-mr-lg"
                filled
                v-model="roomservice.nameroomservice"
                label="Tên dịch vụ"
              />
              <div class="q-mt-md">
                <q-input
                  style="width: 440px"
                  class="q-mr-lg"
                  filled
                  v-model="roomservice.motaroomservice"
                  type="textarea"
                  label="Mô tả"
                />
              </div>
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onCreateRoomService"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

     <!-- "DANH SÁCH TẦM NHÌN VĂN PHÒNG" -->
    <q-page-container v-show="dsview">
      <q-page padding>
        <div>
          <!-- table -->
          <div class="q-pa-md">
            <q-table
              title="DANH SÁCH CÁC TẦM NHÌN VĂN PHÒNG"
              :rows="dataRoomView"
              :columns="columnsRoVi"
              row-key="id"
              selection="single"
              v-model:selected="selectedRoVi"
            />
            <div class="flex justify-end q-mt-md">
              <div class="q-mr-sm">
                <q-btn
                  class="q-mr-sm"
                  color="primary"
                  icon="add"
                  label="Thêm"
                  @click="createRoomView = true"
                />
              </div>
              <div>
                <q-btn
                  color="primary"
                  icon="delete"
                  label="Xóa"
                  @click="deleteRoomView"
                />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- Tạo mới thông tin tầm nhìn văn phòng -->
    <div class="q-pa-md">
      <q-dialog v-model="createRoomView" persistent>
        <q-card>
          <q-card-section class="">
            <div>
              <h4 class="q-mt-sm q-mx-lg text-bold">
                Thêm tầm nhìn văn phòng
              </h4>
            </div>
            <div class="q-mt-md q-ml-lg">
              <q-input
                style="width: 440px"
                class="q-mr-lg"
                filled
                v-model="roomview.nameview"
                label="Loại tầm nhìn"
              />
            </div>
          </q-card-section>

          <!-- Notice v-close-popup -->
          <q-card-actions align="center">
            <q-btn
              flat
              label="Hủy bỏ"
              color="primary"
              v-close-popup="!cancelEnabled"
            />
            <q-btn
              flat
              label="Xác nhận"
              color="primary"
              @click="onCreateRoomView"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
export default {
  methods: {
    uploadImage (event) {
      const data = new FormData()
      data.append('name', 'my-picture')
      data.append('files', event.target.files[0])
      const config = {
        header: {
          'Content-Type': 'image/png'
        }
      }
      this.$q.notify({
        type: 'negative',
        message: 'Vui lòng chờ trong giây lát'
      })
      api.post('/upload', data, config)
        .then(
          response => {
            if (response.status === 200) {
              this.newimage = response.data[0].id
              this.$q.notify({
                type: 'positive',
                message: 'Upload thành công'
              })
            }
          }
        )
    },
    checkAuth () {
      if (localStorage.auths.toString() === 'User') {
        this.$router.go(-1)
        this.$q.notify({
          type: 'negative',
          message: 'Bạn không có quyền truy cập'
        })
      }
    },
    getPostsCompanies () {
      api.get('/bookings?populate=*&pagination[pageSize]=1000').then((res) => {
        this.postsCo = res.data.data
        for (let index = 0; index < this.postsCo.length; index++) {
          const tempPostCo = {}
          tempPostCo.id = this.postsCo[index].id
          tempPostCo.Name = this.postsCo[index].attributes.Name
          tempPostCo.Code = this.postsCo[index].attributes.Code
          tempPostCo.Address = this.postsCo[index].attributes.Address
          tempPostCo.Phone = this.postsCo[index].attributes.Phone
          tempPostCo.Link_map = this.postsCo[index].attributes.Link_map
          tempPostCo.Room_type_name =
            this.postsCo[index].attributes?.room_type.data?.attributes?.Name
          this.dataCompanies.push(tempPostCo)
        }
      })
    },
    getPostsRooms () {
      api.get('/rooms?populate=*&pagination[pageSize]=1000').then((res) => {
        this.postsRo = res.data.data
        for (let index = 0; index < this.postsRo.length; index++) {
          const tempPostRo = {}
          tempPostRo.id = this.postsRo[index].id
          tempPostRo.Name = this.postsRo[index].attributes.Name
          tempPostRo.Price = this.postsRo[index].attributes.Price
          tempPostRo.Price_VAT = this.postsRo[index].attributes.Price_VAT
          tempPostRo.Code = this.postsRo[index].attributes.Code
          tempPostRo.Type = this.postsRo[index].attributes.Type
          tempPostRo.Size = this.postsRo[index].attributes.Size
          tempPostRo.Status = this.postsRo[index].attributes.Status
          tempPostRo.Location =
            this.postsRo[index].attributes?.company.data?.attributes?.Name
          this.dataRooms.push(tempPostRo)
        }
      })
    },
    getPostsUser () {
      api.get('/users?populate=*&?pagination[pageSize]=1000').then((res) => {
        this.postsUser = res.data
        for (let index = 0; index < this.postsUser.length; index++) {
          const tempPostUser = {}
          tempPostUser.id = this.postsUser[index].id
          tempPostUser.username = this.postsUser[index].username
          tempPostUser.email = this.postsUser[index].email
          tempPostUser.Full_name = this.postsUser[index].Full_name
          tempPostUser.Dob = this.postsUser[index].Dob
          tempPostUser.Address = this.postsUser[index].Address
          tempPostUser.auths = this.postsUser[index].auths
          tempPostUser.Phone_number = this.postsUser[index].Phone_number
          this.dataUsers.push(tempPostUser)
        }
      })
    },
    getPostsRoty () {
      api.get('/room-types?populate=*&pagination[pageSize]=1000').then((res) => {
        this.postsRoty = res.data.data
        for (let index = 0; index < this.postsRoty.length; index++) {
          const tempPostRoty = {}
          tempPostRoty.id = this.postsRoty[index].id
          tempPostRoty.Name = this.postsRoty[index].attributes.Name
          this.dataRoomType.push(tempPostRoty)
        }
      })
    },
    getPostsRoSe () {
      api.get('/services-rooms?pagination[pageSize]=1000').then((res) => {
        this.postsRoSe = res.data.data
        for (let index = 0; index < this.postsRoSe.length; index++) {
          const tempPostRoSe = {}
          tempPostRoSe.id = this.postsRoSe[index].id
          tempPostRoSe.Name = this.postsRoSe[index].attributes.Name
          this.dataRoomService.push(tempPostRoSe)
        }
      })
    },
    getPostsBookHis () {
      api.get('/booking-histories?pagination[pageSize]=1000').then((res) => {
        this.postsBookHis = res.data.data
        for (let index = 0; index < this.postsBookHis.length; index++) {
          const tempPostBookHis = {}
          tempPostBookHis.id = this.postsBookHis[index].id
          tempPostBookHis.Code = this.postsBookHis[index].attributes.Code
          tempPostBookHis.Date = this.postsBookHis[index].attributes.Date
          tempPostBookHis.Start_time =
            this.postsBookHis[index].attributes.Start_time
          tempPostBookHis.End_time =
            this.postsBookHis[index].attributes.End_time
          tempPostBookHis.Price = this.postsBookHis[index].attributes.Price
          tempPostBookHis.Price_VAT =
            this.postsBookHis[index].attributes.Price_VAT
          tempPostBookHis.Total_price =
            this.postsBookHis[index].attributes.Total_price
          tempPostBookHis.Status = this.postsBookHis[index].attributes.Status
          tempPostBookHis.User_name =
            this.postsBookHis[index].attributes.User_name
          tempPostBookHis.Email = this.postsBookHis[index].attributes.Email
          tempPostBookHis.Address = this.postsBookHis[index].attributes.Address
          tempPostBookHis.Note = this.postsBookHis[index].attributes.Note
          tempPostBookHis.Phone_number =
            this.postsBookHis[index].attributes.Phone_number
          tempPostBookHis.Room = this.postsBookHis[index].attributes.Room
          tempPostBookHis.Total_time =
            this.postsBookHis[index].attributes.Total_time
          tempPostBookHis.Method_of_payment =
            this.postsBookHis[index].attributes.Method_of_payment
          this.dataBookHis.push(tempPostBookHis)
        }
      })
    },
    getPostsRoVi () {
      api.get('/views-rooms?pagination[pageSize]=1000').then((res) => {
        this.postsRoVi = res.data.data
        for (let index = 0; index < this.postsRoVi.length; index++) {
          const tempPostRoVi = {}
          tempPostRoVi.id = this.postsRoVi[index].id
          tempPostRoVi.Name = this.postsRoVi[index].attributes.Name
          this.dataRoomView.push(tempPostRoVi)
        }
      })
    },

    // Tạo mới công ty
    onCreateCompany () {
      for (let index = 0; index < this.selectRoomService.length; index++) {
        this.selectRoomServiceIDs.push(this.selectRoomService[index].id)
      }
      if (this.congty.tencongty !== '' && this.congty.macongty !== '' && this.congty.diachicty !== '' && this.congty.sdtcty !== '' && this.congty.linkmap !== '' && this.congty.motacty !== '' && this.selectRoomType?.id.toString() !== '' && this.selectRoomServiceIDs !== '') {
        api.post('/bookings', {
          data: {
            Name: this.congty.tencongty,
            Code: this.congty.macongty,
            Address: this.congty.diachicty,
            Phone: this.congty.sdtcty,
            Link_map: this.congty.linkmap,
            Decripstion: this.congty.motacty,
            room_type: this.selectRoomType?.id.toString(),
            services_rooms: this.selectRoomServiceIDs,
            Image: this.newimage.toString()
          }
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Tạo thành công'
            })
            api.get('/bookings?populate=*&pagination[pageSize]=1000').then((res) => {
              this.postsCo = res.data.data
              this.dataCompanies = []
              for (let index = 0; index < this.postsCo.length; index++) {
                const tempPostCo = {}
                tempPostCo.id = this.postsCo[index].id
                tempPostCo.Name = this.postsCo[index].attributes.Name
                tempPostCo.Code = this.postsCo[index].attributes.Code
                tempPostCo.Address = this.postsCo[index].attributes.Address
                tempPostCo.Phone = this.postsCo[index].attributes.Phone
                tempPostCo.Link_map = this.postsCo[index].attributes.Link_map
                tempPostCo.Room_type_name =
                  this.postsCo[index].attributes?.room_type.data?.attributes?.Name
                this.dataCompanies.push(tempPostCo)
              }
            })
            this.createCompany = false
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Vui lòng nhập liệu đầy đủ'
        })
      }
    },

    openDialogCompanyUpdate () {
      this.editUpdateCo.Name = this.selectedCo[0].Name
      this.editUpdateCo.Code = this.selectedCo[0].Code
      this.editUpdateCo.Address = this.selectedCo[0].Address
      this.editUpdateCo.Phone = this.selectedCo[0].Phone
      this.editUpdateCo.Link_map = this.selectedCo[0].Link_map
    },
    // Chỉnh sửa công ty
    onUpdateCompany () {
      for (let index = 0; index < this.selectRoomService.length; index++) {
        this.selectRoomServiceIDs.push(this.selectRoomService[index].id)
      }
      if (this.editUpdateCo.Name !== '' && this.editUpdateCo.Code !== '' && this.editUpdateCo.Address !== '' && this.editUpdateCo.Phone !== '' && this.editUpdateCo.Link_map !== '' && this.congty.motacty !== '' && this.selectRoomType?.id !== '' && this.selectRoomServiceIDs !== '') {
        api.put(`/bookings/${this.selectedCo[0]?.id}`, {
          data: {
            Name: this.editUpdateCo.Name,
            Code: this.editUpdateCo.Code,
            Address: this.editUpdateCo.Address,
            Phone: this.editUpdateCo.Phone,
            Link_map: this.editUpdateCo.Link_map,
            Decripstion: this.congty.motacty,
            room_type: this.selectRoomType?.id,
            services_rooms: this.selectRoomServiceIDs,
            Image: this.newimage.toString()
          }
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Cập nhật thành công'
            })
            this.updateCompany = false
            this.selectedCo[0].Name = this.editUpdateCo.Name
            this.selectedCo[0].Code = this.editUpdateCo.Code
            this.selectedCo[0].Address = this.editUpdateCo.Address
            this.selectedCo[0].Phone = this.editUpdateCo.Phone
            this.selectedCo[0].Link_map = this.editUpdateCo.Link_map
            this.dataCompanies.splice(1, 6, this.selectedCo[0].Name, this.selectedCo[0].Code, this.selectedCo[0].Address, this.selectedCo[0].Phone, this.selectedCo[0].Link_map, this.selectRoomType[0])
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Vui lòng nhập liệu đầy đủ'
        })
      }
    },
    // Xóa công ty
    deleteCompany () {
      api.delete(`/bookings/${this.selectedCo[0]?.id}`, {
      }).then((response) => {
        if (response.status === 200) {
          this.$q.notify({
            type: 'positive',
            message: 'Xóa thành công'
          })
          api.get('/bookings?populate=*&pagination[pageSize]=1000').then((res) => {
            this.postsCo = res.data.data
            this.dataCompanies = []
            for (let index = 0; index < this.postsCo.length; index++) {
              const tempPostCo = {}
              tempPostCo.id = this.postsCo[index].id
              tempPostCo.Name = this.postsCo[index].attributes.Name
              tempPostCo.Code = this.postsCo[index].attributes.Code
              tempPostCo.Address = this.postsCo[index].attributes.Address
              tempPostCo.Phone = this.postsCo[index].attributes.Phone
              tempPostCo.Link_map = this.postsCo[index].attributes.Link_map
              tempPostCo.Room_type_name =
                this.postsCo[index].attributes?.room_type.data?.attributes?.Name
              this.dataCompanies.push(tempPostCo)
            }
          })
        }
      })
    },

    // Tạo mới thông tin văn phòng
    onCreateRoom () {
      for (let index = 0; index < this.selectRoomService.length; index++) {
        this.selectRoomServiceIDs.push(this.selectRoomService[index].id)
      }
      for (let index = 0; index < this.selectRoomView.length; index++) {
        this.selectRoomViewIDs.push(this.selectRoomView[index].id)
      }
      if (this.vanphong.tenphong !== '' && this.vanphong.giaphong !== '' && this.vanphong.giaVAT !== '' && this.vanphong.codephong !== '' && this.vanphong.sizephong !== '' && this.vanphong.motaphong !== '' && this.vanphong.kieuphong !== '' && this.vanphong.trangthai !== '' && this.selectCompanies?.id.toString() !== '' && this.selectRoomServiceIDs !== '' && this.selectRoomViewIDs !== '') {
        api.post('/rooms', {
          data: {
            Name: this.vanphong.tenphong,
            Price: Number(this.vanphong.giaphong),
            Price_VAT: Number(this.vanphong.giaVAT),
            Code: this.vanphong.codephong,
            Size: this.vanphong.sizephong,
            Description: this.vanphong.motaphong,
            Type: this.vanphong.kieuphong,
            Status: this.vanphong.trangthai,
            location: this.selectCompanies?.id.toString(),
            services_rooms: this.selectRoomServiceIDs,
            views_rooms: this.selectRoomViewIDs,
            Images: this.newimage
          }
        })
          .then((response) => {
            if (response.status === 200) {
              this.$q.notify({
                type: 'positive',
                message: 'Tạo thành công'
              })
              api.get('/rooms?populate=*&pagination[pageSize]=1000').then((res) => {
                this.postsRo = res.data.data
                this.dataRooms = []
                for (let index = 0; index < this.postsRo.length; index++) {
                  const tempPostRo = {}
                  tempPostRo.id = this.postsRo[index].id
                  tempPostRo.Name = this.postsRo[index].attributes.Name
                  tempPostRo.Price = this.postsRo[index].attributes.Price
                  tempPostRo.Price_VAT = this.postsRo[index].attributes.Price_VAT
                  tempPostRo.Code = this.postsRo[index].attributes.Code
                  tempPostRo.Type = this.postsRo[index].attributes.Type
                  tempPostRo.Size = this.postsRo[index].attributes.Size
                  tempPostRo.Status = this.postsRo[index].attributes.Status
                  tempPostRo.Location =
                    this.postsRo[index].attributes?.location.data?.attributes?.Name
                  this.dataRooms.push(tempPostRo)
                }
              })
              this.createRooms = false
            }
          })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Vui lòng nhập liệu đầy đủ'
        })
      }
    },

    openDialogRoomUpdate () {
      this.editUpdateRo.Name = this.selectedRo[0].Name
      this.editUpdateRo.Price = this.selectedRo[0].Price
      this.editUpdateRo.Code = this.selectedRo[0].Code
      this.editUpdateRo.Price_VAT = this.selectedRo[0].Price_VAT
      this.editUpdateRo.Size = this.selectedRo[0].Size
      this.editUpdateRo.Type = this.selectedRo[0].Type
      this.editUpdateRo.Status = this.selectedRo[0].Status
    },
    // Chỉnh sửa văn phòng
    onUpdateRoom () {
      for (let index = 0; index < this.selectRoomService.length; index++) {
        this.selectRoomServiceIDs.push(this.selectRoomService[index].id)
      }
      for (let index = 0; index < this.selectRoomView.length; index++) {
        this.selectRoomViewIDs.push(this.selectRoomView[index].id)
      }
      if (this.editUpdateRo.Name !== '' && this.editUpdateRo.Price !== '' && this.editUpdateRo.Price_VAT !== '' && this.editUpdateRo.Code !== '' && this.editUpdateRo.Size !== '' && this.vanphong.motaphong !== '' && this.editUpdateRo.Type !== '' && this.editUpdateRo.Status !== '' && this.selectCompanies?.id.toString() !== '' && this.selectRoomServiceIDs !== '' && this.selectRoomViewIDs !== '') {
        api.put(`/rooms/${this.selectedRo[0]?.id}`, {
          data: {
            Name: this.editUpdateRo.Name,
            Price: Number(this.editUpdateRo.Price),
            Price_VAT: Number(this.editUpdateRo.Price_VAT),
            Code: this.editUpdateRo.Code,
            Size: this.editUpdateRo.Size,
            Description: this.vanphong.motaphong,
            Type: this.editUpdateRo.Type,
            Status: this.editUpdateRo.Status,
            location: this.selectCompanies?.id.toString(),
            services_rooms: this.selectRoomServiceIDs,
            views_rooms: this.selectRoomViewIDs,
            Images: this.newimage.toString()
          }
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Cập nhật thành công'
            })
            this.updateRoom = false
            this.selectedRo[0].Name = this.editUpdateRo.Name
            this.selectedRo[0].Price = this.editUpdateRo.Price
            this.selectedRo[0].Code = this.editUpdateRo.Code
            this.selectedRo[0].Price_VAT = this.editUpdateRo.Price_VAT
            this.selectedRo[0].Size = this.editUpdateRo.Size
            this.selectedRo[0].Type = this.editUpdateRo.Type
            this.selectedRo[0].Status = this.editUpdateRo.Status
            this.dataCompanies.splice(1, 8, this.selectedRo[0].Name, this.selectedRo[0].Price, this.selectedRo[0].Price_VAT, this.selectedRo[0].Code, this.selectedRo[0].Type, this.selectedRo[0].Size)
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Vui lòng nhập liệu đầy đủ'
        })
      }
    },
    // Xóa văn phòng
    deleteRoom () {
      api.delete(`/rooms/${this.selectedRo[0]?.id}`, {
      }).then((response) => {
        if (response.status === 200) {
          this.$q.notify({
            type: 'positive',
            message: 'Xóa thành công'
          })
          this.dataRooms.splice(Number(this.selectedRo[0]?.id) - 1, 1)
          const tempDataRooms = []
          for (let index = 0; index < this.dataRooms.length; index++) {
            if (this.dataRooms[index].id !== this.selectedRo[0]?.id) {
              tempDataRooms.push(this.dataRooms[index])
            }
          }
          this.dataRooms = tempDataRooms
        }
      })
    },

    // Tạo mới người dùng
    onCreateUser () {
      if (this.nguoidung.username !== '' && this.nguoidung.emailnguoidung !== '' && this.nguoidung.passnguoidung !== '' && this.nguoidung.auths !== '') {
        api.post('/auth/local/register', {
          username: this.nguoidung.username,
          email: this.nguoidung.emailnguoidung,
          password: this.nguoidung.passnguoidung,
          Full_name: this.nguoidung.tennguoidung,
          Dob: this.nguoidung.dobnguoidung,
          Address: this.nguoidung.diachinguoidung,
          auths: this.nguoidung.auths,
          Phone_number: this.nguoidung.sdtnguoidung
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Tạo thành công'
            })
            api.get('/users?populate=*&?pagination[pageSize]=1000').then((res) => {
              this.postsUser = res.data
              this.dataUsers = []
              for (let index = 0; index < this.postsUser.length; index++) {
                const tempPostUser = {}
                tempPostUser.id = this.postsUser[index].id
                tempPostUser.username = this.postsUser[index].username
                tempPostUser.email = this.postsUser[index].email
                tempPostUser.Full_name = this.postsUser[index].Full_name
                tempPostUser.Dob = this.postsUser[index].Dob
                tempPostUser.Address = this.postsUser[index].Address
                tempPostUser.auths = this.postsUser[index].auths
                tempPostUser.Phone_number = this.postsUser[index].Phone_number
                this.dataUsers.push(tempPostUser)
              }
            })
            this.createUser = false
          } else {
            this.$q.notify({
              type: 'negative',
              message: 'Tên tài khoản hoặc email bị trùng'
            })
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Vui lòng nhập đủ thông tin'
        })
      }
    },
    openDialogUserUpdate () {
      this.editnguoidung.username = this.selectedUser[0].username
      this.editnguoidung.emailnguoidung = this.selectedUser[0].email
      this.editnguoidung.tennguoidung = this.selectedUser[0].Full_name
      this.editnguoidung.dobnguoidung = this.selectedUser[0].Dob
      this.editnguoidung.diachinguoidung = this.selectedUser[0].Address
      this.editnguoidung.auths = this.selectedUser[0].auths
      this.editnguoidung.sdtnguoidung = this.selectedUser[0].Phone_number
    },
    // Chỉnh sửa người dùng
    onUpdateUser () {
      if (this.editnguoidung.passnguoidung !== '') {
        api.put(`/users/${this.selectedUser[0]?.id}`, {
          username: this.editnguoidung.username,
          email: this.editnguoidung.emailnguoidung,
          password: this.editnguoidung.passnguoidung,
          Full_name: this.editnguoidung.tennguoidung,
          Dob: this.editnguoidung.dobnguoidung,
          Address: this.editnguoidung.diachinguoidung,
          auths: this.editnguoidung.auths,
          Phone_number: this.editnguoidung.sdtnguoidung
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Cập nhật thành công'
            })
            this.editUser = false
            api.get('/users?populate=*&?pagination[pageSize]=1000').then((res) => {
              this.postsUser = res.data
              this.dataUsers = []
              for (let index = 0; index < this.postsUser.length; index++) {
                const tempPostUser = {}
                tempPostUser.id = this.postsUser[index].id
                tempPostUser.username = this.postsUser[index].username
                tempPostUser.email = this.postsUser[index].email
                tempPostUser.Full_name = this.postsUser[index].Full_name
                tempPostUser.Dob = this.postsUser[index].Dob
                tempPostUser.Address = this.postsUser[index].Address
                tempPostUser.auths = this.postsUser[index].auths
                tempPostUser.Phone_number = this.postsUser[index].Phone_number
                this.dataUsers.push(tempPostUser)
              }
            })
          }
        })
      } else {
        api.put(`/users/${this.selectedUser[0]?.id}`, {
          username: this.editnguoidung.username,
          email: this.editnguoidung.emailnguoidung,
          Full_name: this.editnguoidung.tennguoidung,
          Dob: this.editnguoidung.dobnguoidung,
          Address: this.editnguoidung.diachinguoidung,
          auths: this.editnguoidung.auths,
          Phone_number: this.editnguoidung.sdtnguoidung
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Cập nhật thành công'
            })
            this.editUser = false
            api.get('/users?populate=*&?pagination[pageSize]=1000').then((res) => {
              this.postsUser = res.data
              this.dataUsers = []
              for (let index = 0; index < this.postsUser.length; index++) {
                const tempPostUser = {}
                tempPostUser.id = this.postsUser[index].id
                tempPostUser.username = this.postsUser[index].username
                tempPostUser.email = this.postsUser[index].email
                tempPostUser.Full_name = this.postsUser[index].Full_name
                tempPostUser.Dob = this.postsUser[index].Dob
                tempPostUser.Address = this.postsUser[index].Address
                tempPostUser.auths = this.postsUser[index].auths
                tempPostUser.Phone_number = this.postsUser[index].Phone_number
                this.dataUsers.push(tempPostUser)
              }
            })
          }
        })
      }
    },
    // Xóa người dùng
    deleteUser () {
      api.delete(`/users/${this.selectedUser[0]?.id}`, {
      }).then((response) => {
        if (response.status === 200) {
          this.$q.notify({
            type: 'positive',
            message: 'Xóa thành công'
          })
          this.dataUsers.splice(Number(this.selectedUser[0]?.id) - 1, 1)
          const tempDataUser = []
          for (let index = 0; index < this.dataUsers.length; index++) {
            if (this.dataUsers[index].id !== this.selectedUser[0]?.id) {
              tempDataUser.push(this.dataUsers[index])
            }
          }
          this.dataUsers = tempDataUser
        }
      })
    },
    // Tạo mới các kiểu văn phòng
    onCreateRoomtype () {
      if (this.roomtype.nameroomtype !== '') {
        api.post('/room-types', {
          data: {
            Name: this.roomtype.nameroomtype
          }
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Tạo thành công'
            })
            api.get('/room-types?pagination[pageSize]=1000').then((res) => {
              this.postsRoty = res.data.data
              this.dataRoomType = []
              for (let index = 0; index < this.postsRoty.length; index++) {
                const tempPostRoty = {}
                tempPostRoty.id = this.postsRoty[index].id
                tempPostRoty.Name = this.postsRoty[index].attributes.Name
                this.dataRoomType.push(tempPostRoty)
              }
            })
            this.createRoomtype = false
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Vui lòng nhập liệu đầy đủ'
        })
      }
    },
    // Xóa các kiểu văn phòng
    deleteRoomType () {
      api.delete(`/room-types/${this.selectedRoTy[0]?.id}`, {
      }).then((response) => {
        if (response.status === 200) {
          this.$q.notify({
            type: 'positive',
            message: 'Xóa thành công'
          })
          this.dataRoomType.splice(Number(this.selectedRoTy[0]?.id) - 1, 1)
          const tempDataRoomType = []
          for (let index = 0; index < this.dataRoomType.length; index++) {
            if (this.dataRoomType[index].id !== this.selectedRoTy[0]?.id) {
              tempDataRoomType.push(this.dataRoomType[index])
            }
          }
          this.dataRoomType = tempDataRoomType
        }
      })
    },

    // Tạo mới dịch vụ văn phòng
    onCreateRoomService () {
      if (this.roomservice.nameroomservice !== '' && this.roomservice.motaroomservice !== '') {
        api.post('/services-rooms', {
          data: {
            Name: this.roomservice.nameroomservice,
            Description: this.roomservice.motaroomservice
          }
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Tạo thành công'
            })
            api.get('/services-rooms?pagination[pageSize]=1000').then((res) => {
              this.postsRoSe = res.data.data
              this.dataRoomService = []
              for (let index = 0; index < this.postsRoSe.length; index++) {
                const tempPostRoSe = {}
                tempPostRoSe.id = this.postsRoSe[index].id
                tempPostRoSe.Name = this.postsRoSe[index].attributes.Name
                this.dataRoomService.push(tempPostRoSe)
              }
            })
            this.createRoomService = false
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Vui lòng nhập liệu'
        })
      }
    },
    // Xóa dịch vụ văn phòng
    deleteRoomService () {
      api.delete(`/services-rooms/${this.selectedRoSe[0]?.id}`, {
      }).then((response) => {
        if (response.status === 200) {
          this.$q.notify({
            type: 'positive',
            message: 'Xóa thành công'
          })
          this.dataRoomService.splice(Number(this.selectedRoSe[0]?.id) - 1, 1)
          const tempDataRoomService = []
          for (let index = 0; index < this.dataRoomService.length; index++) {
            if (this.dataRoomService[index].id !== this.selectedRoSe[0]?.id) {
              tempDataRoomService.push(this.dataRoomService[index])
            }
          }
          this.dataRoomService = tempDataRoomService
        }
      })
    },

    // Tạo mới tầm nhìn văn phòng
    onCreateRoomView () {
      if (this.roomview.nameview !== '') {
        api.post('/views-rooms', {
          data: {
            Name: this.roomview.nameview
          }
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Tạo thành công'
            })
            api.get('/views-rooms?pagination[pageSize]=1000').then((res) => {
              this.postsRoVi = res.data.data
              this.dataRoomView = []
              for (let index = 0; index < this.postsRoVi.length; index++) {
                const tempPostRoVi = {}
                tempPostRoVi.id = this.postsRoVi[index].id
                tempPostRoVi.Name = this.postsRoVi[index].attributes.Name
                this.dataRoomView.push(tempPostRoVi)
              }
            })
            this.createRoomView = false
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Vui lòng nhập liệu đầy đủ'
        })
      }
    },
    // Xóa tầm nhìn văn phòng
    deleteRoomView () {
      api.delete(`/views-rooms/${this.selectedRoVi[0]?.id}`, {
      }).then((response) => {
        if (response.status === 200) {
          this.$q.notify({
            type: 'positive',
            message: 'Xóa thành công'
          })
          api.get('/views-rooms?pagination[pageSize]=1000').then((res) => {
            this.postsRoVi = res.data.data
            this.dataRoomView = []
            for (let index = 0; index < this.postsRoVi.length; index++) {
              const tempPostRoVi = {}
              tempPostRoVi.id = this.postsRoVi[index].id
              tempPostRoVi.Name = this.postsRoVi[index].attributes.Name
              this.dataRoomView.push(tempPostRoVi)
            }
          })
        }
      })
    },
    // Chỉnh sửa lịch sử đặt phòng
    openDialogBookHisUpdate () {
      this.editUpdateBookHis.Code = this.selectedBookHis[0]?.Code
      this.editUpdateBookHis.Timestart = this.selectedBookHis[0].Start_time
      this.editUpdateBookHis.Timeend = this.selectedBookHis[0].End_time
      this.editUpdateBookHis.Status = this.selectedBookHis[0].Status
      this.editUpdateBookHis.Payment = this.selectedBookHis[0].Method_of_payment
      this.editUpdateBookHis.Username = this.selectedBookHis[0].User_name
      this.editUpdateBookHis.Email = this.selectedBookHis[0].Email
      this.editUpdateBookHis.Phone = this.selectedBookHis[0].Phone_number
      this.editUpdateBookHis.Note = this.selectedBookHis[0].Note
    },
    onUpdateBookHis () {
      const day = this.editUpdateBookHis.Date.split('/')[2]
      const month = this.editUpdateBookHis.Date.split('/')[1]
      const year = this.editUpdateBookHis.Date.split('/')[0]
      this.dateClone = `${day}/${month}/${year}`
      if (this.editUpdateBookHis.Timestart < this.editUpdateBookHis.Timeend && this.dateClone !== '' && this.editUpdateBookHis.Status !== '' && this.editUpdateBookHis.Username !== '' && this.editUpdateBookHis.Note !== '' && this.editUpdateBookHis.Email !== '' && this.editUpdateBookHis.Phone !== '' && this.editUpdateBookHis.Payment !== '') {
        api.put(`/booking-histories/${this.selectedBookHis[0]?.id}`, {
          data: {
            Date: this.dateClone,
            Start_time: this.editUpdateBookHis.Timestart,
            End_time: this.editUpdateBookHis.Timeend,
            Status: this.editUpdateBookHis.Status,
            Username: this.editUpdateBookHis.Username,
            Note: this.editUpdateBookHis.Note,
            Email: this.editUpdateBookHis.Email,
            Phone: this.editUpdateBookHis.Phone,
            Method_of_payment: this.editUpdateBookHis.Payment
          }
        }).then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Cập nhật thành công'
            })
            this.updateBookHis = false
            this.selectedBookHis[0].Date = this.dateClone
            this.selectedBookHis[0].Code = this.editUpdateBookHis.Code
            this.selectedBookHis[0].Start_time = this.editUpdateBookHis.Timestart
            this.selectedBookHis[0].End_time = this.editUpdateBookHis.Timeend
            this.selectedBookHis[0].Status = this.editUpdateBookHis.Status
            this.selectedBookHis[0].Method_of_payment = this.editUpdateBookHis.Payment
            this.selectedBookHis[0].User_name = this.editUpdateBookHis.Username
            this.selectedBookHis[0].Email = this.editUpdateBookHis.Email
            this.selectedBookHis[0].Phone_number = this.editUpdateBookHis.Phone
            this.selectedBookHis[0].Note = this.editUpdateBookHis.Note
            this.dataCompanies.splice(1, 9, this.selectedBookHis[0].Date
              , this.selectedBookHis[0].Start_time
              , this.selectedBookHis[0].End_time, this.selectedBookHis[0].Status, this.selectedBookHis[0].Method_of_payment
              , this.selectedBookHis[0].User_name, this.selectedBookHis[0].Email, this.selectedBookHis[0].Phone_number
              , this.selectedBookHis[0].Note)
          }
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Nhập liệu sai. Vui lòng kiểm tra lại dữ liệu'
        })
      }
    },
    // Xóa lịch sử đặt phòng
    deleteBookHis () {
      api.delete(`/booking-histories/${this.selectedBookHis[0]?.id}`, {
      }).then((response) => {
        if (response.status === 200) {
          this.$q.notify({
            type: 'positive',
            message: 'Xóa thành công'
          })
          this.dataBookHis.splice(Number(this.selectedBookHis[0]?.id) - 1, 1)
          const tempDataBookHis = []
          for (let index = 0; index < this.dataBookHis.length; index++) {
            if (this.dataBookHis[index].id !== this.selectedBookHis[0]?.id) {
              tempDataBookHis.push(this.dataBookHis[index])
            }
          }
          this.dataBookHis = tempDataBookHis
        }
      })
    }
  },
  mounted () {
    this.checkAuth()
    this.getPostsRoVi()
    this.getPostsCompanies()
    this.getPostsRooms()
    this.getPostsRoty()
    this.getPostsBookHis()
    this.getPostsUser()
    this.getPostsRoSe()
  },
  data () {
    return {
      // xử lý dữ liệu công ty
      dscongty: ref(true),
      createCompany: ref(false),
      updateCompany: ref(false),
      postsCo: [],
      dataCompanies: [],
      columnsCompanies: [
        {
          name: 'id',
          align: 'right',
          label: 'Id',
          field: 'id',
          sortable: true
        },
        {
          name: 'name',
          align: 'center',
          label: 'Tên công ty',
          field: 'Name',
          sortable: true
        },
        {
          name: 'code',
          align: 'center',
          label: 'Mã công ty',
          field: 'Code',
          sortable: true
        },
        {
          name: 'address',
          label: 'Địa chỉ công ty',
          field: 'Address',
          align: 'center'
        },
        { name: 'phone', label: 'Số điện thoại', field: 'Phone', align: 'center' },
        {
          name: 'link_map',
          label: 'Địa chỉ đường dẫn',
          field: 'Link_map',
          align: 'center'
        },
        {
          name: 'room_type_name',
          label: 'Kiểu công ty',
          field: 'Room_type_name',
          align: 'center'
        }
      ],
      congty: {
        tencongty: '',
        macongty: '',
        diachicty: '',
        sdtcty: '',
        linkmap: '',
        motacty: '',
        uploadimg: ''
      },
      editUpdateCo: {
        Name: null,
        Code: null,
        Address: null,
        Phone: null,
        Link_map: null,
        Decripstion: null
      },
      selectCompanies: '',
      selectedCo: [],

      // xử lý dữ liệu người dùng
      selectedUser: [],
      dsnguoidung: ref(false),
      editUser: ref(false),
      createUser: ref(false),
      optionsAuths: ['User', 'Admin'],
      postsUser: [],
      dataUsers: [],
      columnsUsers: [
        {
          name: 'id',
          align: 'right',
          label: 'Id',
          field: 'id',
          sortable: true
        },
        { name: 'username', label: 'Tên người dùng', field: 'username', align: 'center' },
        { name: 'email', label: 'Email', field: 'email', align: 'center' },
        {
          name: 'full_name',
          label: 'Tên đầy đủ',
          field: 'Full_name',
          align: 'center'
        },
        { name: 'dob', label: 'Ngày sinh', field: 'Dob', align: 'center' },
        { name: 'phone_number', label: 'Số điện thoại', field: 'Phone_number', align: 'center' },
        {
          name: 'address',
          label: 'Địa chỉ',
          field: 'Address',
          align: 'center'
        },
        { name: 'auths', label: 'Quyền', field: 'auths', align: 'center' }
      ],
      nguoidung: {
        auths: '',
        username: '',
        emailnguoidung: '',
        passnguoidung: '',
        tennguoidung: '',
        dobnguoidung: '',
        diachinguoidung: '',
        sdtnguoidung: ''
      },
      editnguoidung: {
        auths: '',
        username: '',
        emailnguoidung: '',
        passnguoidung: '',
        tennguoidung: '',
        dobnguoidung: '',
        diachinguoidung: '',
        sdtnguoidung: ''
      },

      // xử lý dữ liệu văn phòng
      dsvanphong: ref(false),
      selectRoom: [],
      updateRoom: ref(false),
      createRooms: ref(false),
      postsRo: [],
      dataRooms: [],
      columnsRooms: [
        {
          name: 'id',
          align: 'right',
          label: 'Id',
          field: 'id',
          sortable: true
        },
        {
          name: 'name',
          align: 'center',
          label: 'Tên phòng',
          field: 'Name',
          sortable: true
        },
        {
          name: 'price',
          align: 'center',
          label: 'Giá',
          field: 'Price',
          sortable: true
        },
        {
          name: 'price_vat',
          label: 'Giá VAT',
          field: 'Price_VAT',
          align: 'center'
        },
        { name: 'code', label: 'Mã phòng', field: 'Code', align: 'center' },
        { name: 'type', label: 'Kiểu phòng', field: 'Type', align: 'center' },
        { name: 'size', label: 'Kích thước', field: 'Size', align: 'center' },
        { name: 'status', label: 'Trạng thái', field: 'Status', align: 'center' },
        {
          name: 'location',
          label: 'Địa điểm',
          field: 'Location',
          align: 'center'
        }
      ],
      vanphong: {
        tenphong: '',
        giaphong: '',
        giaVAT: '',
        codephong: '',
        sizephong: '',
        motaphong: '',
        kieuphong: '',
        trangthai: ''
      },
      editUpdateRo: {
        Name: null,
        Price: null,
        Price_VAT: null,
        Code: null,
        Type: null,
        Size: null,
        Status: null
      },
      selectedRo: [],

      // Xử lý dữ liệu các kiểu văn phòng
      dskieu: ref(false),
      createRoomtype: ref(false),
      postsRoty: [],
      dataRoomType: [],
      columnsRoty: [
        {
          name: 'id',
          align: 'right',
          label: 'Id',
          field: 'id',
          sortable: true
        },
        {
          name: 'name',
          align: 'center',
          label: 'Kiểu văn phòng',
          field: 'Name',
          sortable: true
        }
      ],
      roomtype: {
        nameroomtype: ''
      },
      selectRoomType: [],
      selectedRoTy: [],

      // Xử lý dữ liệu lịch sử đặt phòng
      dslichsu: ref(false),
      updateBookHis: ref(false),
      postsBookHis: [],
      dataBookHis: [],
      selectedBookHis: [],
      columnsBookHis: [
        {
          name: 'id',
          align: 'center',
          label: 'Id',
          field: 'id',
          sortable: true
        },
        {
          name: 'code',
          align: 'center',
          label: 'Mã đặt phòng',
          field: 'Code',
          sortable: true
        },
        {
          name: 'date',
          align: 'center',
          label: 'Ngày đặt',
          field: 'Date',
          sortable: true
        },
        {
          name: 'start_time',
          label: 'Thời gian bắt đầu',
          field: 'Start_time',
          align: 'center'
        },
        {
          name: 'end_time',
          label: 'Thời gian kết thúc',
          field: 'End_time',
          align: 'center'
        },
        { name: 'price', label: 'Giá', field: 'Price', align: 'center' },
        {
          name: 'price_vat',
          label: 'Giá VAT',
          field: 'Price_VAT',
          align: 'center'
        },
        {
          name: 'total_price',
          label: 'Tổng giá',
          field: 'Total_price',
          align: 'center'
        },
        { name: 'status', label: 'Trạng thái', field: 'Status', align: 'center' },
        {
          name: 'user_name',
          label: 'Tên người dùng',
          field: 'User_name',
          align: 'center'
        },
        { name: 'email', label: 'Email', field: 'Email', align: 'center' },
        {
          name: 'address',
          label: 'Địa điểm',
          field: 'Address',
          align: 'center'
        },
        {
          name: 'phone_number',
          label: 'Số điện thoại',
          field: 'Phone_number',
          align: 'center'
        },
        { name: 'note', label: 'Ghi chú', field: 'Note', align: 'center' },
        { name: 'room', label: 'Phòng', field: 'Room', align: 'center' },
        {
          name: 'total_time',
          label: 'Tổng thời gian',
          field: 'Total_time',
          align: 'center'
        },
        {
          name: 'method_of_payment',
          label: 'Hình thức thanh toán',
          field: 'Method_of_payment',
          align: 'center'
        }
      ],
      editUpdateBookHis: {
        Code: null,
        Date: null,
        Timestart: null,
        Timeend: null,
        Status: null,
        Payment: null,
        Username: null,
        Email: null,
        Phone: null,
        Note: null
      },

      // Xử lý dữ liệu dịch vụ văn phòng
      dsdichvu: ref(false),
      createRoomService: ref(false),
      dataRoomService: [],
      columnsRoSe: [
        {
          name: 'id',
          align: 'right',
          label: 'Id',
          field: 'id',
          sortable: true
        },
        {
          name: 'name',
          align: 'center',
          label: 'Dịch vụ',
          field: 'Name',
          sortable: true
        }
      ],
      kieuphong: ['Phòng họp', 'Phòng hội nghị', 'Sảnh sự kiện'],
      trangthai: ['Còn phòng', 'Hết phòng'],
      roomservice: {
        nameroomservice: '',
        motaroomservice: ''
      },
      selectRoomService: [],
      selectRoomServiceIDs: [],
      selectedRoSe: [],

      // Xử lý dữ liệu view
      dsview: ref(false),
      createRoomView: ref(false),
      dataRoomView: [],
      roomview: {
        nameview: ''
      },
      selectedRoVi: [],
      selectRoomView: [],
      selectRoomViewIDs: [],
      columnsRoVi: [
        {
          name: 'id',
          align: 'right',
          label: 'Id',
          field: 'id',
          sortable: true
        },
        {
          name: 'name',
          align: 'center',
          label: 'Kiểu tầm nhìn',
          field: 'Name',
          sortable: true
        }
      ],
      //
      newimage: '',
      drawer: ref(false),
      options: [],
      model: '',
      optionsStatus: ['Đang xác thực', 'Đã xác thực', 'Đã thanh toán', 'Đã hủy'],
      optionsPayment: ['Thanh toán tại QUẦY', 'Tài khoản ngân hàng', 'Ví điện tử MOMO'],
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
