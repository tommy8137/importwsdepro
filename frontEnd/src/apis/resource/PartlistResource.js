import ApiService from '../ApiService';


const PartlistResource = {
  getPriceObj: (formData, layout) => {
    return ApiService.post(
      '/utils/getPriceObj',
      {
        data: {
          formData,
          layout,
        },
      }
    );
  },
  getProductTypeDropdownList: () => {
    return ApiService.get('/utils/productTypeDropDownList');
  },
  getPartlistLayout: (name, productTypeId = '1', productTypeName = 'nb', bomId = '') => {
    return ApiService.get(`/bom/partlistlayout/${name}/${productTypeId}/${productTypeName}/${bomId}`);
  },
  /**
   * Part list上傳單一圖片
   */
  uploadSingleImage: (apiurl, { data, onUploadProgress }) => {
    return ApiService.post(apiurl, {
      data,
      onUploadProgress,
    });
  },
  /**
   * Part list用id取得圖片
   */
  getImageById: (apiurl) => {
    return ApiService.get(apiurl);
  },

  getInputValueCancel: (apiurl) => {
    return ApiService.cancelGet(apiurl);
  },

  getInputValue: (apiurl) => {
    return ApiService.get(apiurl);
  },

  getPartItemDetail: (bomID, versionid, productTypeId, productTypeName) => {
    return ApiService.post(
      `/bom/bomItems/partlist/${bomID}`,
      {
        data: {
          versionid,
          product_type_id: productTypeId,
          product_type_name: productTypeName
        },
      },
    );
  },

  getPartItemPrice: (bomID, versionid) => {
    return ApiService.post(
      `/bom/bomItems/partlist/${bomID}/price`,
      {
        data: {
          versionid,
        },
      },
    );
  },

  updatePartItemDetail: (bomID, partlistName, partlistValue, productTypeId, productTypeName) => {
    return ApiService.put(
      `/bom/bomItems/partlist/${bomID}`,
      {
        data: {
          formate: partlistName.toLowerCase(),
          partlistValue,
          product_type_id: productTypeId,
          product_type_name: productTypeName,
        }
      }
    );
  },
  // 為了qu方便找key專用
  getPartlistKeyPath: (params) => {
    return ApiService.get(
      '/costgen/export/keypath',
      {
        withToken: false,
        params
      }
    );
  },
};

export default PartlistResource;
