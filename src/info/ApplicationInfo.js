export const API_VERSION = 'v1/'
export const DEFAULT_PREFIX = 'api/'

export const API_ADDRES = 'https://pricebuddydemo.azurewebsites.net/' + DEFAULT_PREFIX + API_VERSION

export const API_USER = API_ADDRES + 'user'
export const API_LOGIN = API_ADDRES + 'login'
export const API_ESTABLISHMENT = API_ADDRES + 'establishment?latitude={0}&longitude={1}'
// export const API_PRODUCT_ESTABLISHMENT_PARAM_PROD = API_ADDRES + 'product_establishment?productCode={0}&latitude={1}&longitude={2}'
// export const API_PRODUCT_ESTABLISHMENT_PARAM_EST = API_ADDRES + 'product_establishment?establishmentID={0}&latitude={1}&longitude={2}'

export const API_PRODUCT = API_ADDRES + 'product?productInfo={0}&latitude={1}&longitude={2}'
export const API_ESTABLISHMENT_PRODUCTS = API_ADDRES + 'product?establishmentID={0}&latitude={1}&longitude={2}'


export const API_PRODUCT_UNIQUE = API_ADDRES + 'product_unique?productID={0}&establishmentID={1}'

export const API_ESTABLISHMENT_UNIQUE = API_ADDRES + 'establishment_unique?establishmentID={0}'


export const TOKEN_KEY = 'JWTKEY2019*@#$PriceBUDDYLMTSCorp198519891998'


//Info default call api

export const METHOD_GET = 'GET'
export const METHOD_POST = 'POST'
export const METHOD_PUT = 'PUT'


export const HEADER_ACCEPT = 'application/json'
export const HEADER_CONTENT_TYPE = 'application/json'
