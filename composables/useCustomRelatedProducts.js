import { ref, readonly } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useApi } from '~/composables';

import relatedProductsQueryGql from './relatedProductsQuery.gql';

export function useRelatedProductsCustom(sku) {
  const loading = ref(false);
  const error = ref({
    load: null,
  });
  const relatedProducts = ref([]);

  const relatedProductsParams = {
    filter: {
      sku: {
        eq: sku,
      }
    }
  };

  const { query } = useApi();

  const load = async () => {
    Logger.debug(`useRelatedProducts.load()`, relatedProductsParams);

    try {
      loading.value = true;
      const { data } = await query(relatedProductsQueryGql, relatedProductsParams);
      relatedProducts.value = data.products.items[0].related_products;
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      relatedProducts.value = [];
      Logger.error('useRelatedProducts.load()', err);
    } finally {
      loading.value = false;
    }
  }

  return {
    load,
    loading: readonly(loading),
    error: readonly(error),
    relatedProducts: readonly(relatedProducts),
  };
}

export default useRelatedProductsCustom;