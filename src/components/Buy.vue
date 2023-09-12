<template>
  <!-- 메뉴바  -->
  <v-card>
    <v-tabs v-model="tab" bg-color="black" classs="overflow-scroll">
      <v-tab v-for="(menu, index) in  buyMenu" :key="index" v-bind:value="menu.value">{{ menu.title }}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item v-for="(menu, index) in buyMenu" :key="index" class="h-12 flex items-center"
          v-bind:value="menu.value">
          {{ menu.info }}
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>

  <form v-on:submit="submitForm" action="" class="w-full">
    <div class="py-6 w-56 m-auto">
      <!-- 버스 --> 
      <div v-if="this.tab == 'bus'">
        <div class="">
          <v-select label="버스 출발지 - 가격" v-model="selectedOption" :options="options" :items="busList">
          </v-select>

          <!-- 새로운 <div> 엘리먼트 추가 -->
          <div v-for="(item, index) in addedDivs" :key="index">
            <div>{{ item.title }}</div>
            <div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-minus" @click="minusCount(index)"></v-btn>
              </div>
              <div class="float-left">
                <input type="number" class="border-solid border-2 border-black mx-3 w-36" v-model="item.count" >
              </div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-plus" @click="plusCount(index)"></v-btn>
              </div>
              <div class="clear-both"></div>
            </div>
          </div>
        </div>

        <!-- <div>
          <div class="text-center float-left w-1/2">
            출발지
          </div>
          <div class="text-center float-left w-1/2">
            가격
          </div>
        </div>
        <div v-for="(item, index) in bus" :key="index">
          <div class="mt-4">
            <div>
              <div class="text-center float-left w-1/2">
                {{ item.title }}
              </div>
              <div class="text-center float-left w-1/2">
                {{ item.value }}
              </div>
            </div>
            <div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-minus" @click="minusBus(index)"></v-btn>
              </div>
              <div class="float-left">
                <input type="number" class="border-solid border-2 border-black mx-3 w-36" v-model="item.count">
              </div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-plus" @click="plusBus(index)"></v-btn>
              </div>
              <div class="clear-both"></div>
            </div>
          </div>
        </div> -->
      </div>
      <!-- 식당 -->
      <div v-if="this.tab == 'meal'">
        <div>
          <div class="text-center float-left w-1/2">
            식당
          </div>
          <div class="text-center float-left w-1/2">
            가격
          </div>
        </div>
        <div v-for="(item, index) in meal" :key="index">
          <div class="mt-4">
            <div>
              <div class="text-center float-left w-1/2">
                {{ item.title }}
              </div>
              <div class="text-center float-left w-1/2">
                {{ item.value }}
              </div>
            </div>
            <div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-minus" @click="minusBus(index)"></v-btn>
              </div>
              <div class="float-left">
                <input type="number" class="border-solid border-2 border-black mx-3 w-36" v-model="item.count">
              </div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-plus" @click="plusBus(index)"></v-btn>
              </div>
              <div class="clear-both"></div>
            </div>
          </div>
        </div>
      </div>


      <div class="mt-6">
        <div class="float-left">
          <div>총 상품 금액</div>
        </div>
        <div class="float-left">
          <div class="float-left">총 수량</div>
          <div class="float-left"></div>
          <div class="float-left">장</div>
        </div>
        <div class="float-right">
          <div class="float-left"></div>
          <div class="float-left">원</div>
        </div>
        <div class="clear-both"></div>
      </div>

      <v-btn class="me-4 mt-4" type="submit">
        구매하기
      </v-btn>
    </div>
  </form>
</template>

<script>
// import $ from 'jquery';

export default {
  name: 'buyPage',
  components: {
  },
  data() {
    return {
      tab: null,
      buyMenu: [
        { title: '승차권', value: 'bus', info: '승차권을 구매합니다' },
        { title: '식당', value: 'meal', info: '식권을 구매합니다' },
      ],

      selectedOption: null, // v-select에서 선택한 옵션을 저장할 데이터
      addedDivs: [], // 새로 추가된 <div> 엘리먼트를 저장할 데이터

      bus: [
        {
          title: 'bus #1',
          value: 1000,
          count: 0
        },
        {
          title: 'bus #2',
          value: 1500,
          count: 0
        },
        {
          title: 'bus #3',
          value: 2000,
          count: 0
        },
      ],
      meal: [
        {
          title: '인성관 #A',
          value: 4000,
          count: 0
        },
        {
          title: '인성관 #B',
          value: 4000,
          count: 0
        },
        {
          title: '환과대 #A',
          value: 4500,
          count: 0
        },
        {
          title: '환과대 #B',
          value: 4500,
          count: 0
        },
        {
          title: '생활관 #A',
          value: 3500,
          count: 0
        },
        {
          title: '생활관 #B',
          value: 3500,
          count: 0
        },
      ],
      busList: ['bus #1 - 1000', 'bus #2 - 1500', 'bus #3 - 2000', 'bus #4 - 2500'],
    }
  },
  computed: {
    options() {
      // v-select에 표시할 옵션 리스트 반환
      return [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        // ...
      ];
    }
  },
  watch: {
    selectedOption: function () {
      this.addNewDiv();
    }
  },
  methods: {
    plusCount(key) {
      this.addedDivs[key].count += 1;
    },
    minusCount(key) {
      if (this.addedDivs[key].count > 0) {
        this.addedDivs[key].count -= 1;
      }
    },
    plusMeal(key) {
      this.meal[key].count += 1;
    },
    minusMeal(key) {
      if (this.bus[key].count > 0) {
        this.bus[key].count -= 1;
      }
    },
    submitForm() {
      console.log("submitForm");
    },
    addNewDiv() {
      console.log('asd')
      // 새로운 <div> 엘리먼트 추가하는 로직
      if (this.selectedOption) {
        this.addedDivs.push({title:this.selectedOption, count:0}); // 데이터에 선택한 옵션 추가
        this.selectedOption = null; // 선택 초기화
      }
    }
  },
  // fetchTitle(event) {
  //   (`<div>` + event + `</div><div>
  //             <div class="float-left w-fit">
  //               <v-btn density="compact" icon="mdi-minus" @click="minusBus(index)"></v-btn>
  //             </div>
  //             <div class="float-left">
  //               <input type="number" class="border-solid border-2 border-black mx-3 w-36" v-model="item.count">
  //             </div>
  //             <div class="float-left w-fit">
  //               <v-btn density="compact" icon="mdi-plus" @click="plusBus(index)"></v-btn>
  //             </div>
  //             <div class="clear-both"></div>
  //           </div>`).appendTo($("#selected"))
  // },
}

</script>
