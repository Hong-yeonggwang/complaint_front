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

  <form v-on:submit="submitForm" action="./pay" class="w-full">
    <div class="py-6 w-56 m-auto">
      <!-- 버스 -->
      <div v-if="this.tab == 'bus'">
        <div class="">
          <v-select label="버스 출발지 - 가격" v-model="selectedOption" :items="busList"></v-select>

          <!-- 새로운 Bus <div> 엘리먼트 추가 -->
          <div v-for="(item, index) in addedBusDivs" :key="index">
            <div>{{ item.title }}</div>
            <div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-minus" @click="minusCount(index)"></v-btn>
              </div>
              <div class="float-left">
                <input type="number" class="border-solid border-2 border-black mx-2 w-28" v-model="item.count">
              </div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-plus" @click="plusCount(index)"></v-btn>
              </div>
              <div class="float-left w-fit ml-3">
                <v-btn density="compact" icon="mdi-delete-forever" @click="deleteDiv(index)"></v-btn>
              </div>
              <div class="clear-both"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 식당 -->
      <div v-if="this.tab == 'meal'">
        <div class="">
          <v-select label="식당 - 가격" v-model="selectedOption" :items="mealList"></v-select>

          <!-- 새로운 Meal <div> 엘리먼트 추가 -->
          <div v-for="(item, index) in addedMealDivs" :key="index">
            <div>{{ item.title }}</div>
            <div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-minus" @click="minusCount(index)"></v-btn>
              </div>
              <div class="float-left">
                <input type="number" class="border-solid border-2 border-black mx-2 w-28" v-model="item.count">
              </div>
              <div class="float-left w-fit">
                <v-btn density="compact" icon="mdi-plus" @click="plusCount(index)"></v-btn>
              </div>
              <div class="float-left w-fit ml-3">
                <v-btn density="compact" icon="mdi-delete-forever" @click="deleteDiv(index)"></v-btn>
              </div>
              <div class="clear-both"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <div class="float-left  mr-2">
          <div class="font-bold w-fit">총 상품 금액</div>
        </div>
        <div class="float-left w-fit mr-2" style="color:#999999">
          <div class="float-left mr-1">총 수량</div>
          <div class="float-left">{{ calculateTotalQuantity }}</div>
          <div class="float-left">장</div>
        </div>
        <div class="float-left">
          <div class="float-left" id="totalPrice">{{ calculateTotalPrice }}</div>
          <div class="float-left">원</div>
        </div>
        <div class="clear-both"></div>
      </div>

      <!-- type="submit" -->
      <v-btn class="me-4 mt-4" @click="openMobileApp">
        결제하기
      </v-btn>
    </div>
  </form>
</template>

