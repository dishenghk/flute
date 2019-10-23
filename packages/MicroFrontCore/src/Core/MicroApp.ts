import { MicroService } from "./MicroService";
import { PluginService } from "./PluginService";

function InitMicroApp() {
  const runSerice = new MicroService(new PluginService());

  return runSerice;
}
export { InitMicroApp };
