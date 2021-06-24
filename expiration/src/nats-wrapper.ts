import { connect as stanConnect, Stan } from 'node-nats-streaming';

// used as a singleton to avoid circular imports
class NatsWrapper {
  private _stan?: Stan;

  get stan() {
    if (!this._stan) {
      throw new Error(`Cannot access NATS client before connecting.`);
    }

    return this._stan;
  }

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._stan = stanConnect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this.stan.on(`connect`, () => {
        console.log(`Connected to NATS.`);

        resolve();
      });

      this.stan.on(`error`, (err) => {
        reject(err);
      });
    });
  }
}

const natsWrapper = new NatsWrapper();

export { natsWrapper };
