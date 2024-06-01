import DB from "@/utils/indexedDB";
import userObjectStore from "./objectStores/user";
import languageObjectStore from "./objectStores/language";
import orderObjectStore from "./objectStores/order";
import recordObjectStore from "./objectStores/record";
const airbnbDB = new DB("airbnb");
export default {
  airbnbDB,
  languageObjectStore,
  userObjectStore,
  orderObjectStore,
  recordObjectStore,
};
