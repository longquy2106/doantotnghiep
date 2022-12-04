<template>
  <q-layout view="hHh lpr fFf" class="bg-grey-1">
    <div class="q-mx-xl">
      <div class="q-mx-md q-mb-lg">
        <div class="text-bold q-my-md" style="font-size:22px">
          <a>Basic Information</a>
        </div>
        <div class="flex justify-between">
          <div class="">
            <q-img src="https://vietnamarch.com.vn/wp-content/uploads/2019/03/coworking-space-thai-ha05.jpg" alt="lỗi ảnh" style="width: 230px; height:230px"></q-img>
          </div>
          <div>
            <div class="text-bold text-size:22px q-mb-sm"><a>Tên người dùng</a></div>
            <div class="q-pb-xs"><a>Địa chỉ Email</a></div>
            <div class="q-mt-lg">
              <q-file color="teal" filled v-model="imgphong" label="Upload hình ảnh">
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
            </div>
          </div>
          <div class="">
            <div class="flex q-mb-lg q-ml-lg">
              <q-input style="width: 280px" class="q-mr-lg" filled v-model="tenphong" label="Username"/>
              <q-input style="width: 280px" filled v-model="giaphong" label="Email" />
            </div>
            <div class="flex q-my-lg q-ml-lg">
              <q-input style="width: 280px" class="q-mr-lg" filled v-model="giaVAT" label="Password"/>
              <q-input style="width: 280px" filled v-model="codephong" label="Full name"/>
            </div>
            <div class="flex q-mt-lg q-ml-lg">
              <div class="q-mr-lg" style="width: 280px">
                <q-input filled v-model="date" mask="date" :rules="['date']" label="Day of birth">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <q-input style="width: 280px" filled v-model="codephong" label="Địa chỉ"/>
            </div>
            <div align="right">
              <q-btn label="Lưu" color="primary" @click="onCreateBook"/>
            </div>
          </div>
        </div>
      </div>
       <q-separator inset />
      <div align="center">
        <div class="text-bold" style="fontSize:35px"><a>Lịch sử đặt phòng</a></div>
      </div>
      <q-page-container>
        <q-page padding>
          <div>
            <!-- table -->
            <div class="q-pa-md">
              <q-table
                title="DANH SÁCH CÁC CÔNG TY"
                :rows="dataCompanies"
                :columns="columnsCompanies"
                row-key="id"
                selection="single"
              />
            </div>
          </div>
        </q-page>
      </q-page-container>
    </div>
  </q-layout>
</template>
