/* eslint-disable @typescript-eslint/no-namespace */
import { Logger } from '@nestjs/common';

export namespace LogServerStatus {
  type LogSuccessOpts = { port: number; host: string };
  export const logSuccess = ({ port, host }: LogSuccessOpts) => {
    const formattedPort = port.toString()
    const message = `🚀  Server ready at http://${host}:${formattedPort}`;
    Logger.log(message, 'Bootstrap', false);
  };
  export const logWarn = (message) => {
    Logger.log(message, 'Bootstrap', false);
  };


  export const logError = ({ error }: { error: Error }) => {
    Logger.error(`❌ Error starting server, ${error}`, 'Bootstrap');
    process.exit();
  };

  export const logEnv = ({ currentEnv }: { currentEnv: string }) => {
    const formattedEnv = currentEnv.toUpperCase()
    Logger.log(`Environment: ${formattedEnv}`, 'Bootstrap');
  };
}
