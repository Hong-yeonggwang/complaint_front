<template>
  <div class="modal" v-if="isModalOpen == true">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>팝업 창</h2>
      <p>팝업 내용을 여기에 추가하세요.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalPage',
  data() {
    return {
      isModalOpen: false,
      inputValue: "",
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleInput() {
      // 입력값을 처리하는 로직을 구현합니다.
      // 입력값은 this.inputValue에 저장되어 있습니다.
      // 예를 들어, 입력값을 콘솔에 출력하는 경우:

      // 모달 닫기
      this.closeModal();
    },
  }
}
</script>

<style>
/* 모달 스타일 */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>