<template>
  <div class="custom__product-card">
    <div class="custom__product-data">
      <SfImage :src="getCoverImage(product)" :alt="getName(product)" width="150" height="250" />
      <div class="custom__product-description">
        <div>
          <SfHeading :title="getName(product)" :level="3" />
          <span v-html="getDescription(product)"></span>
        </div>
        <SfSelect
          label="Size"
          :required="false"
          valid
          :disabled="false"
          errorMessage="This field is not correct."
          value=""
          placeholder="Choose your size"
        >
          <SfSelectOption v-for="size of sizes" value="size" :key="size">{{ size }}</SfSelectOption>
        </SfSelect>
      </div>
    </div>
    <div class="custom__product-actions-container">
      <div class="product-price-container">
        <SfPrice :regular="`$${getPrice(product).regular}.00`" />
        <div class="product-cart-actions">
          <SfRating :score="getAverageRating(product)" />
          <span>({{ getTotalReviews(product) }})</span>
        </div>
      </div>
      <SfAddToCart :qty="product.qty" />
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { SfHeading, SfImage, SfAddToCart, SfRating, SfPrice, SfSelect } from '@storefront-ui/vue';
import { getAttributes, getName, getPrice, getDescription, getAverageRating, getTotalReviews, getCoverImage } from '~/modules/catalog/product/getters/productGetters';

export default {
  components: {
    SfHeading,
    SfImage,
    SfAddToCart,
    SfRating,
    SfPrice,
    SfSelect
  },
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const sizes = computed(() => {
      const sizes = getAttributes(props.product).size.value;

      const sizeArray = sizes.map(size => Object.values(size)[0]);

      return sizeArray;
    })

    return {
      getAttributes,
      getName,
      getPrice,
      getDescription,
      getAverageRating,
      getTotalReviews,
      getCoverImage,
      sizes
    }
  }
}
</script>

<style lang="scss" scoped>
.custom {
  font-family: 'Raleway', sans-serif;

  &__product-card {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    padding: 1rem;
  }

  &__product-data {
    display: flex;
    gap: 1rem;
    max-width: 60%;
  }

  &__product-description {
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: space-between;

    .sf-heading {
      text-align: left;
    }
  }

  &__product-actions-container {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;

    .sf-add-to-cart {
      --c-primary: red;
    }

    .product-price-container {
      display: flex;
      flex-direction: column;
      align-items: end;
    }

    .product-cart-actions {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>