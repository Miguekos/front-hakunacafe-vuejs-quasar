// import something here
// import {axiosInstance} from "boot/axios";
// "async" is optional
import el from "quasar/lang/el";
import {LocalStorage} from "quasar";

export default ({app, router, Vue, store}) => {
  router.beforeEach(async (to, from, next) => {
    // const response = await axiosInstance.post(`/api/login`);
    // console.log(to, to);
    // console.log(app);
    // console.log(from, from);
    // LocalStorage.set("loggin", false);
    let logginIn = true;
    // let logginIn = LocalStorage.getAll().loggin;
    // console.log(logginIn);
    if (!logginIn && to.path !== "/auth") {
      // console.log(logginIn);
      // console.log("to.path", to.path);
      next("/auth");
    } else {
      next();
    }
  });
};
