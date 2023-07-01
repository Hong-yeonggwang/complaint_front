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


  <!-- <form @submit.prevent="submit" action=""> -->
  <form v-on:submit="submitForm" action="">
    <v-card class="mx-auto max-w-500">
      <div  class="mx-auto w-fit">
        <!-- 버스 -->
        <div v-if="this.tab == 'bus'">
          <div v-for="(item, index) in bus" :key="index">
            <div class="my-1">
              {{ item.title }} {{ item.value }}
              <v-btn density="compact" icon="mdi-minus" @click="minusBus(index)"></v-btn>
              <input type="number" class="border-solid border-2 border-black mx-3" v-model="item.count">
              <v-btn density="compact" icon="mdi-plus" @click="plusBus(index)"></v-btn>
            </div>
          </div>
        </div>
        <!-- 식당 -->
        <div v-if="this.tab == 'meal'">
          <div v-for="(item, index) in meal" :key="index">
            <div cols="auto">
              {{ item.title }} {{ item.value }}
              <v-btn density="compact" icon="mdi-minus" @click="minusMeal(index)"></v-btn>
              <input type="number" class="border-solid border-2 border-black" v-model="item.count">
              <v-btn density="compact" icon="mdi-plus" @click="plusMeal(index)"></v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-card>

    <v-btn class="me-4" type="submit">
      submit
    </v-btn>
  </form>
</template>

<script>
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
          title: 'meal #1',
          value: 4000,
          count: 0
        },
        {
          title: 'meal #2',
          value: 4500,
          count: 0
        },
        {
          title: 'meal #3',
          value: 3500,
          count: 0
        },
      ],
    }
  },
  methods: {
    plusBus(key) {
      this.bus[key].count += 1;
    },
    minusBus(key) {
      if (this.bus[key].count > 0) {
        this.bus[key].count -= 1;
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
    }
  },
}

</script>