<script>
let IMP = window.IMP; // 생략 가능
IMP.init("imp80446112");

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
      addedBusDivs: [/* option: , count: , value: */], // 새로 추가된 Bus <div> 엘리먼트를 저장할 데이터
      addedMealDivs: [], // 새로 추가된 Meal <div> 엘리먼트를 저장할 데이터
      addedBusOptions: [/* option */], // 이미 추가된 Bus 옵션을 저장할 데이터
      addedMealOptions: [], // 이미 추가된 Meal 옵션을 저장할 데이터

      busList: ['bus #1 - 1000', 'bus #2 - 1500', 'bus #3 - 2000', 'bus #4 - 2500'],
      mealList: ['인성관 #A - 4000', '인성관 #B - 4000', '환과대 #A - 4500', '환과대 #B - 4500', '생활관 #A - 3500', '생활관 #B - 3500'],
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
    },
    calculateTotalQuantity() {
      // 추가된 div의 수량을 합산하는 computed 속성
      let totalQuantity = 0;

      if (this.tab === 'bus') {
        totalQuantity = this.addedBusDivs.reduce((sum, item) => sum + item.count, 0);
      } else if (this.tab === 'meal') {
        totalQuantity = this.addedMealDivs.reduce((sum, item) => sum + item.count, 0);
      }

      return totalQuantity;
    },
    calculateTotalPrice() {
      // 총 가격을 계산하는 computed 속성 (단순 예시)
      let totalPrice = 0;

      if (this.tab === 'bus') {
        totalPrice = this.addedBusDivs.reduce((sum, item) => sum + (item.count * item.value), 0);
      }
      else if (this.tab === 'meal') {
        totalPrice = this.addedMealDivs.reduce((sum, item) => sum + (item.count * item.value), 0);
      }

      return totalPrice;
    }
  },
  watch: {
    selectedOption: function () {
      this.addNewDiv();
    }
  },
  methods: {
    plusCount(key) {
      if (this.tab == "bus") {
        this.addedBusDivs[key].count += 1;
      }
      if (this.tab == "meal") {
        this.addedMealDivs[key].count += 1;
      }
    },
    minusCount(key) {
      if (this.tab == "bus") {
        if (this.addedBusDivs[key].count > 1) {
          this.addedBusDivs[key].count -= 1;
        }
        else {
          alert("1개 이하로는 구매하실 수 없습니다.")
        }
      }
      if (this.tab == "meal") {
        if (this.addedMealDivs[key].count > 1) {
          this.addedMealDivs[key].count -= 1;
        }
        else {
          alert("1개 이하로는 구매하실 수 없습니다.")
        }
      }
    },
    addNewDiv() {
      // 새로운 <div> 엘리먼트 추가하는 로직
      if (this.tab == "bus") {
        if (this.selectedOption && !this.addedBusOptions.includes(this.selectedOption)) {
          this.addedBusDivs.push({ title: this.selectedOption, count: 1, value: this.selectedOption.substring(this.selectedOption.length - 4) }); // 데이터에 선택한 옵션 추가
          this.addedBusOptions.push(this.selectedOption); // 추가한 옵션 기록
          this.selectedOption = null; // 선택 초기화
        }
        else if (this.addedBusOptions.includes(this.selectedOption)) {
          alert("이미 선택한 옵션입니다.")
        }
      }

      if (this.tab == "meal") {
        if (this.selectedOption && !this.addedMealOptions.includes(this.selectedOption)) {
          this.addedMealDivs.push({ title: this.selectedOption, count: 1, value: this.selectedOption.substring(this.selectedOption.length - 4) }); // 데이터에 선택한 옵션 추가
          this.addedMealOptions.push(this.selectedOption); // 추가한 옵션 기록
          this.selectedOption = null; // 선택 초기화
        }
        else if (this.addedMealOptions.includes(this.selectedOption)) {
          alert("이미 선택한 옵션입니다.")
        }
      }
    },
    deleteDiv(key) {
      if (this.tab == "bus") {
        this.addedBusOptions.splice(key, 1)
        this.addedBusDivs.splice(key, 1)
      }
      if (this.tab == "meal") {
        this.addedMealOptions.splice(key, 1)
        this.addedMealDivs.splice(key, 1)
      }

    },
    submitForm() {
      console.log("submitForm");
    },
    openMobileApp() {
                    // 'yourapp://'
    const appScheme = 'https://play.google.com/store/apps/details?id=kr.ac.yongin.smartcampus.app&hl=ko-KR'; // 모바일 앱의 URI 스킴을 여기에 입력하세요
                      // 'https://itunes.apple.com/app/yourapp'         
    const appStoreUrl = 'https://apps.apple.com/kr/app/%ED%97%A4%EC%9D%B4%EC%98%81-%EC%BA%A0%ED%8D%BC%EC%8A%A4-%EB%8C%80%ED%95%99%EC%83%9D%ED%99%9C-%ED%95%84%EC%88%98-%ED%86%B5%ED%95%A9-%EC%95%B1/id1605688685'; // iOS 앱 스토어 링크
                      // 'https://play.google.com/store/apps/details?id=com.yourapp'; // Android 앱 스토어 링크
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.shinhan.heyoung&hl=ko-KR'

    // 모바일 앱을 열기 위한 시도
    window.location.href = appScheme;

    // 일부 모바일 브라우저에서 모바일 앱을 열지 못하는 경우
    // 사용자를 앱 스토어로 리디렉션
    setTimeout(() => {
      window.location.href = appStoreUrl; // iOS의 경우, playStoreUrl 대신 appStoreUrl 사용
    }, 200);

    // 사용자를 Google Play 스토어로 리디렉션 (Android만 해당)
    setTimeout(() => {
      window.location.href = playStoreUrl;
    }, 200);
  },
  }
}
</script>