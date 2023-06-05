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
              type="number"
              placeholder="Width"
              v-model="barcodeOptions.Width">
          <input
              class="generator-form-input"
              type="number"
              placeholder="Height"
              v-model="barcodeOptions.Height">
      </div>

      <button class="generator-button" :disabled="!barcodeOptions.Content" @click="generateBarcodeLink()">Generate</button>
      <button
          v-if="result"
          class="generator-button"
          :disabled="!barcodeOptions.Content"
          @click="downloadBarcode()">Download</button>
  </section>
</template>

<script setup>

import BarcodeImage from "@/components/Barcode/BarcodeImage.vue";
import {reactive, ref} from "vue";
import {barcodeExtensions, barcodeTypes} from "@/components/Barcode/resource/constants";
import {API} from "@/services/apiService";
import {useQueryGenerator} from "@/composables/queryGenerator";

let barcodeExtension = ref('Jpeg');

const barcodeOptions = reactive({
    BarcodeType: 'Codabar',
    Content: '',
    Height: '',
    Width: ''
})

// const isWidthValid = computed(() => /^\d+$/.test(barcodeOptions.Width));
// const isHeightValid = computed(() => /^\d+$/.test(barcodeOptions.Height));

let query = useQueryGenerator(barcodeOptions, barcodeExtension.value);

let result = ref('');
function generateBarcodeLink(){
    console.log(`${API.baseUrl}${query.value}`)
    console.log(API.baseUrl)
    console.log(query.value)
    result.value = `${API.baseUrl}/${query.value}`
    console.log(result.value, 'hey')
}

function downloadBarcode(){
    let link = document.createElement('a');
    link.href = result.value;
    link.target = '_blank';
    link.download = `barcode${barcodeOptions.Content}${barcodeExtension.value}`;
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