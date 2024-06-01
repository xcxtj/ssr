export default class DB {
  private db: any; // 数据库对象
  private dbName: string;
  constructor(dbName: string) {
    this.dbName = dbName;
  }
  openStore(stores: any) {
    const request = window.indexedDB.open(this.dbName, 1);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("数据库打开成功");
        this.db = event.target.result;
        resolve(true);
      };
      request.onerror = (event: any) => {
        console.log("数据库打开报错", event);
        reject(event);
      };
      request.onupgradeneeded = (event: any) => {
        console.log("数据库升级成功");
        const { result } = event.target;
        for (let storeName in stores) {
          const { keyPath, indexs } = stores[storeName];
          if (!result.objectStoreNames.contains(storeName)) {
            const store = result.createObjectStore(storeName, {
              autoIncrement: true,
              keyPath,
            });
            if (indexs && indexs.length > 0) {
              indexs.map((index: any) => {
                store.createIndex(index, index, { unique: false });
              });
            }
            store.transaction.oncomplete = () => {
              console.log("创建对象仓库成功");
            };
          }
        }
      };
    });
  }
  updateItem(storeName: string, data: any) {
    console.log(this.db);
    const store = this.db
      .transaction([storeName], "readwrite")
      .objectStore(storeName);
    const request = store.put({ ...data, updateTime: new Date().getTime() });
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("数据更新成功");
        resolve(event);
      };
      request.onerror = (event: any) => {
        console.log("数据更新失败");
        reject(event);
      };
    });
  }
  deleteItem(storeName: string, key: number | string) {
    const store = this.db
      .transaction([storeName], "readwrite")
      .objectStore(storeName);
    const request = store.delete(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("数据删除成功");
        resolve(event);
      };
      request.onerror = (event: any) => {
        console.log("数据删除失败");
        reject(event);
      };
    });
  }
  getList(storeName: string) {
    //不同
    const store = this.db
      .transaction([storeName], "readwrite")
      .objectStore(storeName);
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("所有数据查询成功");
        resolve(event.target.result);
      };
      request.onerror = (event: any) => {
        console.log("所有数据查询失败");
        reject(event);
      };});
    }
      getItem(storeName: string,key: number | string) {
        const store = this.db.transaction(storeName).objectStore(storeName);
        const request = store.get(key);
        return new Promise((resolve, reject) => {
          request.onsuccess = (event: any) => {
            console.log("查询一条数据成功");
            console.log(event.target.result);
            resolve(event.target.result);
          };
          request.onerror = (event: any) => {
            console.log("查询一条数据失败");
            console.log(event);
            reject(event);
          }
    });
  }
}
