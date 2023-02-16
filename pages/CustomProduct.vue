<template>
  <div>
    <div v-if="!product">
      <SfLoader :loading="isProductLoading" />
    </div>
    <div v-else>
      <CustomProductCard :product="product" />
    </div>
    <ProductsCarousel :products="relatedProducts" :loading="isRelatedLoading" v-if="relatedProducts.length" />
    <span v-else>No related Products</span>
  </div>
</template>

<script>
import { merge } from 'lodash';
import { usePageStore } from '~/stores/page';
import { useProduct, useApi } from '~/composables';
import { ref, useFetch } from '@nuxtjs/composition-api';
import { SfLoader } from '@storefront-ui/vue';

import useCustomRelatedProducts from '~/composables/useCustomRelatedProducts';

import CustomProductCard from '~/components/CustomProductCard.vue';
import ProductsCarousel from '~/modules/catalog/product/components/ProductsCarousel.vue';

import getProductPriceBySkuGql from '~/modules/catalog/product/queries/getProductPriceBySku.gql';

export default {
  components: {
    CustomProductCard,
    ProductsCarousel,
    SfLoader,
  },
  setup() {
    const { routeData } = usePageStore();
    const { getProductDetails, loading: isProductLoading } = useProduct();
    const { query } = useApi();
    const { relatedProducts, load: getCustomRelatedProducts, loading: isRelatedLoading } = useCustomRelatedProducts(routeData.sku);

    const product = ref(null);

    const searchParams = {
      filter: {
        sku: {
          eq: routeData.sku,
        }
      }
    }

    const getExtendedProductData = async () => {
      const { data } = await query(getProductPriceBySkuGql, searchParams);

      product.value = merge({}, product.value, data?.products?.items?.[0]);
    }

    useFetch(async () => {
      const fetchedProduct = await getProductDetails(searchParams);

      product.value = fetchedProduct?.items?.[0];

      await getExtendedProductData();
      await getCustomRelatedProducts();
    });

    return {
      product,
      isProductLoading,
      relatedProducts,
      isRelatedLoading,
    }
  }
}
</script>

<style>

</style>