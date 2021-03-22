import config from 'config';
// import dotenv from 'dotenv';
import lodash from 'lodash';

interface IPrintConfigOptions {
  logger: {
    info(arg1: string): void; 
  };
}

export default class ConfigReport {
  public static printConfig(options: IPrintConfigOptions): void {
    const logger = options.logger;
    // clone current config
    const cloneFinalConfig: any = lodash.cloneDeep(config);
    const secretWords: string[] = ConfigReport.getHiddenWords();

    secretWords.forEach((prop: string) => {

      /**
       * TODO: Fix the dotenv.parsed. Not working anymore since new release. 
      if (lodash.has(dotenv.parsed, prop)) {
        lodash.set(dotenv.parsed, prop, '***');
      }
      */

      config.util.getConfigSources().forEach((conf: any ) => {
        if (lodash.has(conf.parsed, prop)) {
          lodash.set(conf.parsed, prop, '***');
        }
      });

      if (lodash.has(cloneFinalConfig, prop)) {
        lodash.set(cloneFinalConfig, prop, '***');
      }
    });

    const msg = {
      configNpm: config.util.getConfigSources().map((conf: any) => Object.assign(conf.parsed, {
        configFileLocation: conf.name,
      })),
      // dotEnv: dotenv.parse,
      finalConfig: cloneFinalConfig,
      nodeEnv: process.env.NODE_ENV,
      nodeConfigEnv: config.util.getEnv('NODE_CONFIG_ENV'),
    };

    logger.info(JSON.stringify(msg));
  }

  public static getHiddenWords(): string[] {
    return ['DB_PASS'];
  }
}
