import * as admin from "firebase-admin";
import "firebase-functions";

admin.initializeApp();

export {
  createUserAsAdmin,
  editUserAsAdmin,
  deleteUserAsAdmin,
} from "./userAdmin";
export { deleteUser } from "./userAuth";
export { deleteUserData } from "./triggers";
export { scheduledRunTask, runTaskHttp } from "./schedulers";
