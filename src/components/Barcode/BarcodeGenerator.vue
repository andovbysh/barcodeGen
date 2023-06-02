<template>
  <section class="generator">
      <BarcodeImage class="generator-image" v-if="result" :image-url="result" :alt="barcodeOptions.Content"/>

      <div class="generator-form">
          <input
              class="generator-form-input"
              type="text"
              placeholder="Text to encode"
              v-model="barcodeOptions.Content"/>
          <select class="generator-form-input" v-model="barcodeOptions.BarcodeType">
              <option v-for="(type, index) in barcodeTypes" :key="index">{{ type }}</option>
          </select>

          <div class="generator-form-radio">
              <div v-for="(extension, index) in barcodeExtensions" :key="index">
                  <input
                      type="radio"
                      v-model="barcodeExtension"
                      :id="extension"
                      :value="extension">
                  <label :for="extension">{{ extension }}</label>
              </div>
          </div>

          <input
              class="generator-form-input"
              type="text"
              placeholder="Width"
              v-model="barcodeOptions.Width">
          <input
              class="generator-form-input"
              type="text"
              placeholder="Height"
              v-model="barcodeOptions.Height">
      </div>

      <button class="generator-button" :disabled="!barcodeOptions.Content" @click="getBarcode()">Generate</button>
      <button
          v-if="result"
          class="generator-button"
          :disabled="!barcodeOptions.Content"
          @click="downloadBarcode()">Download</button>
  </section>
</template>

<script setup>

import BarcodeImage from "@/components/Barcode/BarcodeImage.vue";
import {computed, reactive, ref} from "vue";
import {barcodeExtensions, barcodeTypes} from "@/components/Barcode/resource/constants";
import {API} from "@/services/apiService";

let barcodeExtension = ref('Jpeg');

const barcodeOptions = reactive({
    BarcodeType: 'Codabar',
    Content: '',
    Height: '',
    Width: ''
})

// const isWidthValid = computed(() => /^\d+$/.test(barcodeOptions.Width));
// const isHeightValid = computed(() => /^\d+$/.test(barcodeOptions.Height));
// unused because I can't think of a good way of using it and too lazy to make a proper validation system for a test :)

const query = computed(() => {
    const extension = `image.${barcodeExtension.value}?`;

    const filteredOptions = Object.entries(barcodeOptions).filter(option => option[1] !== '')
    const options = filteredOptions.reduce((str, [key, val]) => {
        return `${str}${key}=${val}&`
    }, '')

    return `${extension}${options.slice(0, -1)}`;
})

let result = ref('');
function getBarcode(){
    API.getImage(query.value)
        .then((payload) => result.value = URL.createObjectURL(payload))
}

function downloadBarcode(){
    let link = document.createElement('a');
    link.href = result.value;
    link.download = '';
    link.click();
    link.remove();
}

</script>

<style scoped lang="scss">
.generator {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    padding: 10px;

    &-form {
        margin-top: 20px;
        margin-bottom: 20px;

        &-radio,
        &-size {
            display: flex;
            justify-content: space-between;
        }

        &-radio {
            margin-bottom: 20px;
            margin-top: 20px;
        }

        label {
            margin-left: 5px;
        }

        &-input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
        }
    }

    &-button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        padding: 10px;
        margin-bottom: 10px;
        background-color: white;
        border: 1px solid black;

        &:disabled {
            border: 1px dotted black;
        }
    }
}
</style>